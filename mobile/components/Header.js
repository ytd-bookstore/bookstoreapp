import * as React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { useFonts } from "expo-font";

import colors from "../assets/colors/colors";

export default function Header() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.headerWrapper}>
      <Text style={styles.headerText}>ytd bookstore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerText: {
    paddingTop: 30,
    color: colors.headerTextColor,
    fontFamily: "OpenSans-Bold",
    fontSize: 32,
  },
});
