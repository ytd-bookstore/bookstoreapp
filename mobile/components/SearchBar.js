import * as React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useFonts } from "expo-font";

import colors from "../assets/colors/colors";

Feather.loadFont();

export default function SearchBar() {
  const [fontsLoaded] = useFonts({
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View overflow={"hidden"} paddingBottom={6}>
      <View style={styles.searchWrapper}>
        {/* Search Bar */}
        <View style={styles.inputTextWrapper}>
          <TextInput
            style={styles.textInput}
            cursorColor={colors.headerTextColor}
          ></TextInput>
          <Feather name="search" size={34} color={colors.textColor} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    //borderWidth: 1,
    paddingVertical: 12,
    alignItems: "center",
    //Shadow
    shadowColor: "#000",
    elevation: 10,
    backgroundColor: colors.background,
  },
  inputTextWrapper: {
    flexDirection: "row",
    width: 280,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: "center",
    //Shadow
    shadowColor: "#000",
    elevation: 10,
    backgroundColor: colors.background,
  },
  textInput: {
    flex: 1,
    height: 44,
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    borderRadius: 10,
  },
});
