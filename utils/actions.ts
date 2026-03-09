'use server'

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export const fetchFeaturedProducts = async () => {
  return await prisma.product.findMany({
    where: {
      featured: true,
    }
  });
}

export const fetchAllProducts = async (search: string) => {
  return await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          company: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ]
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
}

export const fetchSingleProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  })

  if (!product) redirect('/products');

  return product;
}

export const addToCart = async (id: string, formData: FormData) => {
  console.log('addToCart, productId: ', id);

  await new Promise((resolve) => setTimeout(resolve, 0));
}