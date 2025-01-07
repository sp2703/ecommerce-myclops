import React from "react";
import { mockProducts } from "../data/mockProducts";
import ProductCard from "../components/ProductCard";

const HomePage: React.FC = () => {
  const featuredProducts = mockProducts.filter((product) => product.featured);
  const regularProducts = mockProducts.filter((product) => !product.featured);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
