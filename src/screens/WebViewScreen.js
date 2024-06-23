// src/screens/WebViewScreen.js
import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';

const WebViewScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: url }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewScreen;
