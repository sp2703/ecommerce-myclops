"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import { analyticsInstance } from "@/lib/analytics";
import { mockProducts } from "@/lib/mockData";
import { ProductGrid } from "@/components/ProductGrid";
import { WelcomeSection } from "@/components/WelcomeSection";
import { useRouter } from "next/navigation";

export default function Home() {
  const { userId, favorites } = useStore();

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
        <h2 className="section-title">Favorites</h2>
        <ProductGrid products={favorites} />
      </section>
    </div>
  );
}
