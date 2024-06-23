// src/routes/Routes.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import Home from '../screens/Home';
import Map from '../screens/Map';
import WebViewScreen from '../screens/WebViewScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Map: undefined;
  WebViewScreen: { url: string }; // Add the type for WebViewScreen params
};

const Routes = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WebViewScreen"
        component={WebViewScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
