import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import BookShelf from "../components/BookShelf";

const DATA = [
  {
    genre: "Action",
    books: [
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
    ],
  },
  {
    genre: "Science",
    books: [
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
    ],
  },
  {
    genre: "History",
    books: [
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
    ],
  },
  {
    genre: "Fiction",
    books: [
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        title: "Hunger Games",
        image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        title: "Harry Potter: Order of The Phoenix",
        image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
    ],
  },
];

export default function Home({ navigation }) {
  var bookShelves = [];

  for (let i = 0; i < DATA.length; i++) {
    bookShelves.push(
      <BookShelf
        key={i}
        genre={DATA[i].genre}
        books={DATA[i].books}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar navigation={navigation} />
      <ScrollView overScrollMode={"never"} showsVerticalScrollIndicator={false}>
        {bookShelves}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
});
