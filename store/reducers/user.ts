import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState extends UserData {
  loading: boolean;
  loggedIn: boolean;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  balance: number;
}

const initialState: UserState = {
  loading: true,
  loggedIn: true,
  id: '1234-5678-9101',
  name: 'test',
  email: 'test@gmail.com',
  balance: 10,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<Partial<UserData>>) {
      return (state = { ...state, loading: false, ...action.payload });
    },
    logout(state) {
      return (state = { ...initialState, loading: false, loggedIn: false });
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
