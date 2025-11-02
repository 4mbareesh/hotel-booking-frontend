# Hotel Booking System - Frontend

A modern, responsive hotel booking system frontend built with Next.js 15, featuring real-time room availability search, booking management, and admin controls. This is the frontend component of a MERN stack application.

![Hotel Booking System](https://img.shields.io/badge/Next.js-15-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss) ![React Query](https://img.shields.io/badge/TanStack%20Query-5-FF4154?logo=react-query)

## 🏨 Project Overview

This hotel booking system provides a complete booking experience with:
- **User Interface**: Search and book available rooms by date range and guest count
- **Admin Interface**: Manage room types, pricing, and inventory
- **Real-time Availability**: Dynamic room availability calculation based on existing bookings
- **Responsive Design**: Mobile-first design optimized for all devices

### 🎯 Key Features

#### For Guests
- 🔍 **Smart Search**: Find available rooms by check-in/check-out dates and guest count
- 📱 **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- 🛏️ **Room Details**: View room descriptions, pricing, and availability counts
- 📝 **Easy Booking**: Simple booking form with customer details
- ✅ **Booking Confirmation**: Get booking details and confirmation

#### For Administrators
- ➕ **Room Management**: Add, edit, and delete room types
- 💰 **Pricing Control**: Set room prices and maximum occupancy
- 📊 **Inventory Management**: Manage total room quantities
- 🎨 **Intuitive Interface**: Clean admin dashboard for easy management

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15** - App Router with React 19
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling

### UI & Components
- **Radix UI** - Accessible, unstyled UI primitives
- **Lucide React** - Beautiful SVG icons
- **next-themes** - Dark/light theme support
- **Class Variance Authority (CVA)** - Component variant management

### State & Data Management
- **TanStack Query v5** - Server state management and caching
- **React Hook Form** - Form handling and validation
- **Zod** - Runtime type validation and schema
- **Axios** - HTTP client for API communication

### Development Tools
- **Biome** - Fast linter and formatter (replaces ESLint + Prettier)
- **PNPM** - Fast, disk space efficient package manager

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or later)
- **PNPM** (v10.12.1 or later)
- **Backend API** running on `http://localhost:5000` (see backend setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/4mbareesh/hotel-booking-frontend.git
   cd hotel-booking-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env.local
   
   # Edit .env.local with your API URL
   # NEXT_PUBLIC_API=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📁 Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with search
│   ├── admin/rooms/       # Admin room management
│   └── search/            # Search results page
├── components/
│   ├── ui/                # Reusable UI primitives (Button, Input, etc.)
│   ├── layout/            # Header, Footer, navigation
│   ├── pages/             # Page-specific components
│   ├── common/            # Shared business logic components
│   └── providers/         # React context providers
├── lib/
│   ├── api/               # API client configuration
│   ├── constants/         # Application constants
│   └── utils.ts           # Utility functions
├── types/                 # TypeScript type definitions
├── apis/                  # TanStack Query hooks for API calls
└── public/                # Static assets
```

## 🔧 Development Scripts

```bash
# Development
pnpm dev          # Start development server

# Building
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run Biome linter
pnpm format       # Format code with Biome
```

## 📡 API Integration

The frontend connects to a Node.js/Express backend API. Ensure the backend is running on the configured API URL.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API` | Backend API base URL | `http://localhost:5000/api` |

### API Endpoints Used

- `GET /search` - Search available rooms
- `POST /book` - Create a booking
- `GET /rooms` - Get all room types (admin)
- `POST /rooms` - Create room type (admin)
- `PUT /rooms/:id` - Update room type (admin)
- `DELETE /rooms/:id` - Delete room type (admin)

## 🎨 Design System

### Themes
- **Light Mode**: Clean, minimal design
- **Dark Mode**: Easy on the eyes for low-light usage
- **System**: Automatically matches OS preference

### Typography
- **Primary Font**: Geist Sans (optimized for readability)
- **Monospace**: Geist Mono (for code and data)

### Components
Built with Radix UI primitives and custom styling:
- Forms with validation and error handling
- Modal dialogs for bookings and confirmations
- Responsive data tables for admin
- Loading states and skeletons

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📱 Mobile Responsive

Optimized for all screen sizes:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔒 Type Safety

The project uses TypeScript with strict configuration and Zod for runtime validation:
- API response types
- Form validation schemas
- Component prop interfaces
- Route parameter types

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_API`: Your backend API URL

3. **Deploy**
   ```bash
   npx vercel --prod
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Deploy the `out/` directory** to your hosting provider

### Code Style

- Use **Biome** for linting and formatting
- Follow TypeScript strict mode
- Use semantic component and variable names
- Add JSDoc comments for complex functions

## 🐛 Troubleshooting

### Common Issues

**API Connection Failed**
- Ensure backend is running on `http://localhost:5000`
- Check `NEXT_PUBLIC_API` environment variable
- Verify CORS configuration on backend

**Build Errors**
- Clear `.next` directory: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && pnpm install`
- Check TypeScript errors: `pnpm build`

**Styling Issues**
- Clear Tailwind cache
- Check if custom CSS conflicts exist
- Verify Tailwind configuration

## 📞 Support

For support, please:
1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [GitHub issues](https://github.com/4mbareesh/hotel-booking-frontend/issues)
3. Create a new issue with detailed information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
