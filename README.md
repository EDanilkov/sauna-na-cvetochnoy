# Sauna Website

A modern, responsive website for a sauna business built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Modern animations with Framer Motion
- Form validation with React Hook Form
- Image gallery with lightbox
- Interactive map integration
- Booking system

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create the following directories:
```bash
mkdir -p public/images
```

3. Add your images to the `public/images` directory:
- banner-video.mp4
- about-image.jpg
- location1.jpg
- location2.jpg
- location3.jpg
- service1.jpg
- service2.jpg
- service3.jpg
- gallery1.jpg
- gallery2.jpg
- gallery3.jpg
- gallery4.jpg
- gallery5.jpg
- gallery6.jpg

4. Start the development server:
```bash
npm start
```

## Project Structure

```
sauna/
├── public/
│   └── images/         # Static images and videos
├── src/
│   ├── components/     # React components
│   ├── styles/         # CSS styles
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Entry point
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── postcss.config.js   # PostCSS configuration
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- React Scroll
