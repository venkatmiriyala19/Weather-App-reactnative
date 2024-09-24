/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import { NativeWindStyleSheet } from 'nativewind';

NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack=createNativeStackNavigator();
function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Home" component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
