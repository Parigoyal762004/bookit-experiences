🎯 BookIt: Experiences & Slots
A full-stack web application for booking travel experiences with real-time slot availability, built with React, TypeScript, Node.js, Express, and Containerized PostgreSQL (Docker).

✨ Features
Frontend
🎨 Pixel-perfect UI - Matches Figma design exactly

📱 Fully Responsive - Beautiful on all devices

⚡ Lightning Fast - Optimized performance with Vite

🎭 Smooth Animations - Framer Motion & custom CSS

🔍 Search & Filter - Find experiences easily

📅 Interactive Date/Time Picker - Real-time availability

💳 Seamless Checkout - Promo codes & validation

🎉 Success Animations - Confetti on booking confirmation

🍞 Toast Notifications - Real-time user feedback

Backend
🚀 RESTful API - Clean and well-documented

🔒 Transaction Safety - Prevents double-booking

✅ Input Validation - Express-validator

🐳 PostgreSQL Database - Managed and run via Docker for local development

🎟️ Promo Code System - Percentage & flat discounts

📊 Seed Data - Pre-populated experiences

🛠️ Tech Stack
Frontend
Framework: React 18 + TypeScript

Build Tool: Vite

Styling: TailwindCSS

Routing: React Router v6

HTTP Client: Axios

Form Handling: React Hook Form

Validation: Zod

Animations: Framer Motion, Canvas Confetti

Icons: Lucide React

Backend
Runtime: Node.js

Framework: Express.js + TypeScript

Database: PostgreSQL (Containerized via Docker)

Validation: Express Validator

CORS: CORS middleware

Logger: Morgan

📋 Prerequisites
Node.js (v18 or higher)

Docker and Docker Compose

npm or yarn

🚀 Quick Start (Using Docker)
1. Clone the Repository
   Bash

git clone https://github.com/Parigoyal762004/bookit-experiences.git
cd bookit-experiences
2. Backend Setup (Install and Configure)
   Bash

cd backend

# Install dependencies
npm install

# Create .env file for local database connection
cp .env.example .env
(Your .env should contain the credentials matching your docker-compose.yml)

3. Database & Server Startup (Docker Compose)
   Start the PostgreSQL container and the backend server. The server will automatically create the database schema.

Bash

# From the root directory:
cd ..
docker compose up -d

# Install backend dependencies within the container (optional, depends on your dockerfile)
# If using npm start directly:
# cd backend
# npm install
(If your docker-compose.yml runs the server, you may skip manual npm start.)

4. Seed Database (Populate Data)
   Run the seed script after the schema is initialized and the server is running.

Bash

cd backend
npm run seed
5. Start Frontend
   Open a new terminal:

Bash

cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
(Ensure frontend/.env points to http://localhost:5000/api)

6. Start Frontend App
   Bash

npm run dev

# App runs on http://localhost:5173
🌐 API Endpoints
Experiences
GET    /api/experiences              - Get all experiences
GET    /api/experiences/:id          - Get experience by ID
GET    /api/experiences/:id/slots    - Get available slots
Bookings
POST   /api/bookings                 - Create booking
GET    /api/bookings/:id             - Get booking by ID
GET    /api/bookings?email=...       - Get bookings by email
Promo Codes
POST   /api/promo/validate           - Validate promo code
🎟️ Available Promo Codes
SAVE10 - 10% off

FLAT100 - ₹100 off

WELCOME20 - 20% off

FIRSTBOOKING - ₹150 off

EARLYBIRD - 15% off

📱 Application Flow
Home Page - Browse and search experiences

Details Page - View experience details, select date & time

Checkout Page - Enter details, apply promo codes

Result Page - Booking confirmation with reference ID

🎨 Design
Design follows the provided Figma specifications:

White background with yellow (#FFD700) accents

Clean, modern card-based layout

Responsive grid system

Smooth transitions and micro-interactions

📦 Project Structure
bookit-experiences/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Route pages
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Helper functions
│   └── public/
├── backend/
│   ├── src/
│   │   ├── config/          # Database & app config
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── types/           # TypeScript types
│   │   └── server.ts        # Entry point
│   ├── Dockerfile           # For containerizing the Node app
│   └── package.json
└── docker-compose.yml       # Defines services (app, db)
🧪 Testing the Application
Test Booking Flow:
Visit home page: http://localhost:5173

Click "View Details" on any experience

Select a date and time slot

Adjust guest count

Click "Confirm Booking"

Fill in details:

First Name: John

Last Name: Doe

Email: john@example.com

Phone: 9876543210

Apply promo code: SAVE10

Agree to terms

Click "Pay and Confirm"

See success page with booking ID

🚢 Deployment (Monorepo Docker Strategy)
The project uses a monorepo structure and Docker, requiring two separate services for public deployment.

1. Backend Service (Docker)
   Platform: Render or Railway (For Docker support and Managed PostgreSQL).

Service Type: Web Service (Docker).

Repository Link: Your main bookit-experiences repo.

Root Directory: backend/

Environment Variables (Required):

DATABASE_URL: Public connection string from a Managed PostgreSQL service (e.g., Render Postgres).

FRONTEND_URL: Public URL of your deployed frontend (e.g., https://bookit-client.vercel.app).

2. Frontend Service (Static Site)
   Platform: Vercel or Netlify.

Service Type: Static Site.

Repository Link: Your main bookit-experiences repo.

Root Directory: frontend/

Build/Output: npm run build, output directory frontend/dist.

API Base URL: Update frontend/.env with the public URL of the deployed backend service.

🐛 Troubleshooting
Database Connection Error
Bash

# Check if Docker containers are running
docker compose ps

# Verify credentials in backend/.env match docker-compose.yml
Port Already in Use
Bash

# Check process using port 5000 or 5173
CORS Errors
Bash

# Update FRONTEND_URL in backend/.env
# Update VITE_API_URL in frontend/.env
📄 License
MIT License - feel free to use this project for learning!

🤝 Contributing
This is a internship project, but feedback and suggestions are welcome!

👨‍💻 Author
Your Name

GitHub: @Parigoyal762004

Email: your.email@example.com

🙏 Acknowledgments
Design: Figma HD-booking template

Images: Unsplash

Icons: Lucide React

Made with ❤️ and lots of ☕ for the HD Booking Internship Assignment