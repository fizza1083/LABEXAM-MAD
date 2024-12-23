import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { app } from "@/config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for the book object
type Book = {
  bookName: string;
  author: string;
  price: number;
  category: string;
  location: string;
  rating: number;
  description: string;
  image?: string; // Marking image as optional
};

const ProductDetail = () => {
  const { id } = useLocalSearchParams(); // Get the book ID from the route parameters
  const [book, setBook] = useState<Book | null>(null); // State with Book type
  const [cart, setCart] = useState<Book[]>([]); // State for managing cart items
  const router = useRouter();

  // Load cart data from AsyncStorage
  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        if (cartData) {
          setCart(JSON.parse(cartData));
        }
      } catch (error) {
        console.error("Failed to load cart", error);
      }
    };
    loadCart();
  }, []);

  // Fetch product details from Firebase
  useEffect(() => {
    if (id) {
      const db = getDatabase(app);
      const bookRef = ref(db, `products/${id}`);
      onValue(bookRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setBook(data);
        } else {
          console.error("No product found for this ID");
        }
      });
    }
  }, [id]);

  // Add product to the cart
  const addToCart = async () => {
    if (book) {
      const newCart = [...cart, book];
      setCart(newCart);
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
        alert("Product added to cart");
      } catch (error) {
        console.error("Failed to save cart", error);
      }
    }
  };

  if (!book) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: book.image || "https://via.placeholder.com/150" }}
          style={styles.image}
          resizeMode="cover"
        />
        <ThemedText style={styles.title}>{book.bookName}</ThemedText>
        <ThemedText style={styles.category}>
          Category: {book.category || "Uncategorized"}
        </ThemedText>
        <ThemedText style={styles.description}>{book.description}</ThemedText>
        <ThemedText style={styles.rating}>
          Rating: {book.rating || "No rating yet"}
        </ThemedText>
        <ThemedText style={styles.price}>Price: ${book.price.toFixed(2)}</ThemedText>
        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1e1e1e", // Updated for a dark theme
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "white",
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  loadingText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginTop: 20,
  },
  addToCartButton: {
    backgroundColor: "#FF6347", // Tomato red color
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ProductDetail;
