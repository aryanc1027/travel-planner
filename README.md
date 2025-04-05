# Travel Planner

A modern React Native mobile application that helps users discover, plan, and organize their travel experiences. Built with Expo and React Native, this app provides a seamless travel planning experience with features like destination discovery, trip planning, and location-based recommendations.

## Features

- **Destination Discovery**
  - Personalized travel recommendations based on travel style (Solo, Couple, Family, Group)
  - Seasonal destination suggestions
  - Budget-based filtering (Cost-effective, Mid-range, Luxury)
  - Best time to visit information
  - High-quality destination images and descriptions

- **Trip Planning**
  - Interactive calendar for trip scheduling
  - Location search with Google Places integration
  - Map integration with Mapbox
  - Trip organization and management

- **User Experience**
  - Dark/Light mode support
  - Modern, intuitive UI with smooth animations
  - Responsive design
  - Location-based services

## Tech Stack

- **Frontend Framework**
  - React Native
  - Expo


- **Key Libraries**
  - Expo Router for navigation
  - Firebase for backend services
  - Mapbox for maps and location services
  - Mapbox API for location search
  - Unsplased API for image search
  - API Ninjas API for Airport search
  - Gemini API for trip creation
  - React Native Reanimated for animations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users) or Android Studio (for Android development)

## Installation

1. Clone the repository
```bash
git clone [repository-url]
cd travel_planner
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env
# Fill in your API keys and configuration
```

4. Start the development server
```bash
npm start
# or
yarn start
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Project Structure

```
travel_planner/
├── app/                 # Main application code
├── assets/             # Static assets
├── components/         # Reusable components
├── constants/          # Constants and configuration
├── context/           # React Context providers
├── configs/           # Configuration files
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

