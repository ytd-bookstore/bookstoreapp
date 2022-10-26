import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../assets/colors/colors";

Ionicons.loadFont();

export default function Footer(props) {
  const iconSize = 44;

  return (
    <View style={styles.footerWrapper}>
      <View style={styles.iconWrapper}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Ionicons
            name={props.page === "Home" ? "book" : "book-outline"}
            size={iconSize}
            style={props.page === "Home" ? styles.selectedIcon : styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconWrapper}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("Favorites")}
        >
          <Ionicons
            name={props.page === "Favorites" ? "heart" : "heart-outline"}
            size={iconSize}
            style={
              props.page === "Favorites" ? styles.selectedIcon : styles.icon
            }
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconWrapper}>
        <Ionicons
          name={props.page === "Cart" ? "cart" : "cart-outline"}
          size={iconSize}
          style={props.page === "Cart" ? styles.selectedIcon : styles.icon}
        />
      </View>

      <View style={styles.iconWrapper}>
        <Ionicons
          name={
            props.page === "Profile"
              ? "md-person-circle"
              : "md-person-circle-outline"
          }
          size={iconSize}
          style={props.page === "Profile" ? styles.selectedIcon : styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerWrapper: {
    height: 50,
    flexDirection: "row",
    overflow: "hidden",
    paddingTop: 3,
  },
  iconWrapper: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    //Shadow
    shadowColor: colors.shadow,
    elevation: 15,
    backgroundColor: colors.background,
  },
  icon: {
    color: colors.textColor,
  },
  selectedIcon: {
    color: colors.headerTextColor,
  },
});
