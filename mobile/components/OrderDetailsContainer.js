import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import colors from "../assets/constants/colors";

export default function OrderDetailsContainer(props) {
  return (
    <View style={styles.orderWrapper}>
      <View style={styles.propertiesWrapper}>
        <Text numberOfLines={2} style={styles.textStyle}>
          {props.order.date}
        </Text>
        <Text numberOfLines={1} style={styles.textStyle}>
          {props.order.status}
        </Text>
        <Text numberOfLines={2} style={styles.textStyle}>
          Purchased {props.order.books.length} books
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text numberOfLines={2} style={styles.textStyle}>
            Total Price:{" "}
          </Text>
          <Text numberOfLines={2} style={styles.priceStyle}>
            {props.order.total}$
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          marginTop: 5,
          marginRight: 15,
        }}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  orderWrapper: {
    borderRadius: 24,
    height: 150,
    width: 350,
    marginHorizontal: 16,
    flexDirection: "row",
    marginTop: 16,

    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
    backgroundColor: colors.background,
  },
  propertiesWrapper: {
    flex: 1,
    height: 120,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  textStyle: {
    marginTop: 5,
    color: colors.textColor,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 20,
  },
  priceStyle: {
    marginTop: 5,
    color: colors.headerTextColor,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 20,
  },
});
