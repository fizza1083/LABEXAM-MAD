import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";

type Product = {
  id: string;
  image: string;
  bookName: string;
  category?: string;
  price: number;
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Logic to fetch favorites (could be from Firebase or any other source)
  useEffect(() => {
    // Example: Fetching data for favorites, if needed.
    const fetchedFavorites: Product[] = [
      {
        id: "1",
        image: "https://via.placeholder.com/150",
        bookName: "Book 1",
        category: "Fiction",
        price: 10.99,
      },
      // Add more items here
    ];
    setFavorites(fetchedFavorites);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <ThemedView style={styles.productDetails}>
              <ThemedText style={styles.productName}>{item.bookName}</ThemedText>
              <ThemedText style={styles.productCategory}>
                {item.category || "Uncategorized"}
              </ThemedText>
              <ThemedText style={styles.productPrice}>
                ${item.price.toFixed(2)}
              </ThemedText>
            </ThemedView>
            <Ionicons name="heart" size={24} color="red" />
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 14,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Favorites;
