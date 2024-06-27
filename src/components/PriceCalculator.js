// src/components/PriceCalculator.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const PriceCalculator = () => {
  const [kms, setKms] = useState('');
  const [price, setPrice] = useState(null);

  const calculatePrice = () => {
    const ratePerKm = 135; // Example rate per kilometer
    const tripPrice = parseFloat(kms) * ratePerKm;
    setPrice(tripPrice.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter trip Distance (in kms):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={kms}
        onChangeText={setKms}
        placeholder="Enter distance"
      />
      <Button title="Calculate Price" onPress={calculatePrice} />
      {price !== null && (
        <Text style={styles.result}>Estimated Price: ₦{price}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PriceCalculator;
