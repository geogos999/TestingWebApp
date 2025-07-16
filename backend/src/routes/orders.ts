import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get user's orders (ensure product.price is a number)
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Convert product.price to number for each order item
    const ordersWithNumberPrice = orders.map(order => ({
      ...order,
      items: order.items.map((item: any) => ({
        ...item,
        price: typeof item.price === 'string' ? parseFloat(item.price) : Number(item.price),
        product: item.product ? {
          ...item.product,
          price: typeof item.product.price === 'string' ? parseFloat(item.product.price) : Number(item.product.price)
        } : item.product
      }))
    }));

    res.json(ordersWithNumberPrice);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create order from cart
router.post('/checkout', authenticateToken, async (req: AuthRequest, res) => {
  try {
    // Get user's cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total (ensure price is a number)
    const total = cartItems.reduce((sum, item) => {
      const price = typeof item.product.price === 'string' ? parseFloat(item.product.price) : Number(item.product.price);
      return sum + (price * item.quantity);
    }, 0);

    // Create order with items
    const order = await prisma.order.create({
      data: {
        userId: req.userId!,
        total,
        items: {
          create: cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: typeof item.product.price === 'string' ? parseFloat(item.product.price) : Number(item.product.price)
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { userId: req.userId }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
