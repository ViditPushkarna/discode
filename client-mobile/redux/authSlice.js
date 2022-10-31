import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "counter",
  initialState: {
    token: true,
    username: "",
    password: "",
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setToken, setUsername, setPassword } = authSlice.actions;

export const authenticate = (slug) => (dispatch) => {
  // setTimeout(() => {
  //   dispatch(incrementByAmount(amount))
  // }, 1000)
};

export const selectToken = (state) => state.auth.token;
export const selectUsername = (state) => state.auth.username;
export const selectPassword = (state) => state.auth.password;

export default authSlice.reducer;
