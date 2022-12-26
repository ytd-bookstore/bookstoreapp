import * as React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import colors from "../assets/constants/colors";

export default function SearchBar(props) {
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: props.disabled
          ? colors.textColor
          : colors.headerTextColor,
      }}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 110,
    height: 40,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: colors.shadow,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
  },
});
