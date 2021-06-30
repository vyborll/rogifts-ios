import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GiveawayState {
  loading: boolean;
  tabBarHeight: number;
  giveaways: GiveawayData[];
}

export interface GiveawayData {
  id: string;
  status: string;
  name: string;
  usersEntered: number;
  maxEntries: number;
  endAt: string;
  createdAt: string;
}

const initialState = {
  loading: true,
  tabBarHeight: 0,
  giveaways: [],
} as GiveawayState;

const giveawaySlice = createSlice({
  name: 'giveaway',
  initialState,
  reducers: {
    setTabHeight(state, action: PayloadAction<number>) {
      return (state = { ...state, tabBarHeight: action.payload });
    },
    setGiveaways(state, action: PayloadAction<GiveawayData[]>) {
      return (state = { ...state, loading: false, giveaways: action.payload });
    },
    setGiveaway(state, action: PayloadAction<GiveawayData>) {
      return (state = {
        ...state,
        giveaways: state.giveaways.map((giveaway) => (giveaway.id === action.payload.id ? { ...giveaway, ...action.payload } : giveaway)),
      });
    },
  },
});

export const { setTabHeight, setGiveaways, setGiveaway } = giveawaySlice.actions;
export default giveawaySlice.reducer;
