import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Brand({ navigation: { replace } }) {
  // const token = useSelector(selectToken);
  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          replace("Home");
        } else {
          replace("Login");
        }
      } catch (e) {
        console.log("not cool man");
        // replace("Login");
      }
    };
    getData();
    // extract token from async storage
    // accordingly navigate
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Hello this is brand </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
