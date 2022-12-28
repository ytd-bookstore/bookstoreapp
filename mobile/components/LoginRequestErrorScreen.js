import * as React from "react";
import { Text, View, StyleSheet, StatusBar, Image } from "react-native";

import colors from "../assets/constants/colors";

import LoginHeader from "../components/LoginHeader";

export default function LoginRequestError() {
  return (
    <View style={styles.container}>
      <LoginHeader />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <Image
          style={styles.image}
          source={require("../assets/cryingBook.png")}
        />
        <Text style={styles.errorText}>Oops...</Text>
        <Text style={styles.tryAgainText}>
          We are unable to fulfill your request right now. Please try again
          later.
        </Text>
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
  errorText: {
    color: colors.headerTextColor,
    fontSize: 30,
    fontFamily: "OpenSans-SemiBold",
  },
  tryAgainText: {
    color: colors.textColor,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
