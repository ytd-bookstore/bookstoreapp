import * as React from "react";
import { Text, View, StyleSheet, StatusBar, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import colors from "../assets/colors/colors";

import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

Feather.loadFont();

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
});
