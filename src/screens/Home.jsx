import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  TextInput,
  View,
  StatusBar,
  TouchableOpacity,
  Platform,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {s} from 'react-native-wind';
import {theme} from '../theme';
import FA6 from 'react-native-vector-icons/dist/FontAwesome6';
import FA from 'react-native-vector-icons/dist/FontAwesome';
import Iconicons from 'react-native-vector-icons/dist/Ionicons';
import {StatusBar as RNStatusBar} from 'react-native';
import {debounce} from 'lodash';
import {fetchLocations, fetchWeatherForecast} from '../api/weather';
import {weatherImages} from '../constants';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {getData, storeData} from '../utils/asyncStorage';
import DailyForecast from '../components/DailyForecast';
import SearchBar from '../components/SearchBar';
import LocationList from '../components/LocationList';
import WeatherDetails from '../components/WeatherDetails';
import LoadingScreen from '../components/LoadingScreen';
import WeatherDisplay from '../components/WeatherDisplay';

const Home = () => {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLocation = location => {
    setLocations([]);
    toggleSearch(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: location.name,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
      storeData('city', location.name);
      // console.log('data  forecast', data);
    });
  };

  const handleSearch = value => {
    //fetch location
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => {
        setLocations(data);
      });
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Rajamahendri';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {current, location} = weather;
  return (
    <KeyboardAvoidingView
      style={s`flex-1`}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      {/* Background Image */}
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        style={s`absolute h-full w-full`}
        resizeMode="cover" // Ensures the image covers the full screen
      />
      {loading ? (
        <LoadingScreen />
      ) : (
        <SafeAreaView style={s`flex flex-1 pt-10`}>
          {/* Search Bar */}
          <SearchBar
            showSearch={showSearch}
            toggleSearch={toggleSearch}
            handleTextDebounce={handleSearch}
          />
          {/* Location List */}
          {locations.length > 0 && showSearch ? (
            <View style={s`absolute top-10 left-4 right-4 z-50`}>
              <LocationList
                locations={locations}
                handleLocation={handleLocation}
              />
            </View>
          ) : null}
          {/* Forecast Section */}
          <View style={s`mx-4 flex justify-around flex-1 mb-2`}>
            {/* Location */}
            <Text style={s`text-white text-center text-2xl font-bold`}>
              {location?.name},
              <Text style={s`text-lg font-semibold text-gray-300`}>
                {' ' + location?.country}
              </Text>
            </Text>

            {/* Weather Icon */}
            <WeatherDisplay
              condition={weather?.current?.condition}
              temp={weather?.current?.temp_c}
            />

            {/* Additional Weather Details */}
            <WeatherDetails
              wind={current?.wind_kph}
              humidity={current?.humidity}
              sunrise={weather?.forecast?.forecastday[0]?.astro?.sunrise}
            />
          </View>

          {/* Forecast for Next Days */}
          <View style={s`mb-2 space-y-3`}>
            <View style={s`flex-row items-center mx-5 space-x-2 mb-2`}>
              <Iconicons name="calendar-outline" size={22} color="white" />
              <Text style={s`text-white text-base`}>Daily Forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{paddingHorizontal: 15}}
              showsHorizontalScrollIndicator={false}>
              {weather?.forecast?.forecastday.map((item, index) => {
                let date = new Date(item.date);
                const options = {weekday: 'long'};
                let dayName = date
                  .toLocaleDateString('en-US', options)
                  .split(',')[0];

                return (
                  <DailyForecast
                    item={item}
                    dayName={dayName}
                    key={item.date}
                  />
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
};

export default Home;
