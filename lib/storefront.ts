import type { Prisma, StoreSettings } from "@prisma/client";
import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import {
  defaultStoreSettings,
  demoCategories,
  demoOrders,
  demoProducts,
  type DemoAttribute,
  type DemoProduct
} from "@/lib/demo-data";
import { getDiscountPercentage, isOffer, slugifyText } from "@/lib/utils";
import { productFiltersSchema } from "@/lib/validations";

export type StorefrontProduct = {
  id: string;
  meliItemId: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  currencyId: string;
  availableQuantity: number;
  soldQuantity: number;
  condition: string;
  permalink: string;
  thumbnail: string;
  categoryId: string;
  categoryName: string;
  brand?: string | null;
  model?: string | null;
  freeShipping: boolean;
  status: string;
  updatedAt: string;
  images: string[];
  attributes: DemoAttribute[];
};

export type CategorySummary = {
  id: string;
  slug: string;
  name: string;
  productCount: number;
};

type FilterValues = {
  q?: string;
  category?: string;
  brand?: string;
  condition?: "new" | "used";
  freeShipping?: "true" | "false";
  inStock?: "true" | "false";
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "best-selling" | "latest" | "discount-desc";
  page: number;
};

type ProductQueryResult = {
  products: StorefrontProduct[];
  total: number;
  page: number;
  pageSize: number;
  availableBrands: string[];
};

const PAGE_SIZE = 12;
const hasDatabaseUrl = Boolean(env.DATABASE_URL);

function mapDemoProduct(product: DemoProduct): StorefrontProduct {
  return {
    ...product,
    brand: product.brand ?? null,
    model: product.model ?? null
  };
}

function mapDbProduct(
  product: Prisma.ProductGetPayload<{
    include: { images: true; attributes: true };
  }>
): StorefrontProduct {
  return {
    id: product.id,
    meliItemId: product.meliItemId,
    title: product.title,
    description: product.description,
    price: Number(product.price),
    originalPrice: product.originalPrice ? Number(product.originalPrice) : null,
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
    updatedAt: product.updatedAt.toISOString(),
    images: product.images.sort((a, b) => a.position - b.position).map((image) => image.url),
    attributes: product.attributes.map((attribute) => ({
      name: attribute.name,
      value: attribute.value
    }))
  };
}

function normalizeFilters(input?: Record<string, string | string[] | undefined>): FilterValues {
  const raw = Object.fromEntries(
    Object.entries(input ?? {}).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value])
  );

  const parsed = productFiltersSchema.safeParse(raw);

  return parsed.success
    ? parsed.data
    : {
        page: 1
      };
}

function getSortComparator(sort?: FilterValues["sort"]) {
  switch (sort) {
    case "price-asc":
      return (a: StorefrontProduct, b: StorefrontProduct) => a.price - b.price;
    case "price-desc":
      return (a: StorefrontProduct, b: StorefrontProduct) => b.price - a.price;
    case "best-selling":
      return (a: StorefrontProduct, b: StorefrontProduct) => b.soldQuantity - a.soldQuantity;
    case "discount-desc":
      return (a: StorefrontProduct, b: StorefrontProduct) =>
        getDiscountPercentage(b.price, b.originalPrice) - getDiscountPercentage(a.price, a.originalPrice);
    case "latest":
    default:
      return (a: StorefrontProduct, b: StorefrontProduct) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  }
}

function applyLocalFilters(products: StorefrontProduct[], filters: FilterValues) {
  let result = [...products];

  if (filters.q) {
    const query = filters.q.toLowerCase();
    result = result.filter((product) =>
      [product.title, product.brand, product.model, product.categoryName, product.description]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))
    );
  }

  if (filters.category) {
    const category = filters.category.toLowerCase();
    result = result.filter(
      (product) =>
        product.categoryId.toLowerCase() === category ||
        product.categoryName.toLowerCase() === category ||
        slugifyText(product.categoryName) === slugifyText(category)
    );
  }

  if (filters.brand) {
    const brand = filters.brand.toLowerCase();
    result = result.filter((product) => product.brand?.toLowerCase() === brand);
  }

  if (filters.condition) {
    result = result.filter((product) => product.condition === filters.condition);
  }

  if (filters.freeShipping === "true") {
    result = result.filter((product) => product.freeShipping);
  }

  if (filters.inStock === "true") {
    result = result.filter((product) => product.availableQuantity > 0);
  }

  if (typeof filters.minPrice === "number") {
    result = result.filter((product) => product.price >= filters.minPrice!);
  }

  if (typeof filters.maxPrice === "number") {
    result = result.filter((product) => product.price <= filters.maxPrice!);
  }

  return result.sort(getSortComparator(filters.sort));
}

async function queryDbProducts(filters: FilterValues): Promise<ProductQueryResult | null> {
  if (!hasDatabaseUrl) {
    return null;
  }

  try {
    const andFilters: Prisma.ProductWhereInput[] = [{ status: "active" }];
    const where: Prisma.ProductWhereInput = {
      AND: andFilters
    };

    if (filters.q) {
      andFilters.push({
        OR: [
          { title: { contains: filters.q, mode: "insensitive" } },
          { brand: { contains: filters.q, mode: "insensitive" } },
          { model: { contains: filters.q, mode: "insensitive" } },
          { categoryName: { contains: filters.q, mode: "insensitive" } },
          { description: { contains: filters.q, mode: "insensitive" } }
        ]
      });
    }

    if (filters.category) {
      andFilters.push({
        OR: [
          { categoryId: filters.category },
          { categoryName: { contains: filters.category, mode: "insensitive" } }
        ]
      });
    }

    if (filters.brand) {
      andFilters.push({
        brand: { equals: filters.brand, mode: "insensitive" }
      });
    }

    if (filters.condition) {
      andFilters.push({
        condition: filters.condition
      });
    }

    if (filters.freeShipping === "true") {
      andFilters.push({
        freeShipping: true
      });
    }

    if (filters.inStock === "true") {
      andFilters.push({
        availableQuantity: { gt: 0 }
      });
    }

    if (typeof filters.minPrice === "number" || typeof filters.maxPrice === "number") {
      andFilters.push({
        price: {
          gte: filters.minPrice,
          lte: filters.maxPrice
        }
      });
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput =
      filters.sort === "price-asc"
        ? { price: "asc" }
        : filters.sort === "price-desc"
          ? { price: "desc" }
          : filters.sort === "best-selling"
            ? { soldQuantity: "desc" }
            : { updatedAt: "desc" };

    const [items, total, brands, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip: (filters.page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
        include: {
          images: true,
          attributes: true
        }
      }),
      prisma.product.count({ where }),
      prisma.product.findMany({
        where: { brand: { not: null } },
        select: { brand: true },
        distinct: ["brand"]
      }),
      prisma.product.count()
    ]);

    const mapped = items.map(mapDbProduct);
    const sorted =
      filters.sort === "discount-desc" ? mapped.sort(getSortComparator(filters.sort)) : mapped;

    if (mapped.length === 0 && total === 0 && totalProducts === 0) {
      return null;
    }

    return {
      products: sorted,
      total,
      page: filters.page,
      pageSize: PAGE_SIZE,
      availableBrands: brands.flatMap((item) => (item.brand ? [item.brand] : []))
    };
  } catch {
    return null;
  }
}

function queryDemoProducts(filters: FilterValues): ProductQueryResult {
  const filtered = applyLocalFilters(demoProducts.map(mapDemoProduct), filters);
  const paginated = filtered.slice((filters.page - 1) * PAGE_SIZE, filters.page * PAGE_SIZE);

  return {
    products: paginated,
    total: filtered.length,
    page: filters.page,
    pageSize: PAGE_SIZE,
    availableBrands: [...new Set(demoProducts.map((product) => product.brand).filter(Boolean) as string[])]
  };
}

export async function getStorefrontProducts(input?: Record<string, string | string[] | undefined>) {
  const filters = normalizeFilters(input);
  const dbResult = await queryDbProducts(filters);
  return dbResult ?? queryDemoProducts(filters);
}

export async function getProductById(id: string) {
  if (!hasDatabaseUrl) {
    const demo = demoProducts.find((product) => product.id === id || product.meliItemId === id);
    return demo ? mapDemoProduct(demo) : null;
  }

  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { meliItemId: id }]
      },
      include: {
        images: true,
        attributes: true
      }
    });

    if (product) {
      return mapDbProduct(product);
    }
  } catch {
    // Fallback handled below.
  }

  const demo = demoProducts.find((product) => product.id === id || product.meliItemId === id);
  return demo ? mapDemoProduct(demo) : null;
}

export async function getFeaturedProducts(limit = 4) {
  const { products } = await getStorefrontProducts({ sort: "latest", page: "1" });
  return products.slice(0, limit);
}

export async function getFlashOfferProducts(limit = 4) {
  const allProducts = await getAllActiveProducts();
  return allProducts.filter((product) => isOffer(product.price, product.originalPrice)).slice(0, limit);
}

export async function getBestSellingProducts(limit = 4) {
  const allProducts = await getAllActiveProducts();
  return [...allProducts].sort((a, b) => b.soldQuantity - a.soldQuantity).slice(0, limit);
}

export async function getRelatedProducts(categoryId: string, currentId: string, limit = 4) {
  const allProducts = await getAllActiveProducts();
  return allProducts
    .filter((product) => product.categoryId === categoryId && product.id !== currentId)
    .slice(0, limit);
}

export async function getAllActiveProducts() {
  const dbResult = await queryDbProducts({ page: 1, sort: "latest" });

  if (dbResult) {
    try {
      const all = await prisma.product.findMany({
        where: { status: "active" },
        include: {
          images: true,
          attributes: true
        }
      });

      return all.map(mapDbProduct);
    } catch {
      return demoProducts.map(mapDemoProduct);
    }
  }

  return demoProducts.map(mapDemoProduct);
}

export async function getCategorySummaries(): Promise<CategorySummary[]> {
  if (!hasDatabaseUrl) {
    return demoCategories.map((category) => ({
      id: category.meliCategoryId,
      slug: slugifyText(category.name),
      name: category.name,
      productCount: demoProducts.filter((product) => product.categoryId === category.meliCategoryId).length
    }));
  }

  try {
    const [categories, counts] = await Promise.all([
      prisma.category.findMany(),
      prisma.product.groupBy({
        by: ["categoryId"],
        _count: {
          _all: true
        }
      })
    ]);

    if (categories.length > 0) {
      return categories.map((category) => ({
        id: category.meliCategoryId,
        slug: slugifyText(category.name),
        name: category.name,
        productCount: counts.find((item) => item.categoryId === category.meliCategoryId)?._count._all ?? 0
      }));
    }
  } catch {
    // Fallback below.
  }

  return demoCategories.map((category) => ({
    id: category.meliCategoryId,
    slug: slugifyText(category.name),
    name: category.name,
    productCount: demoProducts.filter((product) => product.categoryId === category.meliCategoryId).length
  }));
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategorySummaries();
  return categories.find((category) => category.slug === slug) ?? null;
}

export async function getStoreSettings(): Promise<Partial<StoreSettings>> {
  if (!hasDatabaseUrl) {
    return defaultStoreSettings;
  }

  try {
    const settings = await prisma.storeSettings.findFirst();

    if (settings) {
      return settings;
    }
  } catch {
    // Fallback below.
  }

  return defaultStoreSettings;
}

export async function getAdminDashboardMetrics() {
  if (!hasDatabaseUrl) {
    return {
      products: demoProducts.length,
      activeProducts: demoProducts.length,
      orders: demoOrders.length,
      revenue: demoOrders.reduce((total, order) => total + order.totalAmount, 0),
      hasMeliConnection: false
    };
  }

  try {
    const [products, activeProducts, orders] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { status: "active" } }),
      prisma.order.findMany()
    ]);

    const revenue = orders.reduce((total, order) => total + Number(order.totalAmount), 0);
    const hasMeliConnection = Boolean(await prisma.meliAccount.findFirst());

    return {
      products,
      activeProducts,
      orders: orders.length,
      revenue,
      hasMeliConnection
    };
  } catch {
    return {
      products: demoProducts.length,
      activeProducts: demoProducts.length,
      orders: demoOrders.length,
      revenue: demoOrders.reduce((total, order) => total + order.totalAmount, 0),
      hasMeliConnection: false
    };
  }
}

export async function getAdminProducts() {
  return getAllActiveProducts();
}

export async function getAdminOrders() {
  if (!hasDatabaseUrl) {
    return demoOrders;
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: true
      },
      orderBy: {
        dateCreated: "desc"
      }
    });

    if (orders.length > 0) {
      return orders.map((order) => ({
        id: order.id,
        meliOrderId: order.meliOrderId,
        buyerName: order.buyerName,
        buyerNickname: order.buyerNickname,
        status: order.status,
        totalAmount: Number(order.totalAmount),
        currencyId: order.currencyId,
        dateCreated: order.dateCreated.toISOString(),
        dateClosed: order.dateClosed?.toISOString() ?? null,
        items: order.items.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          unitPrice: Number(item.unitPrice)
        }))
      }));
    }
  } catch {
    // Fallback below.
  }

  return demoOrders;
}

export async function getWebhookLogs() {
  if (!hasDatabaseUrl) {
    return [];
  }

  try {
    const logs = await prisma.webhookLog.findMany({
      orderBy: {
        receivedAt: "desc"
      },
      take: 20
    });

    return logs.map((log) => ({
      id: log.id,
      topic: log.topic,
      resource: log.resource,
      userId: log.userId,
      applicationId: log.applicationId,
      attempts: log.attempts,
      receivedAt: log.receivedAt.toISOString(),
      payload: log.payload
    }));
  } catch {
    return [];
  }
}

export async function getIntegrationStatus() {
  if (!hasDatabaseUrl) {
    return {
      connected: false,
      sellerId: null,
      tokenExpiresAt: null,
      lastUpdated: null
    };
  }

  try {
    const account = await prisma.meliAccount.findFirst({
      include: {
        user: true
      }
    });

    if (!account) {
      return {
        connected: false,
        sellerId: null,
        tokenExpiresAt: null,
        lastUpdated: null
      };
    }

    return {
      connected: true,
      sellerId: account.meliUserId,
      tokenExpiresAt: account.tokenExpiresAt.toISOString(),
      lastUpdated: account.updatedAt.toISOString(),
      connectedBy: account.user.name
    };
  } catch {
    return {
      connected: false,
      sellerId: null,
      tokenExpiresAt: null,
      lastUpdated: null
    };
  }
}
