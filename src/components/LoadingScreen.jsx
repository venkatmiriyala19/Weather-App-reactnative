import React from 'react';
import {View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {s} from 'react-native-wind';

const LoadingScreen = () => {
  return (
    <View style={s`flex-1 flex-row justify-center items-center`}>
      <AnimatedCircularProgress
        size={120}
        width={15}
        fill={100}
        tintColor={'#0bb3b2'}
      />
    </View>
  );
};

export default LoadingScreen;
