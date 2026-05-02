export interface CartState {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
}

export interface CartItem {
  productId: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
}