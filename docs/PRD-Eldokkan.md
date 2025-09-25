1. Overview

E-Commerce platform for online shopping with user accounts, product catalog, shopping cart, orders, and payment system.
The backend will be built using TypeScript + Ts.ED, Postgres database, Redis caching, and Dockerized deployment.

2. Goals

Provide customers with a simple, secure way to browse products, add to cart, and place orders.

Enable admins to manage products, categories, stock, and view orders.

Support scalable architecture with caching and clean separation of concerns.

3. User Roles

Customer

Register/Login

Browse products/categories

Add/remove items to/from cart

Place orders & make payments

View order history

Admin

Manage products (CRUD)

Manage categories

Manage stock levels

View all orders & payments

4. Core Features
Authentication

User registration (email, password, role default=customer).

Login + JWT authentication.

Products & Categories

Browse products by category.

Search & filter products.

Product details (name, description, price, stock).

Cart

One cart per user.

Add/remove/update items.

Redis caching for quick access.

Orders

Create order from cart.

Track status (pending → paid → shipped → delivered).

Payments

Payment integration (initially mock → later real provider e.g. Stripe/PayPal).

Status tracking (pending, succeeded, failed, refunded).

Admin Panel

CRUD categories/products.

Manage stock levels.

View orders/payments reports.

5. Non-Functional Requirements

Performance: Use Redis caching for product listing & cart retrieval.

Security: Password hashing (bcrypt), JWT for auth, role-based access.

Scalability: Modular clean architecture, Dockerized services.

Reliability: Postgres with migrations, indexes for performance.

Maintainability: Clean arch + Dependency injection (tsed.dev).

6. Tech Stack

Backend: Node.js, TypeScript, Ts.ED (DI + controllers).

Database: PostgreSQL + Prisma/TypeORM.

Cache: Redis.

Containerization: Docker & docker-compose.

Version Control: GitHub repo.