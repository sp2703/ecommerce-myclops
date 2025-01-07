"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { analyticsInstance } from "@/lib/analytics";
import { mockProducts } from "@/lib/mockData";
import { ProductGrid } from "@/components/ProductGrid";
import { WelcomeSection } from "@/components/WelcomeSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userId } = useStore();

  const router = useRouter();

  const handleDeviceClick = () => {
    router.push(`/devices`);
  };

  const handleAccessorieClick = () => {
    router.push(`/accessories`);
  };
  const featuredProducts = mockProducts.filter((p) => p.featured);
  const deviceProducts = mockProducts.filter((p) => p.category === "devices");
  const accessorieProducts = mockProducts.filter(
    (p) => p.category === "accessories"
  );

  // useEffect(() => {
  //   if (userId) {
  //     featuredProducts.forEach(product => {
  //       analyticsInstance.trackFeatureProducts({
  //         userId,
  //         productId: product.id,
  //         productCost: product.price,
  //         currency: product.currency,
  //         productName: product.name,
  //       });
  //     });
  //   }
  // }, [userId, featuredProducts]);

  return (
    <div className="space-y-16">
      <WelcomeSection />

      <section>
        <div className="flex flex-row w-full">
          <div
            className="w-32 h-10 border-[1px] border-black hover:border-blue-500 hover:bg-blue-500 hover:text-white font-bold rounded-md transition-all duration-300 cursor-pointer flex items-center justify-center mr-4"
            onClick={handleDeviceClick}
          >
            Devices
          </div>
          <div
            className="w-32 h-10 border-[1px] border-black hover:border-blue-500 hover:bg-blue-500 hover:text-white font-bold rounded-md transition-all duration-300 cursor-pointer flex items-center justify-center"
            onClick={handleAccessorieClick}
          >
            Accessories
          </div>
        </div>
      </section>
      <section>
        <h2 className="section-title">Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>

      <section>
        <h2 className="section-title">All Products</h2>
        <ProductGrid products={mockProducts} />
      </section>
    </div>
  );
}
