# Admin Dashboard Template

## Overview
A modern admin dashboard template featuring an enhanced glassmorphism design, built with HTML, CSS, and Bootstrap 5. The dashboard provides a professional, responsive interface suitable for admin panels and management systems with beautiful animations and visual effects. Includes complete authentication pages.

## Project Structure
```
/
├── index.html           # Main dashboard HTML with embedded CSS and JavaScript
├── login.html           # Login page with glassmorphism design
├── register.html        # Registration page with password strength indicator
├── forgot-password.html # Password reset request page
├── server.py            # Python HTTP server for local development
├── replit.md            # Project documentation
└── .gitignore           # Git ignore rules
```

## Features
- **Enhanced Glassmorphism Design**: Frosted glass effect with backdrop blur, transparent backgrounds, layered shadows, and colored glows
- **Animated Background**: Floating gradient orbs with smooth animations and rising particle effects
- **Responsive Layout**: Adapts to desktop and mobile screens with collapsible sidebar
- **Fixed Sidebar Navigation**: Logo area, navigation links with icons, active indicator bars, hover effects with glow, and badge counts
- **Top Navbar**: Page title with subtitle, search bar with focus animation, notification icon with animated badge, email icon, user profile dropdown with online status
- **Stats Cards**: 4 metric cards with gradient icons, trend badges, mini sparkline bar charts, and colored glows
- **Chart Placeholder**: Ready for Chart.js or ApexCharts integration with styled container
- **Data Table**: Recent Users table with colored avatars, user IDs, status badges (Active, Pending, Blocked), and color-coded action buttons
- **Authentication Pages**: Complete auth flow with login, register, and forgot password pages

## Authentication Pages
- **Login Page** (login.html): Email/password form, remember me, social login buttons (Google, GitHub, Twitter), password visibility toggle
- **Register Page** (register.html): Full registration form with first/last name, email, password with strength indicator, confirm password, terms agreement
- **Forgot Password** (forgot-password.html): Email input with success confirmation message animation

## Tech Stack
- HTML5 (semantic structure)
- CSS3 (custom glassmorphism styling with CSS variables)
- Bootstrap 5 (CDN - layout and components)
- Bootstrap Icons (CDN)
- Google Fonts (Poppins)
- Python HTTP server (development)

## Running Locally
The dashboard is served via Python's built-in HTTP server on port 5000:
```bash
python server.py
```

## Design Details
- **Background**: Deep black gradient (#050508 to #0a0a12) with 4 animated floating orbs at 35% opacity
- **Glass Effect**: rgba(255, 255, 255, 0.08) background with 24px blur and subtle borders
- **Color Gradients**:
  - Primary: #667eea to #764ba2 (purple) - used in login page
  - Accent: #f093fb to #f5576c (pink) - used in forgot password page
  - Cyan: #4facfe to #00f2fe
  - Green: #43e97b to #38f9d7 - used in register page
  - Orange: #fa709a to #fee140
- **Typography**: Poppins font, gradient text for headings, light text for dark backgrounds
- **Animations**: 
  - Floating orbs with 20s ease-in-out infinite animation
  - Rising particles with 10-20s linear infinite animation
  - Hover effects with cubic-bezier transitions, translateY transforms, and glow shadows
  - Active navigation indicator with scale animation
  - Pulsing notification badge
  - Password strength bar animation

## Responsive Breakpoints
- Desktop: Full sidebar visible (>992px)
- Tablet: Sidebar collapses, toggle button appears (768-991px)
- Mobile: Hidden search, stacked cards, simplified layout (<768px)

## Navigation Flow
- Dashboard logout buttons link to login.html
- Login page links to register.html and forgot-password.html
- Register page links to login.html
- Forgot password page links to login.html
- Successful login/register redirects to dashboard (index.html)

## Recent Changes
- December 4, 2024: Added authentication pages (login, register, forgot password) with matching glassmorphism design
- December 4, 2024: Darkened background to deep black (#050508) for more dramatic contrast
- December 4, 2024: Enhanced design with improved animations, sparkline charts, colored glows, and better visual effects
- December 4, 2024: Initial creation of dashboard template with all core features
