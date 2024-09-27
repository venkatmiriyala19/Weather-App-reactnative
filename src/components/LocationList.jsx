import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import FA from 'react-native-vector-icons/dist/FontAwesome';
import {s} from 'react-native-wind';

const LocationList = ({locations, handleLocation}) => {
  return (
    <View style={s`absolute w-full bg-gray-300 top-16 rounded-3xl`}>
      {locations.map((location, index) => {
        let showBorder = index + 1 !== locations.length;
        let borderClass = showBorder ? `border-b-2 border-b-gray-400` : '';
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
  );
};

export default LocationList;
