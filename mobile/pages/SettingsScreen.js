import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import colors from "../assets/constants/colors";

import Header from "../components/Header";
import SettingsTextInput from "../components/SettingsTextInput";

import RequestError from "../components/RequestErrorScreen";
import Loading from "../components/LoadingScreen";
import useUser from "../hooks/useUser";
import sendUserInformation from "../hooks/sendUserInformation";

export default function Settings() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [addressLine, setAddressLine] = React.useState("");

  const {
    data: user,
    isSuccess: isSuccessGet,
    isLoading: isLoadingGet,
    remove,
  } = useUser(1);

  const {
    data: userInfo,
    isLoading: isLoadingUpdate,
    isSuccess: isSuccessUpdate,
    mutate,
  } = sendUserInformation(1, { name, surname, email, password });

  const updateUserInfo = () => {
    mutate(1, { name, surname, email, password });
  };

  React.useEffect(() => {
    if (!isLoadingGet && isSuccessGet) {
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);
      setCity(user.address.city);
      setDistrict(user.address.district);
      setPhoneNumber(user.address.mobile);
      setAddressLine(user.address.address_line);
    }
  }, [isLoadingGet, isSuccessGet]);

  React.useEffect(() => {
    if (!isLoadingUpdate && isSuccessUpdate) {
      if (!isLoadingGet && isSuccessGet) {
        remove();
      }
      setName(userInfo.name);
      setSurname(userInfo.surname);
      setEmail(userInfo.email);
    }
  }, [isLoadingUpdate, isSuccessUpdate]);

  if (isLoadingGet && !isSuccessGet) {
    return <Loading />;
  } else if (!isLoadingGet && !isSuccessGet) {
    return <RequestError />;
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Settings</Text>
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
          <Text style={styles.informationText}>Personal Information</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <SettingsTextInput
            width={160}
            height={60}
            placeHolder={name}
            textName="Name"
            onChangeText={setName}
          />
          <SettingsTextInput
            width={160}
            height={60}
            placeHolder={surname}
            textName="Surname"
            onChangeText={setSurname}
          />
        </View>
        <SettingsTextInput
          width={350}
          height={60}
          placeHolder={email}
          textName="Email"
          onChangeText={setEmail}
        />
        <SettingsTextInput
          width={350}
          height={60}
          placeHolder={password}
          textName="Password"
          secure={true}
          onChangeText={setPassword}
        />
        <View style={styles.dividerLine} />
        <View style={styles.informationTextWrapper}>
          <Text style={styles.informationText}>Address Information</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <SettingsTextInput
            width={160}
            height={60}
            placeHolder={city}
            textName="City"
            onChangeText={setCity}
          />
          <SettingsTextInput
            width={160}
            height={60}
            placeHolder={district}
            textName="District"
            onChangeText={setDistrict}
          />
        </View>
        <SettingsTextInput
          width={350}
          height={60}
          placeHolder={phoneNumber}
          textName="Mobile Phone"
          onChangeText={setPhoneNumber}
        />
        <SettingsTextInput
          width={350}
          height={140}
          placeHolder={addressLine}
          textName="Address"
          onChangeText={setAddressLine}
        />
      </ScrollView>
      <View
        style={{
          width: Dimensions.get("screen").width,
          height: 60,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 360,
            height: 50,
            backgroundColor: colors.headerTextColor,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
          }}
          onPress={() => updateUserInfo()}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: "OpenSans-SemiBold",
              fontSize: 16,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
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
    marginHorizontal: 6,
    paddingTop: 4,
    alignSelf: "flex-start",
  },
  informationText: {
    fontFamily: "OpenSans-SemiBold",
    fontSize: 24,
    color: colors.textColor,
  },
  dividerLine: {
    borderWidth: 0.5,
    marginTop: 20,
    width: Dimensions.get("screen").width,
    borderColor: colors.textColor,
  },
});
