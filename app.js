import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Index from './(tabs)/index'; // Adjust the path as necessary

export default function App() {
  return (
    <NavigationContainer>
      <Index />
    </NavigationContainer>
  );
}
