import { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="space-y-2 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2">
        {product.description}
      </p>
      <div className="flex items-center justify-between mt-4">
        <p className="text-2xl font-bold text-gray-900">
          {product.currency} {product.price.toFixed(2)}
        </p>
        <div className="text-sm text-gray-500">Free shipping</div>
      </div>
    </div>
  );
}
