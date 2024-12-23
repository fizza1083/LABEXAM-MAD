import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Page</Text>
      <Text style={styles.message}>You can now enter your payment details here.</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Complete Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white',
  },
  message: {
    fontSize: 18,
    marginBottom: 30,
    color:'white',
  },
  button: {
    backgroundColor: '#800000',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
