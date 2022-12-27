import * as React from "react";
import { Text, View, StyleSheet, StatusBar, ScrollView } from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import ProfileOptionContianer from "../components/ProfileOptionContainer";

export default function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>My Profile</Text>
      </View>

      <ScrollView
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        <ProfileOptionContianer
          optionName="Orders"
          navigation={navigation}
          screenName="OrdersScreen"
        />
        <ProfileOptionContianer
          optionName="Settings"
          navigation={navigation}
          screenName="Settings"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  headerWrapper: {
    height: 60,
    paddingLeft: 16,
    paddingTop: 8,
  },
  headerText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 32,
    color: colors.textColor,
  },
});
