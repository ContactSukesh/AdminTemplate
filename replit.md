# Admin Dashboard Template

## Overview
A modern admin dashboard template featuring glassmorphism design, built with HTML, CSS, and Bootstrap 5. The dashboard provides a professional, responsive interface suitable for admin panels and management systems.

## Project Structure
```
/
├── index.html      # Main dashboard HTML with embedded CSS and JavaScript
├── server.py       # Python HTTP server for local development
├── replit.md       # Project documentation
└── .gitignore      # Git ignore rules
```

## Features
- **Glassmorphism Design**: Frosted glass effect with backdrop blur, transparent backgrounds, and subtle shadows
- **Responsive Layout**: Adapts to desktop and mobile screens with collapsible sidebar
- **Fixed Sidebar Navigation**: Logo area, navigation links with icons, hover effects with glow
- **Top Navbar**: Page title, search bar, notification icon with badge, user profile dropdown
- **Stats Cards**: 4 metric cards showing Total Users, Revenue, Orders, and Conversion Rate
- **Chart Placeholder**: Ready for Chart.js or ApexCharts integration
- **Data Table**: Recent Users table with status badges (Active, Pending, Blocked) and action buttons

## Tech Stack
- HTML5 (semantic structure)
- CSS3 (custom glassmorphism styling)
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
- **Background**: Dark gradient (purple/blue) with animated blur shapes
- **Glass Effect**: rgba(255, 255, 255, 0.1) background with 20px blur
- **Colors**: Primary gradient #6366F1 to #22D3EE
- **Typography**: Poppins font, white/light text for dark backgrounds
- **Animations**: Hover effects with translateY transforms and glow shadows

## Recent Changes
- December 4, 2024: Initial creation of dashboard template with all core features
