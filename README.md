# Cloud - Creator Economy Platform

A modern, enterprise-grade SaaS platform built with Next.js 16 designed to help creators manage, monetize, and grow their audience.

## Features

### Core Modules
- **Dashboard** - Comprehensive analytics with revenue tracking, user growth metrics, and engagement insights
- **User Management** - Manage platform users with role-based access, search, and filtering capabilities
- **Courses** - Create and manage online courses with student tracking and revenue analytics
- **Communities** - Build engaged communities with member management and activity tracking
- **Live Events** - Schedule and manage webinars, workshops, and live sessions with attendee tracking
- **Payments** - Monitor transactions, track revenue, and manage payment processing
- **Analytics** - Deep dive into platform performance with traffic analysis and user behavior insights
- **Settings** - Comprehensive platform configuration and account management

### UI Components
- **Responsive Sidebar** - Collapsible navigation with organized menu sections
- **Topbar** - Search, command palette (Cmd+K), notifications, and user menu
- **Command Palette** - Quick navigation and command access with keyboard support
- **Data Tables** - Interactive tables with sorting, filtering, and row selection
- **Charts** - Revenue trends, user growth, engagement metrics using Recharts
- **Metric Cards** - Key metrics with trend indicators and visual icons
- **Status Badges** - Visual indicators for various states (Active, Completed, Pending, etc.)

## Design System

### Color Palette
- **Primary**: #2563EB (Blue) - Main brand color
- **Secondary**: #4F46E5 (Indigo) - Secondary actions
- **Sidebar**: #0B1220 (Dark Navy) - Navigation background
- **Background**: #ffffff / #0B1220 (Light/Dark mode)
- **Text**: #0B1220 / #f8fafb (Dark/Light)
- **Accents**: Green (#10b981), Red (#dc2626), Yellow (#f59e0b)

### Typography
- **Font**: Geist (sans-serif) & Geist Mono
- **Headings**: Bold, large sizing (text-3xl to text-4xl)
- **Body**: Medium weight, comfortable line-height

### Layout
- **Flexbox** - Primary layout method for most components
- **Grid** - Used for metric cards and multi-column layouts
- **Spacing** - Tailwind scale with consistent padding/margin
- **Responsive** - Mobile-first design with md: and lg: breakpoints

## Tech Stack

- **Framework**: Next.js 16.2.6 with App Router
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **State Management**: Zustand (ready for integration)
- **Forms**: React Hook Form (ready for integration)
- **Tables**: TanStack Table (ready for integration)
- **Animations**: Framer Motion (ready for integration)
- **Icons**: Lucide React
- **UI Components**: shadcn/ui

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── globals.css             # Design tokens and Tailwind config
├── page.tsx                # Home page (redirects to dashboard)
└── dashboard/
    ├── layout.tsx          # Dashboard layout with sidebar & topbar
    ├── page.tsx            # Main dashboard
    ├── users/
    │   └── page.tsx        # User management
    ├── courses/
    │   └── page.tsx        # Courses listing
    ├── communities/
    │   └── page.tsx        # Communities management
    ├── events/
    │   └── page.tsx        # Live events
    ├── payments/
    │   └── page.tsx        # Payment tracking
    ├── analytics/
    │   └── page.tsx        # Platform analytics
    └── settings/
        └── page.tsx        # Settings and configuration

components/
├── sidebar.tsx             # Collapsible navigation sidebar
├── topbar.tsx              # Top navigation bar
├── command-palette.tsx     # Cmd+K command palette
└── app-layout.tsx          # Main app layout wrapper
```

## Features to Implement

The following sections are ready for full implementation:

1. **CRM** - Email/WhatsApp automation
2. **Gamification** - Points, badges, leaderboards
3. **Mobile App** - Native mobile application
4. **AI Assistant** - AI-powered helper
5. **Affiliate System** - Referral program management

## Getting Started

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Open http://localhost:3000 in browser
```

## Environment Variables

The platform uses Cloud branding and is pre-configured. No environment variables required for local development.

## Mock Data

All pages include realistic mock data:
- 8 sample users with roles, emails, and revenue
- 4 courses with student counts and ratings
- 4 communities with engagement metrics
- 4 events with attendee tracking
- 6 transactions with various statuses
- Complete analytics dashboard with trends

## Key Features Implemented

✅ Responsive sidebar with collapsible menu
✅ Command palette with keyboard shortcuts (Cmd+K)
✅ Dashboard with revenue and user charts
✅ User management with search and filtering
✅ Course listing with grid layout
✅ Community management with engagement metrics
✅ Event management with capacity tracking
✅ Payment transaction monitoring
✅ Analytics with traffic insights
✅ Settings management interface
✅ Enterprise color scheme (Blue/Indigo/Navy)
✅ Smooth animations and transitions
✅ Mobile-responsive design
✅ Dark/Light mode ready

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Built with v0 - Vercel's AI platform for rapid UI development
