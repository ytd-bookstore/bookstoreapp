import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import colors from "../assets/constants/colors";

import Login from "../pages/LoginScreen";
import Register from "../pages/RegisterScreen";

import Home from "../pages/HomeScreen";
import Book from "../pages/BookScreen";
import SearchResults from "../pages/SearchResultsScreen";
import Genre from "../pages/GenreScreen";

import FavoritesScreen from "../pages/FavoritesScreen";

import CartScreen from "../pages/CartScreen";
import Payment from "../pages/PaymentScreen";

import Profile from "../pages/ProfileScreen";
import Orders from "../pages/OrdersScreen";
import OrderDetails from "../pages/OrderDetailsScreen";
import Settings from "../pages/SettingsScreen";

const Main = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CartStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeScreen" component={Home} />
    <HomeStack.Screen name="BookScreen" component={Book} />
    <HomeStack.Screen name="SearchResults" component={SearchResults} />
    <HomeStack.Screen name="Genre" component={Genre} />
  </HomeStack.Navigator>
);

const LoginStackScreen = () => (
  <LoginStack.Navigator screenOptions={{ headerShown: false }}>
    <LoginStack.Screen name="LoginScreen" component={Login}></LoginStack.Screen>
    <LoginStack.Screen
      name="RegisterScreen"
      component={Register}
    ></LoginStack.Screen>
  </LoginStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileScreen" component={Profile} />
    <ProfileStack.Screen name="OrdersScreen" component={Orders} />
    <ProfileStack.Screen name="OrderDetails" component={OrderDetails} />
    <ProfileStack.Screen name="Settings" component={Settings} />
  </ProfileStack.Navigator>
);

const CartStackScreen = () => (
  <CartStack.Navigator screenOptions={{ headerShown: false }}>
    <CartStack.Screen
      name="CartScreen"
      component={CartScreen}
    ></CartStack.Screen>
    <CartStack.Screen name="Payment" component={Payment}></CartStack.Screen>
  </CartStack.Navigator>
);

function BottomTabs() {
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
        component={CartStackScreen}
        options={styles.tabScreenOptions}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={styles.tabScreenOptions}
      />
    </Tabs.Navigator>
  );
}

export default function MainContainer() {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name="Login" component={LoginStackScreen} />
      <Main.Screen name="HomeTabs" component={BottomTabs} />
    </Main.Navigator>
  );
}

const styles = StyleSheet.create({
  tabScreenOptions: {
    tabBarActiveTintColor: colors.headerTextColor,
    tabBarInactiveTintColor: colors.textColor,
    headerShown: false,
  },
});
