import { Promotion } from "@/types/promo";

export const blogsUrl = "http://127.0.0.1:8000/promotions";

export const fetchPromotions = async (
  page: number = 1,
  page_size: number = 10,
) => {
  if (!blogsUrl) return [];

  const res = await fetch(`${blogsUrl}/?page=${page}&page_size=${page_size}`, {
    cache: "no-store",
  });
  const blogs: Promotion[] = await res.json();
  return blogs;
};
