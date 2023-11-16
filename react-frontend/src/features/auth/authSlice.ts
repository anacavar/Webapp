import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
      const cookie = new Cookies();
      cookie.set("accessToken", accessToken, { secure: true, httpOnly: true }); // ee možda zbog http onlyja??
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      const navigate = useNavigate();
      navigate("/");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
