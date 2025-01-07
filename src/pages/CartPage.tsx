import React from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { analyticsInstance } from "../lib/analytics";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, getTotalValue } = useCartStore();
  const userId = useAuthStore((state) => state.userId);

  const handleProceedToCheckout = () => {
    if (userId && items.length > 0) {
      analyticsInstance.proceedToCheckout({
        userId,
        productIds: items.map((item) => item.id),
        cartValue: getTotalValue(),
        currency: "USD",
        productName: items.map((item) => item.name).join(", "),
      });
      navigate("/checkout");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    {item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: item.currency,
                    })}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl">
                {getTotalValue().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </div>
            <button
              onClick={handleProceedToCheckout}
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
