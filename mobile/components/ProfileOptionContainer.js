import * as React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";

import colors from "../assets/constants/colors";

export default function ProfileOptionContianer(props) {
  return (
    <TouchableOpacity
      style={styles.optionWrapper}
      onPress={() => props.navigation.push(props.screenName)}
    >
      <Text style={styles.optionName}>{props.optionName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionWrapper: {
    borderRadius: 24,
    height: 90,
    width: 350,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    marginVertical: 25,

    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
    backgroundColor: colors.background,
  },
  optionName: {
    color: colors.textColor,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 30,
  },
});
