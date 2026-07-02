import { prisma } from "@/lib/prisma";
import { env } from "@/lib/env";
import { meliFetch } from "@/lib/mercadolivre/client";

type MeliSellerInfo = {
  id: number;
  nickname: string;
  permalink?: string;
  registration_date?: string;
};

type MeliItem = {
  id: string;
  title: string;
  category_id: string;
  price: number;
  original_price?: number | null;
  currency_id: string;
  available_quantity: number;
  sold_quantity: number;
  condition: string;
  permalink: string;
  thumbnail: string;
  shipping?: {
    free_shipping?: boolean;
  };
  status: string;
  attributes?: Array<{
    id?: string;
    name: string;
    value_name?: string | null;
  }>;
  pictures?: Array<{
    secure_url?: string;
    url?: string;
  }>;
};

type MeliItemDescription = {
  plain_text?: string;
  text?: string;
};

type MeliCategory = {
  id: string;
  name: string;
};

type MeliCategoryAttribute = {
  id: string;
  name: string;
  value_type: string;
};

type SellerItemsSearchResponse = {
  results: string[];
  paging?: {
    total?: number;
  };
  scroll_id?: string;
};

type SearchProductsResponse = {
  results: MeliItem[];
};

export async function getSellerInfo(userId: string) {
  const account = await prisma.meliAccount.findUniqueOrThrow({
    where: { userId }
  });

  return meliFetch<MeliSellerInfo>(`/users/${account.meliUserId}`, { userId });
}

export async function getSellerItems(userId: string) {
  const account = await prisma.meliAccount.findUniqueOrThrow({
    where: { userId }
  });

  let scrollId: string | undefined;
  const results: string[] = [];

  do {
    const response = await meliFetch<SellerItemsSearchResponse>(
      `/users/${account.meliUserId}/items/search`,
      {
        userId,
        searchParams: {
          search_type: "scan",
          limit: 50,
          scroll_id: scrollId
        }
      }
    );

    results.push(...response.results);
    scrollId = response.scroll_id;
  } while (scrollId && results.length < 500);

  return results;
}

export async function getItemById(userId: string, itemId: string) {
  return meliFetch<MeliItem>(`/items/${itemId}`, { userId });
}

export async function getItemDescription(userId: string, itemId: string) {
  return meliFetch<MeliItemDescription>(`/items/${itemId}/description`, { userId });
}

export async function getCategories(siteId = env.MELI_SITE_ID) {
  return fetch(`https://api.mercadolibre.com/sites/${siteId}/categories`, {
    cache: "no-store"
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Nao foi possivel carregar categorias do Mercado Livre.");
    }

    return (await response.json()) as MeliCategory[];
  });
}

export async function getCategoryAttributes(categoryId: string) {
  return fetch(`https://api.mercadolibre.com/categories/${categoryId}/attributes`, {
    cache: "no-store"
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error("Nao foi possivel carregar atributos da categoria.");
    }

    return (await response.json()) as MeliCategoryAttribute[];
  });
}

export async function searchProducts(query: string, category?: string, priceRange?: string) {
  const url = new URL(`https://api.mercadolibre.com/sites/${env.MELI_SITE_ID}/search`);
  url.searchParams.set("q", query);

  if (category) {
    url.searchParams.set("category", category);
  }

  if (priceRange) {
    url.searchParams.set("price", priceRange);
  }

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Busca no Mercado Livre indisponivel.");
  }

  return (await response.json()) as SearchProductsResponse;
}

function extractAttribute(item: MeliItem, attributeName: string) {
  return (
    item.attributes?.find((attribute) => attribute.name.toLowerCase() === attributeName.toLowerCase())
      ?.value_name ?? null
  );
}

export async function upsertProductFromMeliItem(
  userId: string,
  item: MeliItem,
  description?: MeliItemDescription
) {
  const [category] = await Promise.all([
    fetch(`https://api.mercadolibre.com/categories/${item.category_id}`, { cache: "no-store" }).then(
      async (response) => {
        if (!response.ok) {
          return null;
        }

        return (await response.json()) as MeliCategory;
      }
    )
  ]);

  if (category) {
    await prisma.category.upsert({
      where: { meliCategoryId: category.id },
      update: {
        name: category.name
      },
      create: {
        meliCategoryId: category.id,
        name: category.name
      }
    });
  }

  const product = await prisma.product.upsert({
    where: { meliItemId: item.id },
    update: {
      title: item.title,
      description: description?.plain_text || description?.text || item.title,
      price: item.price,
      originalPrice: item.original_price ?? null,
      currencyId: item.currency_id,
      availableQuantity: item.available_quantity,
      soldQuantity: item.sold_quantity,
      condition: item.condition,
      permalink: item.permalink,
      thumbnail: item.thumbnail,
      categoryId: item.category_id,
      categoryName: category?.name ?? item.category_id,
      brand: extractAttribute(item, "Marca"),
      model: extractAttribute(item, "Modelo"),
      freeShipping: item.shipping?.free_shipping ?? false,
      status: item.status
    },
    create: {
      meliItemId: item.id,
      title: item.title,
      description: description?.plain_text || description?.text || item.title,
      price: item.price,
      originalPrice: item.original_price ?? null,
      currencyId: item.currency_id,
      availableQuantity: item.available_quantity,
      soldQuantity: item.sold_quantity,
      condition: item.condition,
      permalink: item.permalink,
      thumbnail: item.thumbnail,
      categoryId: item.category_id,
      categoryName: category?.name ?? item.category_id,
      brand: extractAttribute(item, "Marca"),
      model: extractAttribute(item, "Modelo"),
      freeShipping: item.shipping?.free_shipping ?? false,
      status: item.status
    }
  });

  await prisma.productImage.deleteMany({
    where: { productId: product.id }
  });

  await prisma.productAttribute.deleteMany({
    where: { productId: product.id }
  });

  if (item.pictures?.length) {
    await prisma.productImage.createMany({
      data: item.pictures.map((picture, index) => ({
        productId: product.id,
        url: picture.secure_url ?? picture.url ?? item.thumbnail,
        position: index
      }))
    });
  }

  if (item.attributes?.length) {
    await prisma.productAttribute.createMany({
      data: item.attributes
        .filter((attribute) => attribute.value_name)
        .map((attribute) => ({
          productId: product.id,
          name: attribute.name,
          value: attribute.value_name!
        }))
    });
  }

  return product;
}

export async function syncSellerProducts(userId: string) {
  const itemIds = await getSellerItems(userId);
  const syncResults = [];

  for (const itemId of itemIds) {
    const [item, description] = await Promise.all([
      getItemById(userId, itemId),
      getItemDescription(userId, itemId).catch(() => ({ plain_text: "" }))
    ]);

    const product = await upsertProductFromMeliItem(userId, item, description);
    syncResults.push(product.id);
  }

  return {
    syncedCount: syncResults.length,
    syncedIds: syncResults
  };
}

export async function syncSingleProductByItemId(userId: string, itemId: string) {
  const [item, description] = await Promise.all([
    getItemById(userId, itemId),
    getItemDescription(userId, itemId).catch(() => ({ plain_text: "" }))
  ]);

  return upsertProductFromMeliItem(userId, item, description);
}
