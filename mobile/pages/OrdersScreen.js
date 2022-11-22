import * as React from "react";
import { Text, View, StyleSheet, StatusBar, ScrollView } from "react-native";

import colors from "../assets/colors/colors";

import Header from "../components/Header";
import OrderContainer from "../components/OrderContainer";

const DATA = [
  {
    id: 1,
    user_id: 12,
    total: 144.25,
    date: "1.11.2022",
    status: "Shipping",
    books: [
      {
        id: 123,
        title: "Hunger Games",
        quantity: 3,
        price: 11.25,
        image_url: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        id: 11233,
        title: "Harry Potter: Order of The Phoenix",
        quantity: 5,
        price: 22.1,
        image_url: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
    ],
  },
  {
    id: 1,
    user_id: 12,
    total: 144.25,
    date: "1.11.2022",
    status: "Delivered",
    books: [
      {
        id: 123,
        title: "Hunger Games",
        quantity: 3,
        price: 11.25,
        image_url: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
      },
      {
        id: 11233,
        title: "Harry Potter: Order of The Phoenix",
        quantity: 5,
        price: 22.1,
        image_url: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        id: 11233,
        title: "Harry Potter: Order of The Phoenix",
        quantity: 5,
        price: 22.1,
        image_url: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        id: 11233,
        title: "Harry Potter: Order of The Phoenix",
        quantity: 5,
        price: 22.1,
        image_url: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
      {
        id: 11233,
        title: "Harry Potter: Order of The Phoenix",
        quantity: 5,
        price: 22.1,
        image_url: "https://images.gr-assets.com/books/1255614970l/2.jpg",
      },
    ],
  },
];

export default function Favorites({ navigation }) {
  var orders = [];

  for (let i = 0; i < DATA.length; i++) {
    orders.push(
      <OrderContainer key={i} order={DATA[i]} navigation={navigation} />
    );
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      <ScrollView
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        {orders}
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
    //borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 8,
  },
  headerText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 32,
    color: colors.textColor,
  },
});
