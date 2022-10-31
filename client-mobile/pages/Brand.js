import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export default function Brand() {
  // const token = useSelector(selectToken);

  useEffect(() => {
    // extract token from async storage
    // axois on getUserInfo
    // accordingly navigate
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Hello this is brand</Text>
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
