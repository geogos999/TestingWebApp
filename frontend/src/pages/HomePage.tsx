import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen" data-testid="home-page">
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="hero-title">
            Welcome to E-Commerce Test App
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100" data-testid="hero-subtitle">
            A comprehensive web application designed for automated testing with Page Object Model
          </p>
          <div className="space-x-4">
            <Link 
              to="/products" 
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              data-testid="shop-now-button"
            >
              Shop Now
            </Link>
            <Link 
              to="/register" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-3 px-8 rounded-lg transition-colors duration-200"
              data-testid="get-started-button"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="features-title">
              Perfect for Testing Automation
            </h2>
            <p className="text-lg text-gray-600" data-testid="features-subtitle">
              This application includes comprehensive features ideal for demonstrating Page Object Model patterns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="feature-1">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🔐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">User Authentication</h3>
              <p className="text-gray-600">Complete login, registration, and user management system with role-based access control.</p>
            </div>

            <div className="text-center" data-testid="feature-2">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">E-Commerce Features</h3>
              <p className="text-gray-600">Product catalog, shopping cart, checkout process, and order management functionality.</p>
            </div>

            <div className="text-center" data-testid="feature-3">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Dashboard</h3>
              <p className="text-gray-600">Administrative interface for managing products, categories, and user accounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" data-testid="cta-title">
            Ready to Start Testing?
          </h2>
          <p className="text-lg text-gray-600 mb-8" data-testid="cta-subtitle">
            Explore all the features and test different user workflows
          </p>
          <div className="space-x-4">
            <Link 
              to="/login" 
              className="btn-primary"
              data-testid="login-cta-button"
            >
              Login to Test Account
            </Link>
            <Link 
              to="/products" 
              className="btn-secondary"
              data-testid="browse-products-button"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
