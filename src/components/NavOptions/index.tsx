import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tailwind from 'twrnc';

const data = [
  {
    id: '1',
    title: 'Find a Ride',
    icon: require('../../../assets/images/cars/UberLux.webp'),
    screen: 'Map',
  },
  
];

function NavOptions() {
  const navigation = useNavigation();

  return (
  <FlatList
  horizontal
  data={data}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Map')}
      style={tailwind`bg-gray-300 p-5 pl-26 pb-6 pt-4 m-2 w-80 rounded-lg`}
    >
      <View>
        <Image
          style={{ width: 140, height: 120, resizeMode: 'contain' }}
          source={item.icon}
        />
        <View style={tailwind`flex-row items-center mt-2`}>
          <Text style={tailwind`font-bold text-lg flex-shrink`}>
            {item.title}
          </Text>
          <Icon
            name="arrow-right"
            type="material-community"
            size={20}
            color="white"
            style={tailwind`p-2 rounded-full bg-black ml-2`}
          />
        </View>
      </View>
    </TouchableOpacity>
  )}
  showsHorizontalScrollIndicator={false}
/>

  );
}

export default NavOptions;
