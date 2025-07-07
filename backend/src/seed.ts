import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets',
      imageUrl: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400'
    }
  });

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Fashion and apparel',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400'
    }
  });

  const books = await prisma.category.create({
    data: {
      name: 'Books',
      description: 'Books and literature',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
    }
  });

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  await prisma.user.create({
    data: {
      email: 'admin@ecommerce.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  // Create test user
  const testUserPassword = await bcrypt.hash('user123', 12);
  await prisma.user.create({
    data: {
      email: 'user@test.com',
      password: testUserPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'USER'
    }
  });

  // Create products
  const products = [
    // Electronics
    {
      name: 'MacBook Pro 16"',
      description: 'Apple MacBook Pro 16-inch with M3 Pro chip, 18GB RAM, 512GB SSD',
      price: 2499.00,
      categoryId: electronics.id,
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      stock: 15,
      featured: true
    },
    {
      name: 'iPhone 15 Pro',
      description: 'Latest iPhone with titanium design and USB-C',
      price: 999.00,
      categoryId: electronics.id,
      imageUrl: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      stock: 25,
      featured: true
    },
    {
      name: 'Sony WH-1000XM5',
      description: 'Premium noise-canceling wireless headphones',
      price: 399.99,
      categoryId: electronics.id,
      imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
      stock: 30,
      featured: false
    },
    {
      name: 'iPad Air',
      description: 'Powerful, colorful, and versatile iPad Air with M2 chip',
      price: 599.00,
      categoryId: electronics.id,
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      stock: 20,
      featured: true
    },
    
    // Clothing
    {
      name: 'Premium Cotton T-Shirt',
      description: 'Comfortable, high-quality cotton t-shirt in multiple colors',
      price: 29.99,
      categoryId: clothing.id,
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      stock: 50,
      featured: false
    },
    {
      name: 'Denim Jacket',
      description: 'Classic blue denim jacket, perfect for layering',
      price: 89.99,
      categoryId: clothing.id,
      imageUrl: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5c?w=400',
      stock: 25,
      featured: true
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight running shoes with excellent cushioning',
      price: 129.99,
      categoryId: clothing.id,
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      stock: 35,
      featured: false
    },
    
    // Books
    {
      name: 'The Art of Clean Code',
      description: 'A handbook of agile software craftsmanship',
      price: 39.99,
      categoryId: books.id,
      imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
      stock: 100,
      featured: true
    },
    {
      name: 'JavaScript: The Good Parts',
      description: 'Essential reading for JavaScript developers',
      price: 29.99,
      categoryId: books.id,
      imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      stock: 75,
      featured: false
    },
    {
      name: 'Design Patterns',
      description: 'Elements of Reusable Object-Oriented Software',
      price: 49.99,
      categoryId: books.id,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      stock: 40,
      featured: false
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('📧 Admin login: admin@ecommerce.com / admin123');
  console.log('📧 Test user login: user@test.com / user123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
