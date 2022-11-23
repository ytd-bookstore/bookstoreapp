import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import CartBookContainer from "../components/CartBookContainer";

const DATA = {
  id: 1,
  user_id: 12,
  total: 144.25,
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
};

export default function Cart({ navigation }) {
  var books = [];
  for (let i = 0; i < DATA.books.length; i++) {
    books.push(
      <CartBookContainer key={i} book={DATA.books[i]} navigation={navigation} />
    );
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>My Cart</Text>
      </View>

      <ScrollView
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        {books}
      </ScrollView>
      <View style={styles.purchaseWrapper}>
        <View style={styles.priceTextWrapper}>
          <Text style={styles.priceText}>Total:</Text>
          <Text style={styles.priceText}>{DATA.total}$</Text>
        </View>

        <View style={styles.purchaseButtonWrapper}>
          <TouchableOpacity style={styles.purchaseButton}>
            <Text style={styles.purchaseButtonText}>Purchase</Text>
          </TouchableOpacity>
        </View>
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
  purchaseWrapper: {
    flexDirection: "row",
  },
  priceTextWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  priceText: {
    color: colors.textColor,
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
  },
  purchaseButtonWrapper: {
    flex: 3,
    padding: 10,
  },
  purchaseButton: {
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.headerTextColor,
  },
  purchaseButtonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
});
