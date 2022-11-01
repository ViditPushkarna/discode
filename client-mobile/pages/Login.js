import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  selectPassword,
  selectToken,
  selectUsername,
  setPassword,
  setUsername,
} from "../redux/authSlice";

export default function Login({ navigation: { replace } }) {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);
  const password = useSelector(selectPassword);
  const token = useSelector(selectToken);
  const performLogin = async () => {
    console.log("hi 2");
    const blean = await dispatch(login(password, username));
    if (blean === true) {
      console.log(token);
      replace("Home");
    }
    console.log("hi 3");
  };
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
      <Pressable
        style={styles.submit}
        onPress={() => {
          performLogin();
        }}
      >
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
