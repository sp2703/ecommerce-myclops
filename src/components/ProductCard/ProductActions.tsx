import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';

interface ProductActionsProps {
  onAddToCart: () => void;
  onAddToFavorites: () => void;
}

export function ProductActions({ onAddToCart, onAddToFavorites }: ProductActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        onClick={onAddToCart}
        className="flex-1 btn-primary flex items-center justify-center gap-2"
      >
        <ShoppingCartIcon className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
      <button
        onClick={onAddToFavorites}
        className="btn-secondary p-3"
        aria-label="Add to favorites"
      >
        <HeartIcon className="w-6 h-6" />
      </button>
    </div>
  );
}