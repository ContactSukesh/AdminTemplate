# Admin Dashboard Template

## Overview
A modern admin dashboard template featuring an enhanced glassmorphism design, built with HTML, CSS, and Bootstrap 5. The dashboard provides a professional, responsive interface suitable for admin panels and management systems with beautiful animations and visual effects.

## Project Structure
```
/
├── index.html      # Main dashboard HTML with embedded CSS and JavaScript
├── server.py       # Python HTTP server for local development
├── replit.md       # Project documentation
└── .gitignore      # Git ignore rules
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
- **Background**: Multi-color gradient (dark blue/purple/teal) with 4 animated floating orbs and 30 rising particles
- **Glass Effect**: rgba(255, 255, 255, 0.08) background with 24px blur and subtle borders
- **Color Gradients**:
  - Primary: #667eea to #764ba2 (purple)
  - Accent: #f093fb to #f5576c (pink)
  - Cyan: #4facfe to #00f2fe
  - Green: #43e97b to #38f9d7
  - Orange: #fa709a to #fee140
- **Typography**: Poppins font, gradient text for headings, light text for dark backgrounds
- **Animations**: 
  - Floating orbs with 20s ease-in-out infinite animation
  - Rising particles with 10-20s linear infinite animation
  - Hover effects with cubic-bezier transitions, translateY transforms, and glow shadows
  - Active navigation indicator with scale animation
  - Pulsing notification badge

## Responsive Breakpoints
- Desktop: Full sidebar visible (>992px)
- Tablet: Sidebar collapses, toggle button appears (768-991px)
- Mobile: Hidden search, stacked cards, simplified layout (<768px)

## Recent Changes
- December 4, 2024: Enhanced design with improved animations, sparkline charts, colored glows, and better visual effects
- December 4, 2024: Initial creation of dashboard template with all core features
