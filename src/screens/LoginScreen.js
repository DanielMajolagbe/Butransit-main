// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [pin, setPin] = useState('');

  const checkPin = async () => {
    try {
      const storedPin = await AsyncStorage.getItem('userPin');
      console.log(`Stored PIN: ${storedPin}, Entered PIN: ${pin}`); // Debugging log
      if (pin === storedPin) {
        navigation.replace('Home');
      } else {
        Alert.alert('Invalid PIN', 'The PIN you entered is incorrect.');
      }
    } catch (error) {
      console.error('Error retrieving PIN:', error);
      Alert.alert('Error', 'An error occurred while checking the PIN.');
    }
  };

  const createNewPin = async () => {
    try {
      if (pin.length === 4) {
        await AsyncStorage.setItem('userPin', pin);
        console.log(`New PIN set: ${pin}`); // Debugging log
        navigation.replace('Home');
      } else {
        Alert.alert('Set A New PIN', 'PIN must be 4 digits.');
      }
    } catch (error) {
      console.error('Error setting PIN:', error);
      Alert.alert('Error', 'An error occurred while creating the PIN.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.title}>Enter your 4-digit PIN</Text>
      <TextInput
        style={styles.input}
        value={pin}
        onChangeText={setPin}
        keyboardType="numeric"
        maxLength={4}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={checkPin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createNewPin}>
        <Text style={styles.buttonText}>Create New PIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
