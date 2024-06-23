import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView, // Import ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import tailwind from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import NavOptions from '../components/NavOptions';
import SearchInputAutocomplete from '../components/SearchInputAutocomplete';
import { RecentRides } from '../data/mock';

const Home = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const checkPin = async () => {
      const storedPin = await AsyncStorage.getItem('userPin');
      if (!storedPin) {
        navigation.replace('Login');
      }
    };
    checkPin();
  }, []);

  const handlePress = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.error('Error:', err));
  };

  const handleLinkPress = () => {
    const url = 'https://form.com';
    Linking.openURL(url);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[tailwind`w-full h-full`, themeStyles.background]}>
      <View style={tailwind`flex-1`}>
        <View style={tailwind`p-5`}>
          <View style={tailwind`flex-row justify-between items-center`}>
            <Text style={[{ fontSize: 35, fontWeight: 'bold' }, themeStyles.text]}>
              BuTransit
            </Text>
           
            <TouchableOpacity onPress={toggleDarkMode} style={tailwind`ml-4`}>
              <Icon
                name={darkMode ? 'sun' : 'moon'}
                type="feather"
                color={darkMode ? 'yellow' : 'black'}
                size={30}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLinkPress}>
            <View style={tailwind`p-3`}>
              <Text style={[styles.linkText, themeStyles.text]}>Driver registration</Text>
            </View>
          </TouchableOpacity>
          <NavOptions />
        </View>
        
        <Text style={[{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }, themeStyles.text]}>Quick Rides🔥</Text>
        <Text style={{ textAlign: 'center', marginTop: 5, marginBottom: 20 }}>
          An available Driver will Respond
        </Text>
        
        <FlatList
          style={tailwind`flex-1 px-5`}
          data={RecentRides}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ScrollView
              style={tailwind`mt-2`}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity 
                style={tailwind`flex-row items-center`} 
                onPress={() => handlePress(item.phoneNumber)}
              >
                <View style={tailwind`-ml-1.5`}>
                  <Icon
                    name="clock"
                    type="feather"
                    color="gray"
                    size={24}
                    style={tailwind`p-1 rounded-full ml-2`}
                  />
                </View>
                <View style={tailwind`flex-1 border-b border-gray-100 py-1`}>
                  <Text style={[tailwind`text-base font-bold`, themeStyles.text]}>{item.title}</Text>
                  <Text style={[tailwind`text-sm`, themeStyles.subText]}>
                    {item.address}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handlePress(item.phoneNumber)}>
                  <Icon
                    name="phone"
                    type="feather"
                    color="green"
                    size={24}
                    style={tailwind`p-1 rounded-full ml-2`}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </ScrollView>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const lightStyles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
  },
  subText: {
    color: 'gray',
  },
});

const darkStyles = StyleSheet.create({
  background: {
    backgroundColor: '#121212',
  },
  text: {
    color: 'white',
  },
  subText: {
    color: 'lightgray',
  },
});

const styles = StyleSheet.create({
  linkText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

export default Home;
