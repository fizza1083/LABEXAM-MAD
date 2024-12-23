import React from 'react';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Home from '@/components/home'


export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Welcome to My Library</ThemedText>
      <Home />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'maroon',
  },
  title: {
    paddingTop: 40,
    paddingBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}); 