
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  categoryId?: string;
}

const initialForm: Partial<Product> = {
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  stock: 0,
};

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Partial<Product>>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/products');
      setProducts(res.data.products || res.data); // support both array and {products: []}
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' || name === 'stock' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`/products/${editingId}`, form);
      } else {
        await axios.post('/products', form);
      }
      setForm(initialForm);
      setEditingId(null);
      fetchProducts();
      setError(null);
    } catch (err: any) {
      setError('Failed to save product');
    }
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    setLoading(true);
    try {
      await axios.delete(`/products/${id}`);
      fetchProducts();
      setError(null);
    } catch (err: any) {
      setError('Failed to delete product');
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  return (
    <div className="container mx-auto px-4 py-8" data-testid="admin-page">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <h2 className="text-2xl font-semibold mb-4">Product Management</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2 rounded"
            required
          />
          <input
            name="price"
            type="number"
            value={form.price || ''}
            onChange={handleChange}
            placeholder="Price"
            className="border p-2 rounded"
            required
            min={0}
            step={0.01}
          />
          <input
            name="imageUrl"
            value={form.imageUrl || ''}
            onChange={handleChange}
            placeholder="Image URL"
            className="border p-2 rounded"
          />
          <input
            name="stock"
            type="number"
            value={form.stock || ''}
            onChange={handleChange}
            placeholder="Stock"
            className="border p-2 rounded"
            min={0}
          />
        </div>
        <textarea
          name="description"
          value={form.description || ''}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded w-full mt-4"
          rows={2}
        />
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b font-semibold">{product.name}</td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">{product.stock}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => handleEdit(product)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => handleDelete(product.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
