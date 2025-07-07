import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Get user's cart
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.userId },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    });

    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add item to cart
router.post('/add', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.userId!,
          productId
        }
      }
    });

    if (existingItem) {
      const updatedItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: {
          product: true
        }
      });
      res.json(updatedItem);
    } else {
      const newItem = await prisma.cartItem.create({
        data: {
          userId: req.userId!,
          productId,
          quantity
        },
        include: {
          product: true
        }
      });
      res.status(201).json(newItem);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update cart item quantity
router.put('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { quantity } = req.body;

    const updatedItem = await prisma.cartItem.update({
      where: { id: req.params.id },
      data: { quantity },
      include: {
        product: true
      }
    });

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove item from cart
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    await prisma.cartItem.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
