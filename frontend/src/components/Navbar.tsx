import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {

  const { user, logout, isAuthenticated } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary-600" data-testid="home-link">
              E-Commerce Test App
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              data-testid="products-link"
            >
              Products
            </Link>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/cart" 
                  className="relative text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  data-testid="cart-link"
                >
                  <span className="material-icons align-middle mr-1">shopping_cart</span>
                  Cart
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-2 bg-primary-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold" data-testid="cart-count">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </Link>
                <Link 
                  to="/orders" 
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  data-testid="orders-link"
                >
                  Orders
                </Link>
                <div className="relative group">
                  <button 
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                    data-testid="user-menu-button"
                  >
                    {user?.firstName} {user?.lastName}
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      data-testid="profile-link"
                    >
                      Profile
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        data-testid="admin-link"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      data-testid="logout-button"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                  data-testid="login-link"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                  data-testid="register-link"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
