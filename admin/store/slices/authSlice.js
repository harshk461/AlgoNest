import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  if (typeof window === "undefined") {
    return { user: null, isAuthenticated: false, role: "user" };
  }

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  return {
    user,
    isAuthenticated: !!token,
    role: user?.metadata?.role ?? "user",
  };
};


const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      state.user = user;
      state.isAuthenticated = true;
      state.role = user?.metadata?.role ?? "user";
    },
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null;
      state.isAuthenticated = false;
      state.role = "user";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
