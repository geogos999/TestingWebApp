# Copilot Instructions for E-Commerce Test Application

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a comprehensive full-stack e-commerce web application designed specifically for automated testing with Page Object Model patterns. The application includes:

### Technology Stack
- **Frontend**: React 18 with TypeScript, Tailwind CSS, React Router, React Query
- **Backend**: Node.js with Express, TypeScript, JWT authentication, Prisma ORM
- **Database**: PostgreSQL
- **Containerization**: Docker Compose

### Key Features for Testing
- User authentication (login/register) with role-based access
- Product catalog with search and filtering
- Shopping cart functionality
- Checkout process
- User profile management
- Order history
- Admin dashboard
- Comprehensive data-testid attributes for automated testing

### Testing Considerations
- All interactive elements include `data-testid` attributes
- Forms include proper validation and error handling
- Loading states and error states are implemented
- Different user roles (USER, ADMIN) for testing access control
- Comprehensive API endpoints for all CRUD operations

### Development Guidelines
- Use TypeScript for all new code
- Include `data-testid` attributes on all testable elements
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Follow REST API conventions for backend endpoints

### Test Data
- Admin user: admin@ecommerce.com / admin123
- Test user: user@test.com / user123
- Sample products and categories are seeded in the database
