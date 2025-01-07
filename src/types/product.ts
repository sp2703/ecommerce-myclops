export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  featured?: boolean;
  category: string;
}
