import React from 'react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cart, isLoading, removeFromCart, updateQuantity } = useCart();

  const handleRemove = (id: string) => {
    removeFromCart(id);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) updateQuantity(id, quantity);
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8" data-testid="cart-page">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : cart.length === 0 ? (
        <div className="text-gray-600">Your cart is empty.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Subtotal</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b font-semibold flex items-center gap-2">
                    {item.product.imageUrl && (
                      <img src={item.product.imageUrl} alt={item.product.name} className="h-10 w-10 object-cover rounded" />
                    )}
                    {item.product.name}
                  </td>
                  <td className="py-2 px-4 border-b">${item.product.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-right mt-4 font-bold text-lg">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
