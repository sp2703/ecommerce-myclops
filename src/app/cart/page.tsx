"use client";

import { useStore } from "@/store/useStore";
import { analyticsInstance } from "@/lib/analytics";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const { userId, cart, removeFromCart } = useStore();

  const totalValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    if (userId) {
      analyticsInstance.proceedToCheckout({
        userId,
        productIds: cart.map((item) => item.id),
        cartValue: totalValue,
        currency: cart[0]?.currency || "USD",
        productName: cart.map((item) => item.name).join(", "),
      });
      router.push("/checkout");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    {item.price} {item.currency} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white rounded-lg shadow">
            <div className="text-xl font-bold mb-4">
              Total: {totalValue} {cart[0]?.currency || "USD"}
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
