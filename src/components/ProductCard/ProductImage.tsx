interface ProductImageProps {
  src: string;
  alt: string;
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="aspect-w-4 aspect-h-3">
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}