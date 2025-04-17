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
  language: string;
  isActive: boolean;
  rating: number;
  starRating : number;
  totalCalls : number;
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
  language:"",
  isActive:true,
  rating: 0,
  starRating : 0,
  totalCalls : 0,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (initialState, action: PayloadAction<UserState>) => {
      Object.assign(initialState, action.payload);
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
