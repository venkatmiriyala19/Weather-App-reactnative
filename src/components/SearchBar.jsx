import React from 'react';
import {TextInput, TouchableOpacity, View} from 'react-native';
import FA6 from 'react-native-vector-icons/dist/FontAwesome6';
import {s} from 'react-native-wind';
import {theme} from '../theme';

const SearchBar = ({showSearch, toggleSearch, handleTextDebounce}) => {
  return (
    <View style={[s`mx-4 relative z-50`, {height: '7%'}]}>
      <View
        style={[
          s`flex-row justify-end items-center rounded-full`,
          {
            borderRadius: 50,
            backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
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
    </View>
  );
};

export default SearchBar;
