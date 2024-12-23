import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useRouter, SearchParams } from "expo-router"; // Correct import for useSearchParams
import { getDatabase, ref, get } from "firebase/database";
import { app } from "@/config/firebase";
import { useSearchParams } from "expo-router/build/hooks";

interface Book {
  bookName: string;
  author: string;
  price: string;
  description?: string; // Optional property
  rating?: number; // Optional property
}

const BookDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      const db = getDatabase(app);
      const bookRef = ref(db, `users/${id}/books`); // Adjust the path if needed
      get(bookRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const booksArray = snapshot.val();
            const firstBook = booksArray[0]; // Assuming you want the first book
            setBook(firstBook);
          } else {
            console.error("No data available");
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [id]);

  if (!book) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Use placeholders if book details are missing */}
      <Text style={styles.bookName}>{book.bookName || "Unknown Title"}</Text>
      <Text>{book.author || "Unknown Author"}</Text>
      <Text>{book.price || "Unknown Price"}</Text>
      {book.description && <Text>{book.description}</Text>}
      {book.rating && <Text>Rating: {book.rating}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  bookName: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default BookDetail;
