import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import NavOptions from '../components/NavOptions';
import { RecentRides } from '../data/mock'; // Mock data placeholder

const Home = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const checkPin = async () => {
      const storedPin = await AsyncStorage.getItem('userPin');
      if (!storedPin) {
        navigation.replace('Login'); // Redirect to Login screen if userPin not found
      }
    };
    checkPin();
  }, []);

  useEffect(() => {
    const handleDeepLink = async (event) => {
      const { queryParams } = Linking.parse(event.url);
      if (queryParams.email) {
        setUserEmail(queryParams.email);
      }
    };

    const getInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink({ url: initialUrl });
      }
    };

    Linking.addEventListener('url', handleDeepLink);
    getInitialUrl();

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const handlePress = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) => console.error('Error:', err));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAuthPress = () => {
    // Replace with your driver panel URL or navigation logic
    navigation.navigate('WebViewScreen', { url: 'https://butransit-driver-panel.vercel.app/' });
  };

  const handleProfilePress = () => {
    // Replace with your profile URL or navigation logic
    navigation.navigate('WebViewScreen', { url: 'https://667af7a19da3d03a4df59e63--comforting-buttercream-a0ff2b.netlify.app/#' });
  };

  const themeStyles = darkMode ? darkStyles : lightStyles;

  return (
    <SafeAreaView style={[styles.container, themeStyles.background]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, themeStyles.text]}>BuTransit</Text>
        <TouchableOpacity onPress={toggleDarkMode} style={styles.darkModeButton}>
          <Icon
            name={darkMode ? 'sun' : 'moon'}
            type="feather"
            color={darkMode ? 'yellow' : 'black'}
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
          <Icon
            name="user"
            type="feather"
            color={themeStyles.text.color}
            size={30}
          />
        </TouchableOpacity>
      </View>

      <NavOptions />

      <TouchableOpacity onPress={handleAuthPress} style={styles.driverPanelButton}>
        <Text style={styles.driverPanelButtonText}>Driver Panel</Text>
      </TouchableOpacity>

      <Text style={[styles.quickRidesText, themeStyles.text]}>Quick Rides🔥</Text>
      <Text style={styles.quickRidesDescription}>An available Driver will Respond</Text>

      <FlatList
        style={styles.flatListContainer}
        data={RecentRides} // Replace with your data source
        keyExtractor={(item) => item.id.toString()} // Ensure key is string type
        renderItem={({ item }) => (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => handlePress(item.phoneNumber)}
            >
              <View style={styles.iconContainer}>
                <Icon
                  name="map-pin"
                  type="feather"
                  color="gray"
                  size={24}
                  style={styles.mapPinIcon}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={[styles.itemTitle, themeStyles.text]}>{item.title}</Text>
                <Text style={[styles.itemAddress, themeStyles.subText]}>{item.address}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handlePress(item.phoneNumber)}
                style={styles.phoneIconContainer}
              >
                <Icon
                  name="phone"
                  type="feather"
                  color="#588157"
                  size={24}
                  style={styles.phoneIcon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
      {userEmail ? (
        <Text style={[styles.userEmailText, themeStyles.text]}>Welcome, {userEmail}</Text>
      ) : null}
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
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  darkModeButton: {
    marginLeft: 26,
  },
  profileButton: {
    marginLeft: 4,
  },
  driverPanelButton: {
    backgroundColor: '#4285F4',
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
  },
  driverPanelButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  quickRidesText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  quickRidesDescription: {
    textAlign: 'center',
    marginVertical: 5,
  },
  flatListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  iconContainer: {
    marginLeft: -1.5,
  },
  mapPinIcon: {
    padding: 1,
    borderRadius: 12,
    marginLeft: 2,
  },
  textContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemAddress: {
    fontSize: 14,
    color: 'gray',
  },
  phoneIconContainer: {
    marginLeft: 1,
  },
  phoneIcon: {
    padding: 1,
    borderRadius: 12,
    marginLeft: 2,
  },
  userEmailText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
