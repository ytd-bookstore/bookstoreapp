import * as React from "react";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import BookShelf from "../components/BookShelf";

import Loading from "../components/LoadingScreen";
import RequestError from "../components/RequestErrorScreen";
import useGenreIDs from "../hooks/useGenreIDs";

const genreNames = [
  {
    genre: "action",
  },
  {
    genre: "science",
  },
  {
    genre: "history",
  },
  {
    genre: "fiction",
  },
  {
    genre: "romance",
  },
];

export default function Home({ navigation }) {
  const { data: genres, isSuccess, isLoading } = useGenreIDs(genreNames);

  if (isLoading && !isSuccess) {
    return <Loading />;
  } else if (!isLoading && !isSuccess) {
    return <RequestError />;
  }

  var bookShelves = [];

  for (let i = 0; i < genres.length; i++) {
    bookShelves.push(
      <BookShelf
        key={i}
        genre={genres[i].name}
        books={genres[i].books}
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
