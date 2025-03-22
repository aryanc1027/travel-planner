import axios from 'axios';

const UNSPLASH_ACCESS_KEY = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;

const getUnsplashCityImage = async (cityName) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/photos/random`,
      {
        params: {
          query: `${cityName} city skyline`,
          orientation: 'landscape',
          content_filter: 'high'
        },
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        },
        timeout: 5000
      }
    );
    
    return {
      imageUrl: response.data.urls.regular,
      attribution: `Photo by ${response.data.user.name} on Unsplash`,
      downloadLocation: response.data.links.download_location
    };
  } catch (error) {
    console.error('Unsplash API error:', error.message);
    return {
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200',
      attribution: 'Default City Image'
    };
  }
};

export const getCityImageFromName = async (cityName) => {
  return getUnsplashCityImage(cityName);
};

export const getCityImageFromPlace = async (placeData) => {
  const cityName = placeData.text || (placeData.place_name && placeData.place_name.split(',')[0]);
  
  if (!cityName) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200',
      attribution: 'Default City Image'
    };
  }
  
  return getUnsplashCityImage(cityName);
};

export default {
  getCityImageFromName,
  getCityImageFromPlace
};
