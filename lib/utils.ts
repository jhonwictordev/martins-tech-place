import { clsx, type ClassValue } from "clsx";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(value: number, currency = "BRL") {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency
  }).format(value);
}

export function slugifyText(value: string) {
  return slugify(value, { lower: true, strict: true, trim: true });
}

export function getDiscountPercentage(price: number, originalPrice?: number | null) {
  if (!originalPrice || originalPrice <= price) {
    return 0;
  }

  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

export function isOffer(price: number, originalPrice?: number | null) {
  return getDiscountPercentage(price, originalPrice) > 0;
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) {
    return "Nao informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(date));
}

export function formatCompactNumber(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function buildAbsoluteUrl(pathname = "/") {
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  return new URL(pathname, baseUrl).toString();
}
