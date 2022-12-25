import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

import colors from "../assets/constants/colors";

export default function GenreBook(props) {
  return (
    <TouchableOpacity
      style={styles.bookWrapper}
      onPress={() =>
        props.navigation.push("BookScreen", {
          id: props.book.id,
        })
      }
    >
      <View height={160} width={120}>
        <Image
          style={styles.image}
          source={{
            uri: props.book.image_url,
          }}
        />
      </View>
      <View>
        <Text numberOfLines={2} style={styles.title}>
          {props.book.title}
        </Text>
        <Text numberOfLines={2} style={styles.price}>
          {props.book.price}$
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookWrapper: {
    width: 120,
    height: 220,
    backgroundColor: colors.background,
    borderRadius: 12,
    marginTop: 12,
    marginHorizontal: 10,
    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
  },
  image: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  title: {
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold",
    color: colors.textColor,
    marginHorizontal: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold",
    color: colors.black,
    marginHorizontal: 5,
    textAlign: "center",
  },
});
