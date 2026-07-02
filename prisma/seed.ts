import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";
import { defaultStoreSettings, demoCategories, demoOrders, demoProducts } from "../lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.DEMO_ADMIN_EMAIL?.trim();
  const adminPassword = process.env.DEMO_ADMIN_PASSWORD?.trim();

  if (!adminEmail || !adminPassword) {
    throw new Error("Configure DEMO_ADMIN_EMAIL e DEMO_ADMIN_PASSWORD antes de rodar o seed.");
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Admin Martins Tech Place",
      passwordHash,
      role: UserRole.ADMIN
    },
    create: {
      name: "Admin Martins Tech Place",
      email: adminEmail,
      passwordHash,
      role: UserRole.ADMIN
    }
  });

  await prisma.storeSettings.deleteMany();
  await prisma.category.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productAttribute.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  await prisma.storeSettings.create({
    data: {
      storeName: defaultStoreSettings.storeName ?? "Martins Tech Place",
      logoUrl: defaultStoreSettings.logoUrl,
      whatsapp: defaultStoreSettings.whatsapp,
      instagram: defaultStoreSettings.instagram,
      email: defaultStoreSettings.email,
      metaTitle: defaultStoreSettings.metaTitle,
      metaDescription: defaultStoreSettings.metaDescription
    }
  });

  for (const category of demoCategories) {
    await prisma.category.create({
      data: category
    });
  }

  for (const product of demoProducts) {
    await prisma.product.create({
      data: {
        meliItemId: product.meliItemId,
        title: product.title,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice ?? undefined,
        currencyId: product.currencyId,
        availableQuantity: product.availableQuantity,
        soldQuantity: product.soldQuantity,
        condition: product.condition,
        permalink: product.permalink,
        thumbnail: product.thumbnail,
        categoryId: product.categoryId,
        categoryName: product.categoryName,
        brand: product.brand,
        model: product.model,
        freeShipping: product.freeShipping,
        status: product.status,
        createdAt: new Date(product.updatedAt),
        updatedAt: new Date(product.updatedAt),
        images: {
          create: product.images.map((url, index) => ({
            url,
            position: index
          }))
        },
        attributes: {
          create: product.attributes
        }
      }
    });
  }

  for (const order of demoOrders) {
    await prisma.order.create({
      data: {
        meliOrderId: order.meliOrderId,
        buyerName: order.buyerName,
        buyerNickname: order.buyerNickname,
        status: order.status,
        totalAmount: order.totalAmount,
        currencyId: order.currencyId,
        dateCreated: new Date(order.dateCreated),
        dateClosed: order.dateClosed ? new Date(order.dateClosed) : null,
        items: {
          create: await Promise.all(
            order.items.map(async (item) => {
              const product = await prisma.product.findUnique({
                where: { meliItemId: item.productMeliItemId }
              });

              return {
                productId: product?.id,
                title: item.title,
                quantity: item.quantity,
                unitPrice: item.unitPrice
              };
            })
          )
        }
      }
    });
  }

  console.log(`Seed concluido. Usuario admin: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
