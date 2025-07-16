
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  stock: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get('/products');
        setProducts(res.data.products || res.data);
        setError(null);
      } catch (err: any) {
        setError('Failed to fetch products');
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const { addToCart } = useCart();
  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId, 1);
      setCartMessage('Added to cart!');
      setTimeout(() => setCartMessage(null), 1500);
    } catch (err: any) {
      const msg = err?.response?.data?.error || 'Failed to add to cart';
      setCartMessage(msg);
      setTimeout(() => setCartMessage(null), 1500);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" data-testid="products-page">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      {cartMessage && (
        <div className="mb-4 text-green-600 font-semibold" data-testid="cart-message">{cartMessage}</div>
      )}
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
