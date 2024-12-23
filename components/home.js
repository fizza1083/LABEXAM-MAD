import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { getDatabase, ref, onValue } from "firebase/database";
import { useRouter } from "expo-router";

import { app } from "@/config/firebase";

const Home = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, "users");
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setUsers(usersArray);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>MY DATA</ThemedText>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() => router.push(`/book-detail/${item.id}`)}
          >
            <ThemedText style={styles.userName}>{item.name}</ThemedText>
            <ThemedText style={styles.userEmail}>{item.email}</ThemedText>
            {item.books.map((book) => (
              <ThemedText style={styles.bookInfo} key={book.bookId}>
                {book.bookName} - {book.price}
              </ThemedText>
            ))}
          </TouchableOpacity>
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userItem: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  bookInfo: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Home;
