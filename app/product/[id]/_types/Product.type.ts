export interface Review {
  name?: string;
  rating?: number;
  title?: string;
  content?: string;
  likes?: number;
  dislikes?: number;
}

export interface ProductType {
  productId: number;
  title: string;
  image: string;
  price: number;
  description: string;
  brand: string;
  model: string;
  color?: string | null;
  size?: string | null;
  ram?: string | null;
  category: string;
  discount?: number;
  stock?: number;
  rating?: number;
  reviews?: Review[];
}
