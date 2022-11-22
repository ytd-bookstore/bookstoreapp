import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "react-query";

import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

Ionicons.loadFont();
MaterialIcons.loadFont();
Feather.loadFont();

const queryClient = new QueryClient();

import MainContainer from "./components/MainContainer";

export default function App() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-SemiBold": require("./assets/fonts/OpenSans-SemiBold.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <MainContainer />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
