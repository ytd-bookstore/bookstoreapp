import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import colors from "../assets/colors/colors";

import LoginHeader from "../components/LoginHeader";
import FormTextInput from "../components/FormTextInput";
import FormButton from "../components/FormButton";

function login(mail, pswd) {
  console.log(mail);
  console.log(pswd);
}

export default function Login({ navigation }) {
  const [mail, onChangeMail] = React.useState("");
  const [pswd, onChangePswd] = React.useState("");
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
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: "HomeTabs",
                  },
                ],
              })
            }
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
