import * as React from "react";
import { Text, View, StyleSheet, StatusBar, ScrollView } from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import BookContainer from "../components/BookContainer";
import useFavorites from "../hooks/useFavorites";

import Loading from "../components/LoadingScreen";
import RequestError from "../components/RequestErrorScreen";

import { useIsFocused } from "@react-navigation/core";
import deleteFavorite from "../hooks/deleteFavorite";

export default function Favorites({ navigation }) {
  const isFocused = useIsFocused();
  const [pageState, setPageState] = React.useState(false);

  React.useEffect(() => {
    if (isFocused) {
      setPageState(!pageState);
    }
  }, [isFocused]);
  const { data: favorites, isSuccess, isLoading } = useFavorites(pageState, 1);
  const {
    isSuccess: isSuccessDelete,
    isLoading: isLoadingDelete,
    isIdle: isIdleDelete,
    mutate,
  } = deleteFavorite();

  const unFav = (bookId) => {
    mutate({ userId: 1, bookId });
  };

  React.useEffect(() => {
    if (!isLoadingDelete && isSuccessDelete) {
      setPageState(!pageState);
    }
  }, [isLoadingDelete, isSuccessDelete]);

  if (isLoadingDelete && !isSuccessDelete) {
    return <Loading />;
  } else if (!isLoadingDelete && !isSuccessDelete && !isIdleDelete) {
    return <RequestError />;
  }

  if (isLoading && !isSuccess) {
    return <Loading />;
  } else if (!isLoading && !isSuccess) {
    return <RequestError />;
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>Favorites</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.noFavoritesText}>
            You don't have any favorites right now. You can add a book to your
            favorites from book's page.
          </Text>
        </View>
      </View>
    );
  }

  var books = [];

  for (let i = 0; i < favorites.length; i++) {
    books.push(
      <BookContainer
        key={i}
        book={favorites[i].Book}
        navigation={navigation}
        deleteFavorite={() => {
          unFav(favorites[i].Book.id);
        }}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Favorites</Text>
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
    height: 60,
    paddingLeft: 16,
    paddingTop: 8,
  },
  headerText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 32,
    color: colors.textColor,
  },
  noFavoritesText: {
    color: colors.textColor,
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
  },
});
