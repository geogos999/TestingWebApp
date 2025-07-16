import React from 'react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    stock: number;
  };
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      {product.imageUrl ? (
        <img src={product.imageUrl} alt={product.name} className="h-40 w-40 object-cover mb-4 rounded" />
      ) : (
        <div className="h-40 w-40 flex items-center justify-center bg-gray-100 mb-4 rounded text-gray-400">No image</div>
      )}
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="font-bold text-primary-600 mb-2">${product.price.toFixed(2)}</div>
      <button
        className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 disabled:opacity-50"
        onClick={() => onAddToCart(product.id)}
        disabled={product.stock === 0}
        data-testid={`add-to-cart-${product.id}`}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
