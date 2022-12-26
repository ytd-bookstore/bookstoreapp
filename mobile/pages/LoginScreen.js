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

import * as SecureStore from "expo-secure-store";

import LoginHeader from "../components/LoginHeader";
import FormTextInput from "../components/FormTextInput";
import FormButton from "../components/FormButton";
import signIn from "../hooks/signIn";

function login(navigation) {
  navigation.reset({
    index: 0,
    routes: [
      {
        name: "HomeTabs",
      },
    ],
  });
}

export default function Login({ navigation, route }) {
  const [pageState, setPageState] = React.useState(false);
  const [buttonDisabled, setButtonDisable] = React.useState(true);

  const [mail, onChangeMail] = React.useState("");
  const [pswd, onChangePswd] = React.useState("");

  const { data, isSuccess, isLoading, isIdle, mutate } = signIn();

  const mutateSignIn = (email, password) => {
    mutate(
      { email, password },
      {
        onSuccess: async (value) => {
          if (value && !value.errors) {
            await SecureStore.setItemAsync("jwtToken", value);
            login(navigation);
          }
        },
      }
    );
  };

  React.useEffect(() => {
    if (
      pswd.length >= 8 &&
      mail.length >= 5 &&
      mail.includes("@") &&
      mail.includes(".")
    ) {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [mail, pswd]);

  React.useEffect(() => {
    if (!pageState && route.params) {
      ToastAndroid.showWithGravity(
        route.params.mail + " has registered!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );
    }
  }, [pageState]);

  React.useEffect(() => {
    if (data && data.errors) {
      ToastAndroid.showWithGravity(
        data.errors[0],
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  }, [isSuccess]);

  if (isLoading && !isSuccess) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else if (!isLoading && !isSuccess && !isIdle) {
    <View>
      <Text>Request Error...</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <LoginHeader />
      <View style={styles.loginTextWrapper}>
        <Text style={styles.loginText}>Login</Text>
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
            icon={"mail-outline"}
            placeholder={"Email"}
            onChangeText={onChangeMail}
          ></FormTextInput>
          <FormTextInput
            icon={"lock-closed-outline"}
            placeholder={"Password"}
            secure={true}
            onChangeText={onChangePswd}
          ></FormTextInput>
          <FormButton
            title="Login"
            disabled={buttonDisabled}
            onPress={() => mutateSignIn(mail, pswd)}
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
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.push("RegisterScreen")}>
          <Text style={styles.signUpText}> Sign Up!</Text>
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
