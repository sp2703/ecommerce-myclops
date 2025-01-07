import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { analyticsInstance } from "../lib/analytics";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalValue, clearCart } = useCartStore();
  const userId = useAuthStore((state) => state.userId);

  const handleProceedToPayment = () => {
    if (userId && items.length > 0) {
      analyticsInstance.proceedToPayment({
        userId,
        productIds: items.map((item) => item.id),
        cartValue: getTotalValue(),
        currency: "USD",
        productName: items.map((item) => item.name).join(", "),
      });
      clearCart();
      // Simulate successful payment
      alert("Payment successful!");
      navigate("/");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-600 ml-2">x{item.quantity}</span>
              </div>
              <span>
                {(item.price * item.quantity).toLocaleString("en-US", {
                  style: "currency",
                  currency: item.currency,
                })}
              </span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>
                {getTotalValue().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={handleProceedToPayment}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
