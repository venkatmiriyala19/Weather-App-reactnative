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
    <View
      style={[
        s`flex-1 relative`,
        // {paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0},
      ]}>
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
        <View style={s`flex-1 flex-row justify-center items-center`}>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={100}
            tintColor={'#0bb3b2'}
          />
        </View>
      ) : (
        <SafeAreaView style={s`flex flex-1 pt-10`}>
          {/* Search Bar */}
          <View style={[s`mx-4 relative z-50`, {height: '7%'}]}>
            <View
              style={[
                s`flex-row justify-end items-center rounded-full`,
                {
                  borderRadius: 50,
                  backgroundColor: showSearch
                    ? theme.bgWhite(0.2)
                    : 'transparent',
                },
              ]}>
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search City"
                  placeholderTextColor="lightgray"
                  style={s`pl-6 h-10  flex-1 text-base text-white`}
                />
              ) : null}
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={[
                  s`rounded-full p-3 m-1`,
                  {backgroundColor: theme.bgWhite(0.3)},
                ]}>
                <FA6 name="magnifying-glass" size={22} color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View style={s`absolute w-full bg-gray-300 top-16 rounded-3xl`}>
                {locations.map((location, index) => {
                  let showBorder = index + 1 !== locations.length;
                  let borderClass = showBorder
                    ? `border-b-2 border-b-gray-400`
                    : '';
                  return (
                    <TouchableOpacity
                      onPress={() => handleLocation(location)}
                      key={index}
                      style={s`flex-row items-center border-0 p-3 px-4 mb-1 ${borderClass}`}>
                      <FA name="map-marker" size={20} color="gray" />
                      <Text style={s`text-black text-lg ml-2`}>
                        {location?.name}, {location?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

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
            <View style={s`flex-row justify-center`}>
              <Image
                source={
                  weatherImages[current?.condition?.text] ??
                  weatherImages['Other']
                }
                style={s`w-52 h-52`}
              />
            </View>

            {/* Temperature and Weather Description */}
            <View style={s`space-y-2`}>
              <Text style={s`text-center font-bold text-white text-6xl`}>
                {current?.temp_c}&#176;
              </Text>
              <Text style={s`text-center text-white text-xl tracking-widest`}>
                {current?.condition?.text}
              </Text>
            </View>

            {/* Additional Weather Details */}
            <View style={s`flex-row justify-between mx-4`}>
              <View style={s`flex-row space-x-2 items-center`}>
                <Image
                  source={require('../assets/icons/wind.png')}
                  style={s`h-6 w-6`}
                />
                <Text style={s`text-white font-semibold text-base`}>
                  {current?.wind_kph}km
                </Text>
              </View>
              <View style={s`flex-row space-x-2 items-center`}>
                <Image
                  source={require('../assets/icons/drop.png')}
                  style={s`h-6 w-6`}
                />
                <Text style={s`text-white font-semibold text-base`}>
                  {current?.humidity}%
                </Text>
              </View>
              <View style={s`flex-row space-x-2 items-center`}>
                <Image
                  source={require('../assets/icons/sun.png')}
                  style={s`h-6 w-6`}
                />
                <Text style={s`text-white font-semibold text-base`}>
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* Forecast for Next Days */}
          <View style={s`mb-2 space-y-3`}>
            <View style={s`flex-row items-center mx-5 space-x-2`}>
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
                // Return the JSX for each forecast card
                return (
                  <View
                    key={index}
                    style={[
                      s`flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4`,
                      {backgroundColor: theme.bgWhite(0.15)},
                    ]}>
                    <Image
                      source={
                        weatherImages[item?.day?.condition?.text] ??
                        weatherImages['Other']
                      }
                      style={s`h-11 w-11`}
                    />
                    <Text style={s`text-white`}>{dayName}</Text>
                    <Text style={s`text-white font-semibold text-xl`}>
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
};

export default Home;
