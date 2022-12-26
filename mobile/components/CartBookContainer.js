import * as React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../assets/constants/colors";

export default function CartBookContainer(props) {
  return (
    <TouchableOpacity
      style={styles.bookWrapper}
      onPress={() =>
        props.navigation.navigate("BookScreen", {
          id: props.book.id,
        })
      }
    >
      <Image
        style={styles.image}
        source={{
          uri: props.book.image_url,
        }}
      />

      <View style={styles.propertiesWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          {props.book.title}
        </Text>
        <Text numberOfLines={1} style={styles.price}>
          {props.book.price}$
        </Text>
      </View>

      <View style={styles.itemCountWrapper}>
        <TouchableOpacity onPress={() => props.deleteFromCart(props.book.id)}>
          <Ionicons name={"trash-bin-sharp"} size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bookWrapper: {
    borderRadius: 24,
    height: 150,
    //width: 350,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,

    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
    backgroundColor: colors.background,
  },
  image: {
    borderRadius: 12,
    width: 90,
    height: 120,
    resizeMode: "contain",
    marginHorizontal: 16,
  },
  propertiesWrapper: {
    flex: 1,
    height: 120,
    marginRight: 16,
  },
  title: {
    fontFamily: "OpenSans-Bold",
    fontSize: 20,
  },
  price: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 18,
  },
  icon: {
    color: colors.favorite,
  },
  itemCountWrapper: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
