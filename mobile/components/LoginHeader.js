import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

import colors from "../assets/colors/colors";

export default function Header() {
  return (
    <View style={styles.headerWrapper}>
      <View>
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        ></Image>
      </View>
      <Text style={styles.headerText}>ytd bookstore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 25,
  },
  image: {
    marginTop: 30,
    width: 225,
    height: 225,
  },
  headerText: {
    marginTop: -25,
    color: colors.headerTextColor,
    fontFamily: "OpenSans-Bold",
    fontSize: 32,
  },
});
