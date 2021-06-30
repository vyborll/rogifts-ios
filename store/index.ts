import { configureStore } from '@reduxjs/toolkit';

import giveawayReducer from './reducers/giveaway';
import userReducer from './reducers/user';

export const store = configureStore({
  reducer: {
    giveaway: giveawayReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
