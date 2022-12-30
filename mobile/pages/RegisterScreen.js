import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";

import colors from "../assets/constants/colors";

import LoginHeader from "../components/LoginHeader";
import FormTextInput from "../components/FormTextInput";
import FormButton from "../components/FormButton";
import register from "../hooks/register";

import LoginLoading from "../components/LoginLoadingScreen";
import LoginRequestError from "../components/LoginRequestErrorScreen";

function registerUser(navigation, mail) {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: "LoginScreen",
        params: { mail: mail },
      },
    ],
  });
}

export default function Register({ navigation }) {
  const [buttonDisabled, setButtonDisable] = React.useState(true);

  const [userName, onChangeName] = React.useState("");
  const [surname, onChangeSurname] = React.useState("");
  const [mail, onChangeMail] = React.useState("");
  const [pswd, onChangePswd] = React.useState("");

  const { data, isSuccess, isLoading, isIdle, mutate } = register();

  const mutateRegister = (name, surname, email, password) => {
    mutate({ name, surname, email, password });
  };

  React.useEffect(() => {
    if (
      pswd.length >= 8 &&
      userName.length >= 3 &&
      surname.length >= 3 &&
      mail.length >= 5 &&
      mail.includes("@") &&
      mail.includes(".")
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [userName, mail, pswd, surname]);

  React.useEffect(() => {
    if (data && data.errors) {
      ToastAndroid.showWithGravity(
        data.errors[0],
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    } else if (isSuccess) {
      registerUser(navigation, mail);
    }
  }, [isSuccess]);

  if (isLoading && !isSuccess) {
    return <LoginLoading />;
  } else if (!isLoading && !isSuccess && !isIdle) {
    <LoginRequestError />;
  }

  return (
    <View style={styles.container}>
      <LoginHeader />
      <View style={styles.loginTextWrapper}>
        <Text style={styles.loginText}>Register</Text>
        <Text style={styles.infoText}>Please sign in to continue.</Text>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            paddingBottom: 10,
          }}
        >
          <FormTextInput
            icon={"person-outline"}
            placeholder={"Name"}
            value={userName}
            onChangeText={onChangeName}
          ></FormTextInput>
          <FormTextInput
            icon={"person-outline"}
            placeholder={"Surname"}
            value={surname}
            onChangeText={onChangeSurname}
          ></FormTextInput>
          <FormTextInput
            icon={"mail-outline"}
            placeholder={"Email"}
            value={mail}
            onChangeText={onChangeMail}
          ></FormTextInput>
          <FormTextInput
            icon={"lock-closed-outline"}
            placeholder={"Password"}
            value={pswd}
            secure={true}
            onChangeText={onChangePswd}
          ></FormTextInput>
          <FormButton
            title="Register"
            disabled={buttonDisabled}
            onPress={() => mutateRegister(userName, surname, mail, pswd)}
          ></FormButton>
        </ScrollView>
      </View>

      <KeyboardAvoidingView
        style={{
          height: 90,
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Text style={styles.footerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("LoginScreen")}>
          <Text style={styles.signUpText}> Login!</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  loginTextWrapper: {
    paddingHorizontal: 40,
    justifyContent: "flex-start",
    paddingBottom: 10,
  },
  loginText: {
    color: colors.loginColor,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 32,
  },
  infoText: {
    color: colors.textColor,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
  },
  footerText: {
    color: colors.black,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
  },
  signUpText: {
    color: colors.headerTextColor,
    fontFamily: "OpenSans-SemiBold",
    fontSize: 16,
  },
});
