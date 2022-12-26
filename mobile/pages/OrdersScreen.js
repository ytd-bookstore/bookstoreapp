import * as React from "react";
import { Text, View, StyleSheet, StatusBar, ScrollView } from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import OrderContainer from "../components/OrderContainer";
import useOrders from "../hooks/useOrders";

import Loading from "../components/LoadingScreen";
import RequestError from "../components/RequestErrorScreen";

import { useIsFocused } from "@react-navigation/core";

export default function Orders({ navigation }) {
  const isFocused = useIsFocused();
  const [pageState, setPageState] = React.useState(false);

  const { data: ordersData, isSuccess, isLoading } = useOrders(pageState, 1);

  React.useEffect(() => {
    if (isFocused) {
      setPageState(!pageState);
    }
  }, [isFocused]);

  if (isLoading && !isSuccess) {
    return <Loading />;
  } else if (!isLoading && !isSuccess) {
    return <RequestError />;
  }

  if (ordersData.length === 0) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.headerWrapper}>
          <Text style={styles.headerText}>My Orders</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.noOrdersText}>
            You don't have any orders right now. You can order books from your
            cart.
          </Text>
        </View>
      </View>
    );
  }

  var orders = [];

  for (let i = 0; i < ordersData.length; i++) {
    orders.push(
      <OrderContainer key={i} order={ordersData[i]} navigation={navigation} />
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
  noOrdersText: {
    color: colors.textColor,
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
  },
});
