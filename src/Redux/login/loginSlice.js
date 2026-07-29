import { createSlice } from "@reduxjs/toolkit";
import { loginService } from "./loginService";

const initialState = {
    user: JSON.parse(localStorage.getItem('apresvee_user')) || null,
    loader: false,
    error: null,
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      logout: (state) => {
            state.user = null;
            localStorage.removeItem('apresvee_user');
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginService.pending, (state) => {
            state.loader = true;
            state.error = null;
          })
          .addCase(loginService.fulfilled, (state, action) => {
            state.loader = false;
            state.user = action.payload;
            const user = action.payload.user;
            localStorage.setItem('apresvee_user', JSON.stringify(action.payload));
          })
          .addCase(loginService.rejected, (state, action) => {
            state.loader = false;
            state.error = action.payload;
          });
      },


});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;