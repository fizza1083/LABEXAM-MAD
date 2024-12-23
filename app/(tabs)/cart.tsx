import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = ({ navigation }: { navigation: any }) => {
  const [cartItems, setCartItems] = useState<{ id: string; name: string; price: string }[]>([]);

  // Load cart data from AsyncStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          setCartItems(JSON.parse(cartData));
        }
      } catch (error) {
        console.error('Failed to load cart', error);
      }
    };
    loadCart();
  }, []);

  const renderItem = ({ item }: { item: { name: string; price: string } }) => (
    <View style={styles.item}>
      <View style={styles.itemDetails}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      // Navigate to the Payment Screen
      navigation.navigate('Payment');
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#D3D3D3', // Light grey background for the rest of the page
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black', // Title text should be black
    backgroundColor: '#800000', // Maroon background for the top
    paddingVertical: 10,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  name: {
    fontSize: 16,
    color: 'black', // Item name text should be black
    flex: 2, // Ensures that the name takes up more space
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Price text should be black
    flex: 1, // Ensures the price is aligned to the right
    textAlign: 'right', // Right-align price
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888', // Empty cart text color
  },
  checkoutButton: {
    backgroundColor: '#800000', // Maroon button color
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'black', // Black text on the button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
