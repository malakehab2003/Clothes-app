export interface Iproduct {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  quantity: number;
  reviews?: number;
  discount?: number;
  category: string;
  color: string;
  size: string;
  style: string;
}
