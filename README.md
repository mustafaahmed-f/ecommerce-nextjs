# Luminae Store - Next.js E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)](https://mongodb.com)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white)](https://redis.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

A modern e-commerce platform built with Next.js, TypeScript, MongoDB, Redis, and Tailwind CSS, featuring advanced features like offline cart support and autocomplete search. The platform is built using modern web technologies and follows best practices for scalability and maintainability.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Performance Optimization](#performance-optimization)
- [Deployment](#deployment)

## Overview

Luminae Store is a modern e-commerce platform that provides a seamless shopping experience with advanced features like offline cart support and autocomplete search. The platform is built using modern web technologies and follows best practices for scalability and maintainability.

## Key Features

### Shopping Experience

- Offline cart support with Redis integration
- Seamless cart merging for logged-in users
- Single product checkout option
- Advanced autocomplete search using Trie data structure
- Modern and responsive UI with Shadcn components

### Security & Authentication

- Secure user authentication with NextAuth.js
- Password hashing using bcrypt
- Protected routes and API endpoints

### Payment Integration

- Stripe payment processing with webhooks
- Secure checkout flow for logged-in users
- Real-time payment status updates

### Advanced Features

- AI-powered chat assistant
- Form rendering system with reusable components
- Recently viewed products section (coming soon)
- Top viewed products using Max Heap data structure (coming soon)

## Technology Stack

### Frontend

- **Framework**: Next.js 14
- **Language**: TypeScript
- **UI Components & alerts**: Shadcn
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form
- **Validation**: Yup
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Luicid and custom ones
- **Data Fetching**: TanStack Query
- **Chat bot**: Gemini and Generative AI

### Backend

- **Database**: MongoDB + Mongoose
- **Cache**: Redis ( storing offline cart )
- **Authentication**: NextAuth.js
- **File Storage**: Pinata
- **Payments**: Stripe
- **API**: RESTful endpoints with TypeScript
- **Validation**: Zod

### Development Tools

- **Linting**: ESLint
- **Formatting**: Prettier
- **Build**: Next.js

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Set environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

## Project Structure

```
├── app/                           # Next.js application directory
│   ├── _components/              # Reusable React components
│   │   ├── _icons/              # Material-UI icons components
│   │   ├── _modals/             # Reusable modal dialogs
│   │   ├── _toasts/             # Custom toast notifications
│   │   ├── _utils/              # Component utilities and helpers
│   │   ├── _validators/         # Form validation schemas
│   │   ├── Footer/              # Footer component and related files
│   │   └── Header/              # Header component with navigation
│   ├── _context/               # React context providers
│   │   ├── AuthHandler/        # Authentication context
│   │   ├── CartProvider/       # Cart state management
│   │   ├── CategoriesProvider/ # Product categories context
│   │   └── UserProvider/       # User session management
│   ├── _lib/                   # Shared utility functions
│   │   ├── API/               # API client and endpoints
│   │   ├── middleware/        # Request/response middleware
│   │   ├── store/            # Redux store configuration
│   │   └── validation/       # Validation schemas
│   ├── _middleware/           # Next.js middleware configuration
│   ├── _page/                # Page-level components
│   ├── api/                  # API routes and handlers
│   ├── auth/                 # Authentication routes and logic
│   ├── cart/                 # Cart-related routes and components
│   ├── checkout/            # Checkout process components
│   ├── orders/              # Order management routes
│   ├── products/            # Product-related routes and components
│   ├── search/              # Search functionality components
│   └── users/               # User management routes
├── components/              # Shared React components
├── config/                  # Configuration files
├── public/                 # Static assets (images, fonts, etc.)
├── README.md               # Project documentation
├── tsconfig.json          # TypeScript configuration
├── yarn.lock              # Package dependencies lock file
└── yarnrc                # Yarn configuration

```

## API Routes

```
/api/
├── auth/                  # Authentication endpoints
│   └── [...nextauth]/    # NextAuth.js authentication
├── brands/               # Brand management
│   └── route.ts         # CRUD operations for brands
├── cart/                 # Shopping cart operations
│   ├── afterMerge/      # Cart merging after login
│   ├── deleteCookie/    # Delete cart cookie
│   ├── emptyCart/       # Empty the cart
│   └── removeFromCart/  # Remove items from cart
├── categories/          # Product categories
│   └── route.ts        # CRUD operations for categories
├── checkout_sessions/   # Stripe checkout sessions
│   └── route.ts        # Create and manage checkout sessions
├── coupons/             # Coupon management
│   ├── check/          # Validate coupon codes
│   └── route.ts        # CRUD operations for coupons
├── files/               # File upload and management
│   └── route.ts        # Handle file uploads (Pinata integration)
├── key/                 # API key management
│   └── route.ts        # Generate and manage API keys
├── login/               # User login endpoint
│   └── route.ts        # Handle user authentication
├── models/             # Product models
│   └── route.ts        # CRUD operations for product models
├── offlineCart/        # Offline cart operations
│   ├── AddToCart/      # Add items to offline cart
│   ├── EmptyCart/      # Empty offline cart
│   ├── RemoveFromCart/ # Remove items from offline cart
│   ├── updateQuantity/ # Update item quantity in offline cart
│   └── route.ts        # Main offline cart operations
├── order/              # Order management
│   ├── confirmOrder/   # Confirm and process orders
│   ├── getOrders/      # Retrieve user orders
│   ├── removeProduct/  # Remove products from order
│   ├── updateStatus/   # Update order status
│   └── route.ts        # Main order operations
├── product/            # Single product operations
│   └── [id]/          # CRUD operations for specific product
├── products/           # Product catalog
│   └── route.ts       # CRUD operations for products
├── sign/               # User sign-in endpoint
│   └── route.ts       # Handle user sign-in
├── signup/            # User registration
│   └── route.ts       # Handle user registration
├── stripe/            # Stripe payment integration
│   └── webhook/      # Handle Stripe webhook events
├── updateProductQuantity/ # Update product quantities
│   └── [id]/         # Update specific product quantity
└── user/              # User profile management
    └── [id]/         # CRUD operations for user profiles
```

## Database Schema

<img
        src="https://res.cloudinary.com/dvvmu40wx/image/upload/v1747771322/Public%20images/Next.js_Ecommerce_DB_diagram_ujcimn.png"
        alt="E-commerce DB Design"
/>

## Performance Optimization

- Optimized the initial load time so it is reduced from 12 s to nearly 5 s after replacing mui material components and icons with shadcn components, luicid icons and custom icons.

## Deployment

Live demo: [Luminae Store](https://ecommerce-nextjs-by-mustafa.vercel.app/)
