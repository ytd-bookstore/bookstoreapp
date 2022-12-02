import * as React from "react";
import { View, StyleSheet, StatusBar, ActivityIndicator } from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color={colors.headerTextColor} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
