import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import colors from "../assets/colors/colors";
import Home from "../pages/HomeScreen";
import Book from "../pages/BookScreen";
import FavoritesScreen from "../pages/FavoritesScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={Home} />
    <HomeStack.Screen name="BookScreen" component={Book} />
  </HomeStack.Navigator>
);

export default function MainContainer() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "md-person-circle"
              : "md-person-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: { height: 50 },
      })}
    >
      <Tabs.Screen
        name="Home"
        component={HomeStackScreen}
        options={styles.tabScreenOptions}
      />
      <Tabs.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={styles.tabScreenOptions}
      />
      <Tabs.Screen
        name="Cart"
        component={FavoritesScreen}
        options={styles.tabScreenOptions}
      />
      <Tabs.Screen
        name="Profile"
        component={FavoritesScreen}
        options={styles.tabScreenOptions}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  tabScreenOptions: {
    tabBarActiveTintColor: colors.headerTextColor,
    tabBarInactiveTintColor: colors.textColor,
    headerShown: false,
  },
});
