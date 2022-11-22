import * as React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../assets/constants/colors";

export default function FormTextInput(props) {
  return (
    <View style={styles.inputWrapper}>
      <Ionicons
        name={props.icon}
        size={24}
        color={colors.textColor}
        style={styles.icon}
      />
      <TextInput
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secure ? props.secure : false}
        style={styles.inputText}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    marginHorizontal: 45,
    marginVertical: 10,
    borderRadius: 10,
    height: 45,
    alignItems: "center",
    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
    backgroundColor: colors.background,
    flexDirection: "row",
  },
  icon: {
    paddingHorizontal: 10,
  },
  inputText: {
    flex: 1,
    color: colors.textColor,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
  },
});
