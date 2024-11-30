import axios from 'axios';
import {apiKey} from '../constants';

const apiCall = async endpoint => {
  const options = {
    method: 'GET',
    url: endpoint,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

export const fetchWeatherForecast = params => {
  const forecastEndpoint = `http://api.weatherapi.com/v1/forecast.json?key=0fae7b047cdf456283e124934243011&q=${params.cityName}&days=${params.days}&aqi=no&alerts=no`;
  return apiCall(forecastEndpoint);
};

export const fetchLocations = params => {
  const locationsEndpoint = `http://api.weatherapi.com/v1/search.json?key=0fae7b047cdf456283e124934243011&q=${params.cityName}`;
  return apiCall(locationsEndpoint);
};
