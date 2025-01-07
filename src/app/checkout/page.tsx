"use client";

import { useStore } from "@/store/useStore";
import { analyticsInstance } from "@/lib/analytics";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const { userId, cart, clearCart } = useStore();

  const totalValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToPayment = () => {
    if (userId) {
      analyticsInstance.proceedToPayment({
        userId,
        productIds: cart.map((item) => item.id),
        cartValue: totalValue,
        currency: cart[0]?.currency || "USD",
        productName: cart.map((item) => item.name).join(", "),
      });
      clearCart();
      // router.push('/thank-you');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>
              {item.price * item.quantity} {item.currency}
            </span>
          </div>
        ))}
        <div className="border-t mt-4 pt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>
              {totalValue} {cart[0]?.currency || "USD"}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleProceedToPayment}
        className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
