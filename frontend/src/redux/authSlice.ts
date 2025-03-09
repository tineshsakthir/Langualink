import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userUuid: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  phoneNumber: string;
  country: string;
  dob: string;
  gender: string;
}

const initialState: UserState = {
  userUuid: "",
  firstName: "",
  lastName: "",
  nickName: "",
  email: "",
  phoneNumber: "",
  country: "",
  dob: "",
  gender: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
