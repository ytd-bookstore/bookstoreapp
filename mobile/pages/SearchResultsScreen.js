import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import SearchedBookContainer from "../components/SearchedBookContainer";
import useSearch from "../hooks/useSearch";

import Loading from "../components/LoadingScreen";
import RequestError from "../components/RequestErrorScreen";

export default function SearchResults({ route, navigation }) {
  const {
    data: searchResults,
    isSuccess,
    isLoading,
  } = useSearch(route.params.searchedItem);

  if (isLoading && !isSuccess) {
    return <Loading />;
  } else if (!isLoading && !isSuccess) {
    return <RequestError />;
  }

  if (searchResults.length === 0 || searchResults.errors) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>
            Search results for {"\n" + '"' + route.params.searchedItem + '"'}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Image
            style={styles.image}
            source={require("../assets/cryingBook.png")}
          />
          <Text style={styles.errorText}>Sorry...</Text>
          <Text style={styles.tryAgainText}>
            We are unable to find the book you are looking for.
          </Text>
        </View>
      </View>
    );
  }

  var books = [];

  for (let i = 0; i < searchResults.length; i++) {
    books.push(
      <SearchedBookContainer
        key={i}
        book={searchResults[i]}
        navigation={navigation}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>
          Search results for {"\n" + '"' + route.params.searchedItem + '"'}
        </Text>
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
    paddingLeft: 16,
    paddingTop: 8,
    paddingBottom: 5,
  },
  headerText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 32,
    color: colors.textColor,
  },
  errorText: {
    color: colors.headerTextColor,
    fontSize: 30,
    fontFamily: "OpenSans-SemiBold",
  },
  tryAgainText: {
    color: colors.textColor,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
