import * as React from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../assets/constants/colors";

export default function CartBookContainer(props) {
  const [itemCount, changeItemCount] = React.useState(1);
  const increaseItemCount = () => {
    changeItemCount(itemCount + 1);
  };
  const decreaseItemCount = () => {
    if (itemCount - 1 > 0) {
      changeItemCount(itemCount - 1);
    }
  };
  return (
    <View style={styles.bookWrapper}>
      <TouchableOpacity onPress={() => props.navigation.navigate("BookScreen")}>
        <Image
          style={styles.image}
          source={{
            uri: props.book.image_url,
          }}
        />
      </TouchableOpacity>

      <View style={styles.propertiesWrapper}>
        <Text numberOfLines={2} style={styles.title}>
          {props.book.title}
        </Text>
        <Text numberOfLines={1} style={styles.price}>
          {props.book.price}$
        </Text>
      </View>

      <View style={styles.itemCountWrapper}>
        <TouchableOpacity onPress={increaseItemCount}>
          <Ionicons name="add-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>{props.book.quantity}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={decreaseItemCount}>
          <Ionicons
            name={
              props.book.quantity > 1 ? "remove-outline" : "trash-bin-sharp"
            }
            size={24}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
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
    color: colors.black,
  },
  itemCountWrapper: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});
