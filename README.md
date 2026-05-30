# Natours — Tour Booking Application

A full-stack tour booking web application built with Node.js, Express, MongoDB, and Pug. Users can browse tours, make bookings via Stripe, leave reviews, and manage their accounts.

## Features

- **Authentication & Authorization** — Sign up, log in, password reset via email, role-based access control (user, guide, lead-guide, admin)
- **Tour Management** — CRUD operations for tours with geospatial data, image uploads (with resizing via Sharp), and aggregation pipelines for stats
- **Bookings** — Stripe Checkout integration with webhook support for payment confirmation
- **Reviews** — Users can review tours with ratings; average ratings are computed automatically
- **User Accounts** — Profile photo upload, password update, account deactivation
- **Server-Side Rendering** — Pug templates for overview, tour detail, login, and account pages
- **Email** — Transactional emails (welcome, password reset) using Nodemailer with SendGrid in production
- **Security** — Rate limiting, data sanitization (NoSQL injection & XSS), HTTP parameter pollution protection, Helmet headers, JWT authentication via cookies

## Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Runtime     | Node.js                                 |
| Framework   | Express                                 |
| Database    | MongoDB (Mongoose ODM)                  |
| Templating  | Pug                                     |
| Payments    | Stripe                                  |
| File Upload | Multer + Sharp                          |
| Email       | Nodemailer (SendGrid / Mailtrap)        |
| Bundler     | Parcel                                  |
| Auth        | JWT (JSON Web Tokens) + bcrypt          |

## Project Structure

```
server.js                 # Entry point — DB connection, server startup
src/
├── app.js                # Express app configuration & middleware
├── controllers/          # Route handlers (auth, tours, users, reviews, bookings, views, errors)
├── models/               # Mongoose schemas (Tour, User, Review, Booking)
├── routes/               # Express routers
├── middleware/           # Custom middleware (alias queries, etc.)
├── utils/                # Helpers (API features, error classes, email, async wrapper)
├── views/                # Pug templates (pages + email templates)
└── public/               # Static assets (CSS, JS bundles, images)
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local instance or Atlas)
- Stripe account (for payments)

### Installation

```bash
git clone <repository-url>
cd tours
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
PORT=8000

MONGODB_CLOUD_URL=<your-mongodb-connection-string>

JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

EMAIL_FROM=you@example.com
EMAIL_HOST=smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USERNAME=<mailtrap-username>
EMAIL_PASSWORD=<mailtrap-password>

SENDGRID_USERNAME=<sendgrid-username>
SENDGRID_PASSWORD=<sendgrid-password>

STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
```

### Running the App

```bash
# Development
npm run start:dev

# Production
npm run start:prod

# Build client-side JS bundle
npm run build:js
```

The server starts on `http://localhost:8000` by default.

## API Endpoints

### Tours

| Method | Endpoint                                         | Description              | Access          |
| ------ | ------------------------------------------------ | ------------------------ | --------------- |
| GET    | `/api/tours`                                     | Get all tours            | Public          |
| GET    | `/api/tours/:id`                                 | Get a single tour        | Public          |
| POST   | `/api/tours`                                     | Create a tour            | Admin/Lead-guide|
| PATCH  | `/api/tours/:id`                                 | Update a tour            | Admin/Lead-guide|
| DELETE | `/api/tours/:id`                                 | Delete a tour            | Admin/Lead-guide|
| GET    | `/api/tours/top-5-cheap`                         | Top 5 cheapest tours     | Public          |
| GET    | `/api/tours/tour-stats`                          | Tour statistics          | Public          |
| GET    | `/api/tours/monthly-plan/:year`                  | Monthly plan             | Admin/Guides    |
| GET    | `/api/tours/tours-within/:distance/center/:latlng/unit/:unit` | Tours within radius | Public      |
| GET    | `/api/tours/distances/:latlng/unit/:unit`         | Distances to tours       | Public          |

### Users

| Method | Endpoint                     | Description            | Access         |
| ------ | ---------------------------- | ---------------------- | -------------- |
| POST   | `/api/users/signup`          | Register               | Public         |
| POST   | `/api/users/login`           | Log in                 | Public         |
| GET    | `/api/users/logout`          | Log out                | Public         |
| POST   | `/api/users/forgot-password` | Request password reset | Public         |
| PATCH  | `/api/users/reset-password/:token` | Reset password   | Public         |
| PATCH  | `/api/users/update-password` | Update password        | Authenticated  |
| PATCH  | `/api/users/update-me`       | Update profile         | Authenticated  |
| DELETE | `/api/users/delete-me`       | Deactivate account     | Authenticated  |
| GET    | `/api/users/me`              | Get current user       | Authenticated  |
| GET    | `/api/users`                 | Get all users          | Admin          |

### Reviews

| Method | Endpoint                          | Description       | Access        |
| ------ | --------------------------------- | ----------------- | ------------- |
| GET    | `/api/reviews`                    | Get all reviews   | Authenticated |
| POST   | `/api/reviews`                    | Create a review   | User          |
| GET    | `/api/reviews/:id`                | Get a review      | Authenticated |
| PATCH  | `/api/reviews/:id`                | Update a review   | User/Admin    |
| DELETE | `/api/reviews/:id`                | Delete a review   | User/Admin    |
| POST   | `/api/tours/:tourId/reviews`      | Review on a tour  | User          |

### Bookings

| Method | Endpoint                                  | Description           | Access          |
| ------ | ----------------------------------------- | --------------------- | --------------- |
| GET    | `/api/bookings/checkout-session/:tourId`  | Get Stripe session    | Authenticated   |
| GET    | `/api/bookings`                           | Get all bookings      | Admin/Lead-guide|
| POST   | `/api/bookings`                           | Create a booking      | Admin/Lead-guide|
| GET    | `/api/bookings/:id`                       | Get a booking         | Admin/Lead-guide|
| PATCH  | `/api/bookings/:id`                       | Update a booking      | Admin/Lead-guide|
| DELETE | `/api/bookings/:id`                       | Delete a booking      | Admin/Lead-guide|

## Seed Data

Import development data into the database:

```bash
node src/data/import-dev-data.js --import   # Import data
node src/data/import-dev-data.js --delete   # Delete all data
```