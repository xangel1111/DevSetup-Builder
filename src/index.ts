export type Category = 'monitor' | 'keyboard' | 'mouse' | 'headset' | 'chair';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}