# Healthcare SaaS Platform

A B2B Healthcare SaaS UI application built with React, TypeScript, and modern web technologies to demonstrate frontend development skills and architecture thinking.

## 🚀 Features

### Core Features
- **Authentication**: Firebase-based login system with form validation using Zod
- **Dashboard**: Overview page with key metrics and quick actions
- **Analytics**: Detailed analytics and reports with charts and statistics
- **Patient Management**: Comprehensive patient data management with Grid/List view toggle
- **Notifications**: Service Worker implementation for push/local notifications

### Technical Features
- **State Management**: Zustand for efficient state management
- **Routing**: TanStack Router for navigation
- **Form Validation**: React Hook Form with Zod schemas
- **Responsive Design**: Tailwind CSS for modern, responsive UI
- **Type Safety**: Full TypeScript implementation
- **Service Worker**: Offline support and push notifications

## 🛠 Tech Stack

- **Frontend**: React 19 + TypeScript
- **State Management**: Zustand
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form + Zod
- **Authentication**: Firebase Auth
- **Notifications**: Service Worker API
- **Build Tool**: Vite
- **Package Manager**: npm (configured for pnpm compatibility)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── AnalyticsPage.tsx
│   └── PatientDetailsPage.tsx
├── hooks/              # Custom React hooks
│   └── useNotifications.ts
├── lib/                # Utility libraries
│   ├── firebase.ts
│   ├── router.ts
│   └── validations.ts
├── stores/             # Zustand stores
│   ├── authStore.ts
│   └── patientStore.ts
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthcare-saas-app
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Update .env with your Firebase configuration
```

4. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password method)
3. Copy your Firebase configuration to the `.env` file:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## 📱 Pages & Features

### 1. Login Page (`/login`)
- Email and password authentication
- Form validation with Zod
- Error handling and loading states
- Firebase integration

### 2. Dashboard (`/dashboard`)
- Key metrics display
- Quick action cards
- Notification testing
- User information and logout

### 3. Analytics (`/analytics`)
- Patient growth charts
- Revenue overview
- Appointment statistics
- Department performance metrics
- Recent activity table

### 4. Patient Management (`/patients`)
- Grid and List view toggle
- Search functionality
- Patient cards with details
- Status indicators
- CRUD operations (UI only)

## 🔔 Notifications

The application includes a comprehensive notification system:

- **Service Worker**: Registered for offline support
- **Push Notifications**: Browser notification API integration
- **Test Notifications**: Available from the dashboard
- **Notification Types**: Appointment reminders, system alerts

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional healthcare interface
- **Accessibility**: Semantic HTML and ARIA labels
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Micro-interactions**: Hover effects and transitions

## 🧪 Testing & Validation

- **Form Validation**: Zod schemas for all forms
- **Type Safety**: Full TypeScript coverage
- **Error Boundaries**: Graceful error handling
- **Input Validation**: Real-time form validation

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deployment Options
- **Vercel**: Recommended for React applications
- **Netlify**: Alternative static hosting
- **AWS S3**: Custom deployment option

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- ESLint configuration for code quality
- TypeScript strict mode
- Prettier for code formatting
- Git hooks for pre-commit checks

## 🚀 Bonus Features Implemented

- **Micro-frontend Architecture**: Modular component structure
- **Reusable Components**: Consistent design system
- **Performance Optimizations**: Lazy loading and code splitting
- **Clean Folder Structure**: Scalable organization
- **Service Worker**: Offline-first approach

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Firebase for authentication services
- TanStack for routing and state management
- Tailwind CSS for styling framework
- Vite for build tooling
