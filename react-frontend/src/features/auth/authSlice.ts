import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      const { user } = action.payload;
      state.user = user;

      // state.token = accessToken;
      const cookie = new Cookies();
      const accessToken = cookie.get("jwt-accessToken"); // brijem da ga ne možeš dohvatit zbog http cookija
      console.log(accessToken);
      state.token = accessToken;
      // cookie.set("accessToken", accessToken, { secure: true, httpOnly: true }); // ee možda zbog http onlyja??
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
