import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import tailwind from 'twrnc';
import { RecentRides } from '../../../data/mock';

function ChooseRide() {
  const navigation = useNavigation();

  const handlePress = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.error('Error:', err));
  };

  return (
    <View style={tailwind`flex-1 bg-white p-5`}>
      <View style={tailwind`flex self-center w-7 h-1 bg-gray-200 rounded-full`} />
      <TouchableOpacity style={tailwind`absolute left-6 py-4`} onPress={() => navigation.navigate('Home')}>
        <Icon
          name="arrow-left"
          type="feather"
          color="black"
          size={30}
        
        />
      </TouchableOpacity>
      <Text style={tailwind`text-center py-3 text-xl font-bold`}>
        Rides
      </Text>
      <KeyboardAvoidingView
        style={tailwind`flex-1`}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 500 : -0}
      >
        <FlatList
          data={RecentRides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={tailwind`flex flex-row items-center mt-2`}>
              <View style={tailwind`-ml-3`}>
              <Icon
                    name="map-pin"
                    type="feather"
                    color="gray"
                    size={24}
                    style={tailwind`p-1 rounded-full ml-2`}
                  />
              </View>
              <View style={tailwind`flex-1 border-b-2 border-gray-100 p-2`}>
                <Text style={tailwind`text-base font-bold`}>{item.title}</Text>
                <Text style={tailwind`text-sm text-gray-500`}>
                  {item.phoneNumber}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity 
        style={[tailwind`h-14 w-[90%] bg-black rounded-full flex-row items-center justify-center`, styles.fixedButton]}
        onPress={() => navigation.navigate('ChooseRideType')}
      >
        <Icon
          name="directions-car"
          type="material"
          color="white"
          size={20}
          
        />
        <Text style={tailwind`text-center text-white text-lg font-medium ml-3`}>
          Ride
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    left: '10%',
  },
});

export default ChooseRide;
