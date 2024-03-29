import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import colors from "../assets/constants/colors";
import GenreBook from "../components/GenreBook";

export default function BookShelf(props) {
  const GenreBookItem = ({ item }) => {
    return <GenreBook book={item} navigation={props.navigation} />;
  };

  return (
    <View style={{ height: 300 }}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{props.genre}</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.push("Genre", {
              genre: props.genre,
              books: props.books,
            })
          }
        >
          <Text style={styles.seeAll}>see all</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 250 }}>
        <FlatList
          data={props.books.slice(0, 6)}
          renderItem={GenreBookItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          overScrollMode={"never"}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    marginTop: 12,
    alignItems: "baseline",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: "OpenSans-SemiBold",
    color: colors.textColor,
    fontSize: 24,
  },
  seeAll: {
    fontFamily: "OpenSans-SemiBold",
    color: colors.textColor,
    fontSize: 16,
  },
});
