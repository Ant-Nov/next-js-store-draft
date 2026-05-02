'use server'

import { ActionResult } from "@/interfaces";
import prisma from "@/lib/prisma";
import { imageFileSchema, idSchema, productSchema, amountSchema } from "@/schemas";
import { currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { validateData } from "./validateData";
import { deleteImage, uploadImage } from "./supabase";
import { revalidatePath } from "next/cache";
import { Cart, Favorite, Order, Review } from "@prisma/client";
import { addReviewSchema } from "@/schemas/add-review.schema";
import { headers } from 'next/headers'
import { stripe } from '../lib/stripe';

const getCurrentUser = async (): Promise<User> => {
  const user = await currentUser();

  if (!user) redirect('/');

  return user;
}

const getErrorResult = (error: unknown): ActionResult => {
  return {
      success: false,
      message: error instanceof Error ? error.message : 'There was an error...',
    };
}

export const fetchFeaturedProducts = async () => {
  return await prisma.product.findMany({
    where: {
      featured: true,
    }
  });
}

export const fetchAdminProducts = async () => {
  const user = await getCurrentUser();

  return await prisma.product.findMany({
    where: {
      clerkId: user.id,
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

export const createProduct = async (initState: ActionResult, formData: FormData): Promise<ActionResult> => {
  const user = await getCurrentUser();
  
  try {
    const formValue = Object.fromEntries(formData);
    const result = validateData(formValue, productSchema);
    const validatedImage = validateData(formValue.image, imageFileSchema);
    const image = await uploadImage(validatedImage);

    await prisma.product.create({
      data: {
        ...result,
        clerkId: user.id,
        image,
      },
    })

    return { success: true, message: 'Product has been created' };
  } catch (error) {
    console.log(error);

    return getErrorResult(error);
  }
}

export const deleteProduct = async (productId: string): Promise<ActionResult> => {
  try {
    const product = await prisma.product.delete({
      where: {
        id: productId
      }
    });

    await deleteImage(product.image);

    revalidatePath('/admin/products')
    return { success: true, message: 'Product has been removed' };
  } catch (error) {
    return getErrorResult(error);
  }

}

export const updateProduct = async (prevState: ActionResult, formData: FormData): Promise<ActionResult> => {
  try {
    const formValue = Object.fromEntries(formData);
    const { id } = validateData(formValue, idSchema);
    const result = validateData(formValue, productSchema);

    const currentImage = formValue.currentImage as string
    let image = currentImage;

    if (formValue.image instanceof File && formValue.image.size > 0) {
      const validatedImage = validateData(formValue.image, imageFileSchema);

      image = await uploadImage(validatedImage);

      if (currentImage) await deleteImage(currentImage);
    }
  
    await prisma.product.update({
      where: { id },
      data: { ...result, image },
    });

    revalidatePath(`/admin/products/${id}`);
    
    return { success: true, message: 'Product has been updated' };
  } catch (error) {
    return getErrorResult(error);
  }
}

export const getFavouriteProduct = async (productId: string): Promise<Favorite | null> => {
  const { id: clerkId } = await getCurrentUser();

  const favourite = await prisma.favorite.findFirst({
    where: { productId, clerkId },
  });

  return favourite;
}

export const getFavourites = async () => {
  const { id: clerkId } = await getCurrentUser();

  const favourites = await prisma.favorite.findMany({
    where: { clerkId },
    include: { product: true },
  });

  return favourites;
}

export const toggleFavourites = async ({
  productId,
  favouriteId,
  pathname
}: {
  productId: string;
  favouriteId: string | null;
  pathname: string;
}): Promise<ActionResult> => {
  const { id: clerkId } = await getCurrentUser();
  const message = !favouriteId ? 'Added to favourites' : 'Removed from favourites'

  const action = !favouriteId
    ? prisma.favorite.create({
        data: { clerkId, productId }
      })
    : prisma.favorite.delete({
        where: { id: favouriteId }
      })

  try {
    await action;

    revalidatePath(pathname);

    return { success: true, message };

  } catch (error) {
    return getErrorResult(error);
  }
}

export const getMyReviews = async () => {
  const { id: clerkId } = await getCurrentUser();

  const myReviews = await prisma.review.findMany({
    where: { clerkId },
    include: { product: true }
  });

  return myReviews;
}

export const getMyReviewByProduct = async (productId: string, user: User | null): Promise<Review | null> => {
  if (!user) return null;

  const reviewByProduct = await prisma.review.findFirst({
    where: { clerkId: user.id, productId },
  });

  return reviewByProduct;
}


export const getProductReviews = async (productId: string): Promise<Review[]> => {
  const reviews = await prisma.review.findMany({
    where: { productId },
  });

  return reviews;
}

export const addReview = async (productId: string, prevState: ActionResult, formData: FormData): Promise<ActionResult> => {
  try {
    const { id: clerkId, fullName, imageUrl } = await getCurrentUser();
    const formValue = Object.fromEntries(formData);
    const ratingReview = validateData(formValue, addReviewSchema);

    await prisma.review.create({
      data: {
        ...ratingReview,
        clerkId,
        productId,
        authorName: fullName || '',
        authorImage: imageUrl,
      },
    });

    revalidatePath(`/products/${productId}`);

    return { success: true, message: 'Review has been added' };
  } catch (error) {
    console.log('')
    return getErrorResult(error);
  }
}

export const removeMyReview = async ({ id , path }: { id: string; path: string; }): Promise<ActionResult> => {
  const { id: clerkId } = await getCurrentUser();

  try {
    await prisma.review.delete({
      where: { clerkId, id },
    });

    revalidatePath(path);

    return { success: true, message: 'Review has been removed' };
  } catch (error) {
    return getErrorResult(error);
  }
}

export const fetchCartItemsNumber = async () => {
  const user = await currentUser();

  if (!user) return [];

  const cart = await prisma.cart.findFirst({
    where: { clerkId: user.id },
    select: { numItemsInCart: true }
  });

  return cart?.numItemsInCart || 0;
};

export const fetchOrCreateCart = async () => {
  const { id: clerkId } = await getCurrentUser();

  const existingCart = await prisma.cart.findFirst({
    where: { clerkId },
    include: { cartItems: true },
  });

  if (existingCart) return existingCart;

  const newCart = await prisma.cart.create({
    data: { clerkId },
    include: { cartItems: true }
  });

  return newCart
};

export const getCartItems = async (cartId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId },
    include: { product: true },
  });

  return cartItems;
}

export const updateCart = async (cartId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: { cartItems: { include: { product: true }}},
  });

  const cartItems = cart?.cartItems || [];
  const shipping = cart?.shipping || 0;
  const numItemsInCart = cartItems.reduce((acc, item) => acc + item.amount, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.amount, 0);
  const tax = cartTotal * (cart?.taxRate || 0);
  const orderTotal = cartTotal + shipping + tax;

  await prisma.cart.update({
    where: { id: cartId },
    data: {
      numItemsInCart,
      cartTotal,
      orderTotal,
      tax,
    }
  })
};

const updateOrCreateCartItem = async (cartId: string, productId: string, amount: number) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: { cartId, productId },
  });

  if (cartItem) {
    await prisma.cartItem.update({
      where: { id: cartItem.id },
      data: { amount },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId,
        amount,
        productId,
      }
    });
  }
};

export const addToCart = async (productId: string, initState: ActionResult, formData: FormData): Promise<ActionResult> => {
  const { id: cartId } = await fetchOrCreateCart();

  try {
    const formValue = Object.fromEntries(formData);
    const validatedValue = validateData(formValue, amountSchema);

    await updateOrCreateCartItem(cartId, productId, validatedValue.amount);
    await updateCart(cartId);
  } catch (error) {
    return getErrorResult(error);
  }

  revalidatePath(`/products/${productId}`);
  redirect('/cart');
}

export const updateCartItem = async (id: string, amount: string) => {
  console.log('update cart item: ', id, amount);

  try {
    const cartItem = await prisma.cartItem.update({
      where: { id },
      data: {
        amount: +amount,
      }
    });

    await updateCart(cartItem.cartId);

    revalidatePath('/cart');
  } catch (error) {
    return getErrorResult(error);
  }
};

export const removeCartItem = async (id: string): Promise<ActionResult> => {
  try {
    const cartItem = await prisma.cartItem.delete({
      where: { id },
    });

    await updateCart(cartItem.cartId);
    revalidatePath('/cart');

    return { success: true, message: 'Item has been removed from your cart.' }
  } catch (error) {
    return getErrorResult(error);
  }
};

export const createOrder = async (cart: Cart): Promise<ActionResult> => {
  const { id: clerkId, emailAddresses } = await getCurrentUser();

  let orderId: null | string = null;
  const cartId: null | string = cart.id;

  try {

    await prisma.order.deleteMany({
      where: { clerkId, isPaid: false },
    });

    const order = await prisma.order.create({
      data: {
        clerkId,
        products: cart.numItemsInCart,
        tax: cart.tax,
        orderTotal: cart.orderTotal,
        shipping: cart.shipping,
        email: emailAddresses[0].emailAddress,
      }
    });

    orderId = order.id;
  } catch (error) {
    return getErrorResult(error);
  }

  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
}

export const getUserOrders = async (): Promise<Order[]> => {
  const user = await getCurrentUser();

  const orders = await prisma.order.findMany({
    where: { clerkId: user.id, isPaid: true },
    orderBy: { createdAt: 'desc' },
  });

  return orders;
}

export const getAllOrders = async (): Promise<Order[]> => {
  const orders = await prisma.order.findMany({
    where: { isPaid: true },
    orderBy: { createdAt: 'desc' },
  });

  return orders;
}

export async function fetchClientSecret(orderId: string, cartId: string) {
  const origin = (await headers()).get('origin')

  const cartItems = await getCartItems(cartId);

  // Convert cart items to Stripe line_items
  const lineItems = cartItems.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.product.name,
        images: [item.product.image || ''],
      },
      unit_amount: item.product.price * 100, // price in cents
    },
    quantity: item.amount,
  }));

  // Create Checkout Sessions from body params.
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded_page',
    line_items: lineItems,
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    metadata: { orderId, cartId }
  })

  if (!session.client_secret) throw new Error('Failed to create checkout session');
  return session.client_secret;
}