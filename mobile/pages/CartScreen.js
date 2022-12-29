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

import Loading from "../components/LoadingScreen";
import RequestError from "../components/RequestErrorScreen";

import { useIsFocused } from "@react-navigation/core";
import useCart from "../hooks/useCart";
import deleteBookFromCart from "../hooks/deleteBookFromCart";

export default function Cart({ navigation }) {
  const isFocused = useIsFocused();
  const [pageState, setPageState] = React.useState(false);

  React.useEffect(() => {
    if (isFocused) {
      setPageState(!pageState);
    }
  }, [isFocused]);

  const { data: cart, isSuccess, isLoading } = useCart(pageState);

  const {
    isSuccess: isSuccessDelete,
    isLoading: isLoadingDelete,
    isIdle: isIdleDelete,
    mutate,
  } = deleteBookFromCart();

  const deleteFromCart = (bookId) => {
    mutate({ bookId });
  };

  React.useEffect(() => {
    if (!isLoadingDelete && isSuccessDelete) {
      setPageState(!pageState);
    }
  }, [isLoadingDelete, isSuccessDelete]);

  if (isLoadingDelete && !isSuccessDelete) {
    return <Loading />;
  } else if (!isLoadingDelete && !isSuccessDelete && !isIdleDelete) {
    return <RequestError />;
  }

  if (isLoading && !isSuccess) {
    return <Loading />;
  } else if (!isLoading && !isSuccess) {
    return <RequestError />;
  }

  if (!cart.books || cart.books.length === 0) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>My Cart</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.noBooksText}>
            You don't have any books in your cart right now. You can add a book
            to your cart from book's page.
          </Text>
        </View>
      </View>
    );
  }

  var books = [];
  for (let i = 0; i < cart.books.length; i++) {
    books.push(
      <CartBookContainer
        key={i}
        book={cart.books[i]}
        navigation={navigation}
        deleteFromCart={deleteFromCart}
      />
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
          <Text style={styles.priceText}>{cart.total}$</Text>
        </View>

        <View style={styles.purchaseButtonWrapper}>
          <TouchableOpacity
            style={styles.purchaseButton}
            onPress={() =>
              navigation.push("Payment", {
                price: cart.total,
              })
            }
          >
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
  noBooksText: {
    color: colors.textColor,
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
  },
});
