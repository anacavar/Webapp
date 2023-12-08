import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      const { user } = action.payload;
      state.user = user;
      const cookie = new Cookies();
      const accessToken = cookie.get("jwt-accessToken"); // brijem da ga ne možeš dohvatit zbog http cookija
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
