import React, { useEffect, useState } from "react";
import { 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  TextInput, 
  Button, 
  Image 
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { app } from "@/config/firebase";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const db = getDatabase(app);
    const productsRef = ref(db, "products");
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const productsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setProducts(productsArray);
        setFilteredProducts(productsArray);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredProducts(
        products.filter(
          (product) =>
            product.bookName.toLowerCase().includes(lowerCaseQuery) ||
            product.category?.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <ThemedText style={styles.title}>Book House</ThemedText>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, categories..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor="#AAA"
        />
        <Button title="Search" onPress={() => handleSearch(searchQuery)} />
      </View>

      {/* Product Listing */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => router.push(`/product-detail/${item.id}`)}
          >
            <Image
              source={{ uri: item.image || "https://via.placeholder.com/150" }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.productDetails}>
              <ThemedText style={styles.productName}>{item.bookName}</ThemedText>
              <ThemedText style={styles.productCategory}>
                {item.category || "Uncategorized"}
              </ThemedText>
              <ThemedText style={styles.productPrice}>
                ${item.price.toFixed(2)}
              </ThemedText>
            </View>
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "grey",
    marginRight: 8,
    color: "#333",
  },
  listContainer: {
    paddingBottom: 20,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
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
    color: "white",
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 14,
    color: "white",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

export default Home;
