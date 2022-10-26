import * as React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

import colors from "../assets/colors/colors";
import GenreBook from "../components/GenreBook";

export default function BookShelf(props) {
  const GenreBookItem = ({ item }) => {
    return <GenreBook image={item.image} title={item.title} />;
  };
  return (
    <View style={{ height: 275 }}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{props.genre}</Text>
        <Text style={styles.seeAll}>see all</Text>
      </View>
      <View style={{ height: 230 }}>
        <FlatList
          data={props.books}
          renderItem={GenreBookItem}
          keyExtractor={(item) => item.id}
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
