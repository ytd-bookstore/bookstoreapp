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

export default function Genre({ route, navigation }) {
  var books = [];

  for (let i = 0; i < route.params.books.length; i++) {
    books.push(
      <SearchedBookContainer
        key={i}
        book={route.params.books[i]}
        navigation={navigation}
      />
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
