import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Button,
} from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import SearchedBookContainer from "../components/SearchedBookContainer";

const DATA = [
  {
    id: "1",
    title: "Hunger Games",
    image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
    author: "Susanne Collins",
    genre: "Fiction, Distopia, Fantasy, Science-Fiction",
  },
  {
    id: "2",
    title: "Harry Potter: Order of The Phoenix",
    image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
    author: "J.K. Rowling, Mary GrandPre",
    genre: "Fantasy, Young Adults, Fiction",
  },
  {
    id: "3",
    title: "Hunger Games",
    image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
    author: "Susanne Collins",
    genre: "Fiction, Distopia, Fantasy, Science-Fiction",
  },
  {
    id: "4",
    title: "Harry Potter: Order of The Phoenix",
    image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
    author: "J.K. Rowling, Mary GrandPre",
    genre: "Fantasy, Young Adults, Fiction",
  },
  {
    id: "5",
    title: "Hunger Games",
    image: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
    author: "Susanne Collins",
    genre: "Fiction, Distopia, Fantasy, Science-Fiction",
  },
  {
    id: "6",
    title: "Harry Potter: Order of The Phoenix",
    image: "https://images.gr-assets.com/books/1255614970l/2.jpg",
    author: "J.K. Rowling, Mary GrandPre",
    genre: "Fantasy, Young Adults, Fiction",
  },
];

export default function Genre({ route, navigation }) {
  var books = [];

  for (let i = 0; i < DATA.length; i++) {
    books.push(
      <SearchedBookContainer key={i} book={DATA[i]} navigation={navigation} />
    );
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>{route.params.genre}</Text>
      </View>

      <ScrollView
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        {books}
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
  headerWrapper: {
    //height: 100,
    //borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 5,
  },
  headerText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 32,
    color: colors.textColor,
  },
});
