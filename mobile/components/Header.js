import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import colors from "../assets/constants/colors";

export default function Header() {
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
