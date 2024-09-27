import React from 'react';
import {View, Text, Image} from 'react-native';
import {s} from 'react-native-wind';

const WeatherDetails = ({wind, humidity, sunrise}) => {
  return (
    <View style={s`flex-row justify-between mx-4`}>
      <View style={s`flex-row space-x-2 items-center`}>
        <Image
          source={require('../assets/icons/wind.png')}
          style={s`h-6 w-6`}
        />
        <Text style={s`text-white font-semibold text-base`}>{wind} km</Text>
      </View>
      <View style={s`flex-row space-x-2 items-center`}>
        <Image
          source={require('../assets/icons/drop.png')}
          style={s`h-6 w-6`}
        />
        <Text style={s`text-white font-semibold text-base`}>{humidity}%</Text>
      </View>
      <View style={s`flex-row space-x-2 items-center`}>
        <Image source={require('../assets/icons/sun.png')} style={s`h-6 w-6`} />
        <Text style={s`text-white font-semibold text-base`}>{sunrise}</Text>
      </View>
    </View>
  );
};

export default WeatherDetails;
