# E-Commerce Test Application

A comprehensive full-stack e-commerce web application designed specifically for automated testing with Page Object Model patterns.

## 🚀 Features

### For Testing Automation
- **Complete User Flows**: Registration, login, shopping, checkout
- **Role-Based Access**: User and Admin roles with different permissions
- **Rich UI Elements**: Forms, modals, dropdowns, search, pagination
- **Test-Friendly Attributes**: Comprehensive `data-testid` attributes
- **Error Handling**: Proper error states and validation messages
- **Loading States**: Spinners and loading indicators

### Application Features
- 🔐 **User Authentication** - Login, registration, JWT-based auth
- 🛍️ **Product Catalog** - Browse, search, filter products
- 🛒 **Shopping Cart** - Add, update, remove items
- 💳 **Checkout Process** - Complete order workflow
- 👤 **User Profile** - Account management
- 📦 **Order History** - View past orders
- ⚙️ **Admin Dashboard** - Product and user management

## 🏗️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for API state management
- **Axios** for HTTP requests

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma** ORM with PostgreSQL
- **JWT** authentication
- **bcryptjs** for password hashing

### Infrastructure
- **Docker Compose** for containerization
- **PostgreSQL** database
- **Nginx** for production (optional)

## 🐳 Getting Started with Docker

### Prerequisites
- Docker and Docker Compose installed
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TestingWebApplication
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432

### Test Accounts
- **Admin**: admin@ecommerce.com / admin123
- **User**: user@test.com / user123

## 🧪 Perfect for Testing

### Page Object Model Structure
The application is designed with clear, testable page structures:

```
Pages/
├── HomePage - Landing page with hero section
├── LoginPage - User authentication
├── RegisterPage - User registration
├── ProductsPage - Product catalog with filters
├── ProductDetailPage - Individual product view
├── CartPage - Shopping cart management
├── CheckoutPage - Order completion
├── ProfilePage - User account settings
├── OrdersPage - Order history
└── AdminDashboard - Administrative functions
```

### Test Data IDs
All interactive elements include `data-testid` attributes:
- `navbar` - Main navigation
- `login-form` - Login form
- `product-card` - Product items
- `add-to-cart-button` - Add to cart buttons
- `checkout-button` - Checkout process
- And many more...

## 🔧 Development

### Manual Setup (without Docker)

1. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Set up environment variables
   cp .env.example .env
   
   # Database setup
   npx prisma migrate dev
   npx prisma generate
   npm run seed
   
   # Start development server
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=postgresql://ecommerce_user:ecommerce_password@localhost:5432/ecommerce_db
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
PORT=5000
```

**Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders/checkout` - Create order from cart

### Categories
- `GET /api/categories` - Get all categories

### Users
- `GET /api/users/profile` - Get user profile

## 🧪 Testing Guidelines

### Recommended Test Scenarios

1. **User Authentication Flow**
   - Registration with validation
   - Login with correct/incorrect credentials
   - Logout functionality

2. **Product Browsing**
   - View product catalog
   - Search and filter products
   - View product details

3. **Shopping Cart**
   - Add products to cart
   - Update quantities
   - Remove items
   - Cart persistence

4. **Checkout Process**
   - Complete purchase flow
   - Order confirmation
   - Order history

5. **Admin Functions**
   - Admin login
   - Product management
   - User management

### Test Data
The application includes seeded test data:
- 10+ sample products across 3 categories
- Admin and regular user accounts
- Various product configurations for testing

## 🛠️ VS Code Tasks

The project includes VS Code tasks for common operations:
- Build and run with Docker
- Start development servers
- Run database migrations
- Execute tests

## 📄 License

This project is created for educational and testing purposes.

## 🤝 Contributing

This application is designed specifically for testing automation demonstrations. Feel free to extend it with additional features that would benefit automated testing scenarios.
