import * as React from "react";
import { Text, View, StyleSheet, StatusBar, ScrollView } from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import OrderDetailsContainer from "../components/OrderDetailsContainer";
import OrderedBookContainer from "../components/OrderedBookContainer";

export default function OrderDetails({ navigation, route }) {
  var orderedBooks = [];

  for (let i = 0; i < route.params.order.books.length; i++) {
    orderedBooks.push(
      <OrderedBookContainer
        key={i}
        book={route.params.order.books[i]}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Order Details</Text>
      </View>

      <ScrollView
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 16,
        }}
      >
        <OrderDetailsContainer key={0} order={route.params.order} />
        {orderedBooks}
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
