import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import colors from "../assets/colors/colors";

export default function GenreBook(props) {
  return (
    <View style={styles.bookWrapper}>
      <View height={160} width={120}>
        <Image
          style={styles.image}
          source={{
            uri: props.image,
          }}
        />
      </View>
      <View>
        <Text numberOfLines={2} style={styles.title}>
          {props.title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bookWrapper: {
    width: 120,
    height: 200,
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
  titleWrapper: {
    height: 40,
    width: 120,
    alignItems: "center",
  },
  title: {
    fontSize: 15,
    fontFamily: "OpenSans-SemiBold",
    color: colors.textColor,
    marginHorizontal: 5,
    textAlign: "center",
  },
});
