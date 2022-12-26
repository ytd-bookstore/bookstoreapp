import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import colors from "../assets/constants/colors";

export default function OrderContainer(props) {
  var images = [];

  for (let i = 0; i < props.order.books.length && i < 3; i++) {
    images.push(
      <Image
        key={i}
        style={styles.image}
        source={{
          uri: props.order.books[i].image_url,
        }}
      />
    );
  }

  if (props.order.books.length > 3) {
    images.push(
      <Text
        key={props.order.books.length}
        style={{
          fontSize: 40,
          alignSelf: "center",
          color: colors.textColor,
        }}
      >
        ···
      </Text>
    );
  }

  return (
    <TouchableOpacity
      style={styles.orderWrapper}
      onPress={() =>
        props.navigation.push("OrderDetails", {
          order: props.order,
        })
      }
    >
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
        <View style={{ flexDirection: "row" }}>{images}</View>

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
      >
        <Text numberOfLines={2} style={styles.textStyle}>
          Details
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  orderWrapper: {
    //borderWidth: 1,
    borderRadius: 24,
    height: 205,
    width: 350,
    marginHorizontal: 16,
    flexDirection: "row",
    //alignItems: "center",
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
  image: {
    borderRadius: 5,
    width: 45,
    height: 60,
    resizeMode: "contain",
    marginRight: 5,
    marginTop: 5,
  },
});
