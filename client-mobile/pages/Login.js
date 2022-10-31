import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPassword,
  selectToken,
  selectUsername,
  setPassword,
  setUsername,
} from "../redux/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  return (
    <View style={styles.page}>
      <Text style={styles.text}>Hello this is login</Text>
      <Text style={styles.text}>{username}</Text>
      <Text style={styles.text}>{password}</Text>
      <View style={styles.inputBox}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(value) => dispatch(setUsername(value))}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(value) => dispatch(setPassword(value))}
        />
      </View>
      <Pressable style={styles.submit}>
        <Text style={styles.text}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  inputBox: {
    flexDirection: "column",
  },
  input: {
    margin: 10,
    height: 40,
    width: 200,
    borderWidth: 1,
  },
  submit: {
    borderWidth: 1,
    padding: 5,
  },
});
