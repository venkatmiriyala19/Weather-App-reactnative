import React from 'react';
import {View, Image, Text} from 'react-native';
import {s} from 'react-native-wind';
import {weatherImages} from '../constants';

const WeatherDisplay = ({condition, temp}) => {
  return (
    <View style={s`space-y-2`}>
      <View style={s`flex-row justify-center`}>
        <Image
          source={weatherImages[condition?.text] ?? weatherImages['Other']}
          style={s`w-52 h-52`}
        />
      </View>
      <Text style={s`text-center font-bold text-white text-6xl`}>
        {temp}&#176;
      </Text>
      <Text style={s`text-center text-white text-xl tracking-widest`}>
        {condition?.text}
      </Text>
    </View>
  );
};

export default WeatherDisplay;
