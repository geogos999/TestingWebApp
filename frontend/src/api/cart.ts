// Centralized API endpoints for cart operations
export const CART_API = {
  base: '/cart',
  add: '/cart', // POST
  update: (id: string) => `/cart/${id}`,
  remove: (id: string) => `/cart/${id}`,
  get: '/cart',
};
