import * as React from "react";
import { TextInput, View, StyleSheet, Text } from "react-native";

import colors from "../assets/constants/colors";

export default function SettingsTextInput(props) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        height: props.height,
        borderColor: colors.textColor,
        marginHorizontal: 15,
        marginTop: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "OpenSans-SemiBold",
          fontSize: 10,
          paddingLeft: 5,
          height: 15,
        }}
      >
        {props.placeHolder}
      </Text>
      <TextInput
        secureTextEntry={props.secure ? props.secure : false}
        onChangeText={props.onChangeText}
        style={{
          width: props.width,
          height: props.height - 15,
          paddingLeft: 5,
          fontSize: 20,
          textAlignVertical: "top",
        }}
      ></TextInput>
    </View>
  );
}
