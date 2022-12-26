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
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import IonIcons from "react-native-vector-icons/Ionicons";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import RequestError from "../components/RequestErrorScreen";
import Loading from "../components/LoadingScreen";
import useBook from "../hooks/useBook";
import addFavorite from "../hooks/addFavorite";

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

function Genres(props) {
  if (props.genres.length === 0) {
    return <Text style={props.style}>No genre information...</Text>;
  }
  let genres = [];
  for (let i = 0; i < props.genres.length - 1; i++) {
    genres.push(props.genres[i].name + ", ");
  }
  genres.push(props.genres[props.genres.length - 1].name);

  return <Text style={props.style}>{genres}</Text>;
}

export default function Book({ route, navigation }) {
  const [hearthIconName, setHeartIcon] = React.useState("heart-outline");
  const { data: book, isSuccess, isLoading } = useBook(route.params.id);

  const {
    isSuccess: isSuccessAddFav,
    isLoading: isLoadingAddFav,
    isIdle: isIdleAddFav,
    mutate,
  } = addFavorite();

  const addFav = () => {
    mutate({ userId: 1, bookId: book.id });
    setHeartIcon("heart");
  };

  if (isLoadingAddFav && !isSuccessAddFav) {
    return <Loading />;
  } else if (!isLoadingAddFav && !isSuccessAddFav && !isIdleAddFav) {
    return <RequestError />;
  }

  if (isLoading && !isSuccess) {
    return <Loading />;
  } else if (!isLoading && isSuccess) {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{
                  uri: book.image_url,
                }}
              />
            </View>

            <View style={styles.ratingWrapper}>
              <Text style={styles.ratingText}>{roundRating(book.rating)}</Text>
              <View style={{ flexDirection: "row", marginLeft: "2%" }}>
                <Stars rating={book.rating}></Stars>
              </View>

              <View style={styles.verticleLine}></View>

              <Text style={styles.ratingText}>
                {formatToUnits(book.rating_count, 2)} ratings
              </Text>
              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    addFav();
                  }}
                >
                  <IonIcons
                    name={hearthIconName}
                    color={colors.headerTextColor}
                    size={30}
                  ></IonIcons>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.formatWrapper}>
              <Text style={styles.formatText}>Book Format: </Text>
              <Text style={styles.formatbookText}>{book.format}</Text>
            </View>

            <Text style={styles.title}>{book.title}</Text>
            <Text style={styles.authors}>
              {book.author.replace(/[|]/g, ", ")}
            </Text>
            <Text style={styles.editionAndTags}>
              {book.edition ? book.edition : "Standard Edition"}
            </Text>
            <Genres style={styles.editionAndTags} genres={book.genres}></Genres>
            <View style={styles.pageCountWrapper}>
              <Text style={styles.editionAndTags}>Page Count: </Text>
              <Text style={styles.pageCount}>{book.page}</Text>
              <View style={styles.verticleLine}></View>
              <Text style={styles.editionAndTags}>Stock: </Text>
              <Text style={styles.pageCount}>{book.stock}</Text>
            </View>
            <Text style={styles.description}>{book.description}</Text>
          </View>
        </ScrollView>
        <View style={styles.addToCartWrapper}>
          <View style={styles.priceTextWrapper}>
            <Text style={styles.priceText}>{book.price}$</Text>
          </View>

          <View style={styles.addToCartButtonWrapper}>
            <TouchableOpacity style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return <RequestError />;
  }
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
  formatbookText: {
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
    //marginHorizontal: 5,
    textAlign: "center",
  },
  pageCountWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
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
