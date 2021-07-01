import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState extends UserData {
  loading: boolean;
  loggedIn: boolean;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  balance: number;
  earned: number;
  spent: number;
  frozen: boolean;
  winnings: number;
  discord: boolean;
}

const initialState = {
  loading: true,
  loggedIn: false,
  id: '',
  email: '',
  name: '',
  balance: 0,
  earned: 0,
  spent: 0,
  frozen: false,
  winnings: 0,
  discord: false,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserData>) {
      return (state = { ...state, loading: false, loggedIn: true, ...action.payload });
    },
    setUser(state, action: PayloadAction<Partial<UserData>>) {
      return (state = { ...state, ...action.payload });
    },
    logout(state) {
      return (state = { ...initialState, loading: false, loggedIn: false });
    },
  },
});

export const { login, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
