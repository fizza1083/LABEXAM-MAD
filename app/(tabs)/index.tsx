import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Home from '@/components/home';
import { createStackNavigator } from '@react-navigation/stack';

// Create the Stack navigator instance
const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MY LIBRARY" component={Home} />
      {/* Other screens */}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'maroon',
  },
  title: {
    paddingTop: 40,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
