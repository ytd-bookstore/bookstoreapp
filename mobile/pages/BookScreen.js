import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Button,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons";

import colors from "../assets/colors/colors";

import Header from "../components/Header";

const DATA = {
  authors: ["Suzanne Collins"],
  description:
    "Winning will make you famous. Losing means certain death.The nation of Panem, formed from a post-apocalyptic North America, is a country that consists of a wealthy Capitol region surrounded by 12 poorer districts. Early in its history, a rebellion led by a 13th district against the Capitol resulted in its destruction and the creation of an annual televised event known as the Hunger Games. In punishment, and as a reminder of the power and grace of the Capitol, each district must yield one boy and one girl between the ages of 12 and 18 through a lottery system to participate in the games. The 'tributes' are chosen during the annual Reaping and are forced to fight to the death, leaving only one survivor to claim victory.When 16-year-old Katniss's young sister, Prim, is selected as District 12's female representative, Katniss volunteers to take her place. She and her male counterpart Peeta, are pitted against bigger, stronger representatives, some of whom have trained for this their whole lives. He sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
  edition: "",
  format: "Hardcover",
  page_count: "374 pages",
  rating: 4.33,
  rating_count: "5519135",
  title: "The Hunger Games",
  tags: [
    "Young Adult",
    "Fiction",
    "Science Fiction",
    "Dystopia",
    "Fantasy",
    "Science",
  ],
  image_url: "https://images.gr-assets.com/books/1447303603l/2767052.jpg",
  price: "29.99$",
};

function formatToUnits(number, precision) {
  const abbrev = ["", "k", "m", "b", "t"];
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(number)) / 3);
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
  const suffix = abbrev[order];

  return (number / Math.pow(10, order * 3)).toFixed(precision) + suffix;
}

function roundRating(rating) {
  let remainder = rating % 1;
  if (remainder >= 0.75) {
    rating = Math.ceil(rating);
  } else if (remainder < 0.25) {
    rating = Math.floor(rating);
  } else {
    rating = Math.floor(rating) + 0.5;
  }
  return rating;
}

function Stars(props) {
  var stars = [];
  let rounded = roundRating(props.rating);
  let i = 0;
  while (i < Math.floor(rounded)) {
    stars.push(
      <MaterialIcons
        name={"star"}
        key={i}
        color={colors.headerTextColor}
        size={30}
      />
    );
    i++;
  }
  if (rounded - i > 0) {
    stars.push(
      <MaterialIcons
        name={"star-half"}
        key={i}
        color={colors.headerTextColor}
        size={30}
      />
    );
    i++;
  }
  while (i < 5) {
    stars.push(
      <MaterialIcons
        name={"star-outline"}
        key={i}
        color={colors.headerTextColor}
        size={30}
      />
    );
    i++;
  }

  return stars;
}

function parse_list(list) {
  var list_string = "";
  let i = 0;
  for (i = 0; i < list.length - 1; i++) {
    list_string += list[i] + ", ";
  }
  list_string += list[i];
  return list_string;
}

const createAlert = () =>
  Alert.alert(DATA.title, "Added to Favorites", [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);

export default function Book({ navigation }) {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView overScrollMode={"never"} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={{
                uri: DATA.image_url,
              }}
            />
          </View>

          <View style={styles.ratingWrapper}>
            <Text style={styles.ratingText}>{roundRating(DATA.rating)}</Text>
            <View style={{ flexDirection: "row", marginLeft: "2%" }}>
              <Stars rating={DATA.rating}></Stars>
            </View>

            <View style={styles.verticleLine}></View>

            <Text style={styles.ratingText}>
              {formatToUnits(DATA.rating_count, 2)} ratings
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity onPress={createAlert}>
                <IonIcons
                  name={"heart-outline"}
                  color={colors.headerTextColor}
                  size={30}
                ></IonIcons>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formatWrapper}>
            <Text style={styles.formatText}>Book Format: </Text>
            <Text style={styles.formatDataText}>{DATA.format}</Text>
          </View>

          <Text style={styles.title}>{DATA.title}</Text>
          <Text style={styles.authors}>{parse_list(DATA.authors)}</Text>
          <Text style={styles.editionAndTags}>
            {DATA.edition ? DATA.edition : "Standard Edition"}
          </Text>
          <Text style={styles.editionAndTags}>{parse_list(DATA.tags)}</Text>
          <View style={styles.pageCountWrapper}>
            <Text style={styles.editionAndTags}>Page Count: </Text>
            <Text style={styles.pageCount}>{DATA.page_count}</Text>
          </View>
          <Text style={styles.description}>{DATA.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.addToCartWrapper}>
        <View style={styles.priceTextWrapper}>
          <Text style={styles.priceText}>{DATA.price}</Text>
        </View>

        <View style={styles.addToCartButtonWrapper}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
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
  image: {
    borderRadius: 10,
    width: 140,
    height: 210,
    resizeMode: "contain",
  },
  imageWrapper: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    height: 250,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
  },
  ratingWrapper: {
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 35,
    flexDirection: "row",
    alignItems: "center",
  },
  verticleLine: {
    marginHorizontal: "2%",
    height: "70%",
    width: 1,
    backgroundColor: colors.textColor,
  },
  ratingText: {
    color: colors.textColor,
    size: 12,
    fontFamily: "OpenSans-SemiBold",
  },
  formatWrapper: {
    borderWidth: 1,
    marginTop: 5,
    marginHorizontal: 10,
    height: 35,
    borderRadius: 5,
    borderColor: colors.textColor,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formatText: {
    color: colors.textColor,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  formatDataText: {
    color: colors.black,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
  title: {
    fontSize: 32,
    fontFamily: "OpenSans-Bold",
    color: colors.black,
    marginHorizontal: 5,
    textAlign: "center",
  },
  authors: {
    fontSize: 16,
    fontFamily: "OpenSans-Bold",
    color: colors.textColor,
    marginHorizontal: 5,
    textAlign: "center",
  },
  editionAndTags: {
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold",
    color: colors.textColor,
    marginHorizontal: 5,
    textAlign: "center",
  },
  pageCountWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pageCount: {
    fontSize: 12,
    fontFamily: "OpenSans-SemiBold",
    color: colors.black,
    textAlign: "center",
  },
  description: {
    fontSize: 10,
    fontFamily: "OpenSans-SemiBold",
    color: colors.textColor,
    marginHorizontal: 5,
    textAlign: "left",
    padding: 10,
  },
  addToCartWrapper: {
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
  addToCartButtonWrapper: {
    flex: 3,
    padding: 10,
  },
  addToCartButton: {
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.headerTextColor,
  },
  addToCartButtonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
});