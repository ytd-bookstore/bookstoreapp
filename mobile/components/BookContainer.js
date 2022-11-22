import * as React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../assets/constants/colors";

export default function BookContainer(props) {
  return (
    <View style={styles.bookWrapper}>
      <Image
        style={styles.image}
        source={{
          uri: props.book.image,
        }}
      />
      <View style={styles.propertiesWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          {props.book.title}
        </Text>
        <Text numberOfLines={1} style={styles.author}>
          {props.book.author}
        </Text>
        <Text numberOfLines={2} style={styles.genre}>
          {props.book.genre}
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => props.deleteFavorite()}>
          <Ionicons name="heart-dislike" size={34} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookWrapper: {
    //borderWidth: 1,
    borderRadius: 24,
    height: 150,
    //width: 350,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,

    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
    backgroundColor: colors.background,
  },
  image: {
    borderRadius: 12,
    width: 90,
    height: 120,
    resizeMode: "contain",
    marginHorizontal: 16,
  },
  propertiesWrapper: {
    flex: 1,
    height: 120,
    marginRight: 16,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
  author: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
  },
  genre: {
    fontsize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  icon: {
    color: colors.favorite,
    marginRight: 16,
  },
});
