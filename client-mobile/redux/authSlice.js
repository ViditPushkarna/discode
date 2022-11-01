import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const authSlice = createSlice({
  name: "counter",
  initialState: {
    token: true,
    username: "",
    password: "",
    user: {
      name: "",
      email: "",
    },
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setToken, setUsername, setPassword, setUser } =
  authSlice.actions;

export const authenticate = (slug) => (dispatch) => {
  // setTimeout(() => {
  //   dispatch(incrementByAmount(amount))
  // }, 1000)
};

export const login = (lpassword, lemail) => async (dispatch) => {
  try {
    const req = {
      user_email: lemail,
      user_password: lpassword,
    };

    console.log("in login");

    const res = await axios.post(config.SERVER + "/user/login", req);

    if (res.data.success === false) throw Error("Error");

    console.log("in axios");

    const user = res.data.user;

    await AsyncStorage.setItem("user", user.email);

    // localStorage.setItem("user", user.email);

    dispatch(setUser(user));

    const token = res.data.token;
    // const storeToken = async () => {
    //   try {
    await AsyncStorage.setItem("token", token);
    //   } catch (e) {
    //     throw Error("Error");
    //     // saving error
    //   }
    // };
    // storeToken();
    // localStorage.setItem("token", token);
    console.log("done all");

    dispatch(setToken(token));
    return true;
  } catch (err) {
    return false;
  }
};

export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.username;
export const selectPassword = (state) => state.auth.password;

export default authSlice.reducer;
