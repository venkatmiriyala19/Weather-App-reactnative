import React from 'react';
import {Image, SafeAreaView, TextInput, View, StatusBar} from 'react-native';

const Home = () => {
  return (
    <View className="flex-1 relative">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Image
        blurRadius={70}
        source={require('../assets/images/bg.png')}
        className="absolute h-full w-full"
      />
      <SafeAreaView className="flex flex-1">
        <View className="h-7 mx-4 relative z-50">
          <View className="flex-row justify-end items-center rounded-full bg-white/20">
            <TextInput
              placeholder="Search City"
              placeholderTextColor="lightgray"
              className="pl-6 h-10 flex-1 text-base text-white"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;
