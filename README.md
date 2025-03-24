# Stock Trading Application Frontend

A modern React TypeScript frontend for a stock trading application with custom CSS and Vite. This application provides a beautiful UI for tracking stocks, market indices, and earnings reports.

## Features

- **Modern UI with Custom CSS**: Clean and responsive design for all devices
- **Homepage**: 
  - Navigation bar with search functionality
  - Hero section with market trends display
  - Market overview showing key indices
  - Trending stocks section with interactive cards
  - Upcoming earnings preview

- **Earnings Page**:
  - Weekly calendar view with date navigation
  - Before/after market indicators for earnings events
  - Earnings feed with summaries and analysis
  - Multiple view modes (list, week, month)

- **API Integration**:
  - StockService for data fetching
  - Loading states and error handling
  - Mock data that can be easily replaced with real API calls
  - Support for Yahoo Finance API integration

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd stock-app-frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
stock-app-frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services
│   ├── hooks/            # Custom React hooks
│   ├── assets/           # Static assets
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Public assets
├── dist/                 # Build output
└── ...config files
```

## API Integration

The application uses a StockService that provides methods for fetching:
- Trending stocks
- Market indices
- Earnings calendar data
- Earnings feed
- Stock search

Currently, the service uses mock data, but it's designed to be easily connected to real APIs like Yahoo Finance. The API endpoints are already set up in the service files.

## Customization

### Styling

The application uses custom CSS for styling. You can customize the colors, fonts, and other design elements by modifying the `src/index.css` file.

### Adding New Pages

1. Create a new page component in the `src/pages` directory
2. Add a new route in `src/App.tsx`

## Deployment

The application can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages. Simply build the application and upload the contents of the `dist` directory.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
