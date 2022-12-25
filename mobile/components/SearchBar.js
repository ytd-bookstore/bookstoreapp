import * as React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Feather from "react-native-vector-icons/Feather";

import colors from "../assets/constants/colors";

export default function SearchBar(props) {
  const [searchedItem, setSearchItem] = React.useState("");
  return (
    <View overflow={"hidden"} paddingBottom={6}>
      <View style={styles.searchWrapper}>
        {/* Search Bar */}
        <View style={styles.inputTextWrapper}>
          <TextInput
            value={searchedItem}
            style={styles.textInput}
            cursorColor={colors.headerTextColor}
            onChangeText={setSearchItem}
            onSubmitEditing={() => {
              if (searchedItem.length > 2) {
                props.navigation.push("SearchResults", {
                  searchedItem: searchedItem,
                });
                setSearchItem("");
              }
            }}
          ></TextInput>
          <Feather
            name="search"
            size={34}
            color={colors.textColor}
            onPress={() => {
              if (searchedItem.length > 0) {
                props.navigation.navigate("SearchResults", {
                  searchedItem: searchedItem,
                });
                setSearchItem("");
              }
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    //borderWidth: 1,
    paddingVertical: 12,
    alignItems: "center",
    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
    backgroundColor: colors.background,
  },
  inputTextWrapper: {
    flexDirection: "row",
    width: 280,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 5,
    alignItems: "center",
    //Shadow
    shadowColor: colors.shadow,
    elevation: 10,
    backgroundColor: colors.background,
  },
  textInput: {
    flex: 1,
    height: 44,
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    borderRadius: 10,
  },
});
