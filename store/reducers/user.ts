import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState extends UserData {
  loading: boolean;
  loggedIn: boolean;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  loading: true,
  loggedIn: false,
  id: '1234-5678-9101',
  name: 'test',
  email: 'test@gmail.com',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state = { ...state, loading: false, ...action.payload };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
