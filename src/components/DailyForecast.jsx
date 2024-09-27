import React from 'react';
import {weatherImages} from '../constants';
import {theme} from '../theme';
import {s} from 'react-native-wind';
import {Image, Text, View} from 'react-native';

const DailyForecast = ({item, dayName}) => {
  return (
    <View
      style={[
        s`flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4`,
        {backgroundColor: theme.bgWhite(0.15)},
      ]}>
      <Image
        source={
          weatherImages[item?.day?.condition?.text] ?? weatherImages['Other']
        }
        style={s`h-11 w-11`}
      />
      <Text style={s`text-white`}>{dayName}</Text>
      <Text style={s`text-white font-semibold text-xl`}>
        {item?.day?.avgtemp_c}&#176;
      </Text>
    </View>
  );
};

export default DailyForecast;
