import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";

import { StackActions } from "@react-navigation/native";

import colors from "../assets/constants/colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Header from "../components/Header";
import PaymentTextInput from "../components/PaymentTextInput";
import checkout from "../hooks/checkout";

import Loading from "../components/LoadingScreen";
import RequestError from "../components/RequestErrorScreen";

import { useIsFocused } from "@react-navigation/core";

export default function Payment({ route, navigation }) {
  const isFocused = useIsFocused();
  const [pageState, setPageState] = React.useState(false);

  React.useEffect(() => {
    if (isFocused && pageState) {
      navigation.dispatch(StackActions.popToTop());
    }
    setPageState(true);
  }, [isFocused]);

  const goToOrders = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate("Profile", {
      screen: "OrdersScreen",
      initial: false,
    });
  };
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [month, setMonth] = React.useState("");
  const [year, setYear] = React.useState("");
  const [cvv, setCVV] = React.useState("");
  const [checked, setChecked] = React.useState(false);

  const { isSuccess, isLoading, isIdle, mutate } = checkout();

  const mutateCheckout = (information) => {
    mutate({ userId: 1, information });
  };

  const checkInfo = () => {
    if (
      name.length > 0 &&
      surname.length > 0 &&
      cardNumber.length === 16 &&
      cvv.length === 3 &&
      month.length > 0 &&
      year.length === 4 &&
      checked
    ) {
      mutateCheckout({
        name,
        surname,
        cardNumber,
        cvv,
        month,
        year,
      });
      /*
       */
    } else {
      Alert.alert(
        "Invalid Information",
        "Please give valid card information.",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  };

  const onChangeCardNumber = (text) => {
    setCardNumber(text.replace(/[^0-9]/g, ""));
  };

  const onChangeMonth = (text) => {
    text = text.replace(/[^0-9]/g, "");
    var number = Number(text);
    if (number > 12 || number < 1) {
      setMonth("");
    } else {
      setMonth(text);
    }
  };
  const onChangeYear = (text) => {
    text = text.replace(/[^0-9]/g, "");
    var number = Number(text);
    if (text.length == 4 && (number > 2030 || number < 2022)) {
      setYear("");
    } else {
      setYear(text);
    }
  };
  const onChangeCVV = (text) => {
    setCVV(text.replace(/[^0-9]/g, ""));
  };

  if (isLoading && !isSuccess) {
    return <Loading />;
  } else if (!isLoading && !isSuccess && !isIdle) {
    return <RequestError />;
  } else if (!isLoading && isSuccess && !isIdle && isFocused) {
    Alert.alert("Information", "Order is completed", [
      {
        text: "OK",
        onPress: () => goToOrders(),
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Payment</Text>
      </View>
      <ScrollView
        overScrollMode={"never"}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 16,
          paddingHorizontal: 10,
        }}
      >
        <View style={styles.informationTextWrapper}>
          <Text style={styles.informationText}>Card Information</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <PaymentTextInput
            width={160}
            height={60}
            placeHolder="Name"
            onChangeText={setName}
            marginHorizontal={15}
            marginTop={10}
            value={name}
          />
          <PaymentTextInput
            width={160}
            height={60}
            placeHolder="Surname"
            onChangeText={setSurname}
            marginHorizontal={15}
            marginTop={10}
            value={surname}
          />
        </View>
        <PaymentTextInput
          width={350}
          height={60}
          placeHolder="Card Number"
          onChangeText={onChangeCardNumber}
          marginHorizontal={15}
          marginTop={10}
          keyboardType="numeric"
          maxLength={16}
          value={cardNumber}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={styles.expirationText}>Expiration Date</Text>
          <View style={{ flexDirection: "row", marginVertical: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <PaymentTextInput
                width={90}
                height={60}
                placeHolder="Month"
                onChangeText={onChangeMonth}
                keyboardType="numeric"
                maxLength={2}
                value={month}
              />
              <PaymentTextInput
                width={90}
                height={60}
                placeHolder="Year"
                onChangeText={onChangeYear}
                marginHorizontal={10}
                keyboardType="numeric"
                maxLength={4}
                value={year}
              />
            </View>
            <View style={{ marginLeft: 55 }}>
              <PaymentTextInput
                width={90}
                height={60}
                placeHolder="CVV"
                onChangeText={onChangeCVV}
                marginHorizontal={0}
                keyboardType="numeric"
                maxLength={3}
                value={cvv}
              />
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setChecked(!checked)}>
            <MaterialIcons
              name={checked ? "check-box" : "check-box-outline-blank"}
              size={25}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I have carefully read and agree to the terms and conditions.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.checkoutWrapper}>
        <View style={styles.priceTextWrapper}>
          <Text style={styles.priceText}>{route.params.price}$</Text>
        </View>

        <View style={styles.checkoutButtonWrapper}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => checkInfo()}
          >
            <Text style={styles.checkoutButtonText}>Checkout</Text>
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
    //height: 60,
    paddingLeft: 16,
    paddingTop: 8,
  },
  headerText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 32,
    color: colors.textColor,
  },
  informationTextWrapper: {
    marginHorizontal: 8,
    paddingTop: 8,
    alignSelf: "flex-start",
  },
  informationText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
    color: colors.textColor,
  },
  expirationText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 12,
    color: colors.black,
  },
  icon: {
    marginTop: 15,
    color: colors.headerTextColor,
  },
  termsText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 14,
    color: colors.textColor,
    marginTop: 10,
    width: 320,
    marginLeft: 5,
  },
  checkoutWrapper: {
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
  checkoutButtonWrapper: {
    flex: 3,
    padding: 10,
  },
  checkoutButton: {
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.headerTextColor,
  },
  checkoutButtonText: {
    color: colors.background,
    fontSize: 16,
    fontFamily: "OpenSans-SemiBold",
  },
});
