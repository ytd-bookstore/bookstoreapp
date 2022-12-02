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

export default function Settings() {
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [city, setCity] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [address, setAddress] = React.useState("");

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
            placeHolder="Name"
            onChangeText={setName}
          />
          <SettingsTextInput
            width={160}
            height={60}
            placeHolder="Surname"
            onChangeText={setSurname}
          />
        </View>
        <SettingsTextInput
          width={350}
          height={60}
          placeHolder="Email"
          onChangeText={setEmail}
        />
        <SettingsTextInput
          width={350}
          height={60}
          placeHolder="Password"
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
            placeHolder="City"
            onChangeText={setCity}
          />
          <SettingsTextInput
            width={160}
            height={60}
            placeHolder="District"
            onChangeText={setDistrict}
          />
        </View>
        <SettingsTextInput
          width={350}
          height={60}
          placeHolder="Mobile Phone"
          onChangeText={setPhoneNumber}
        />
        <SettingsTextInput
          width={350}
          height={140}
          placeHolder="Address"
          onChangeText={setAddress}
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
