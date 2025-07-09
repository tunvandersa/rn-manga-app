import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
import productSlice from './productSlice';

export const allReducers = combineReducers({
  product: productSlice,
  // thêm reducer khác vào đây
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // persist
  // whitelist: [
  //   'accountReducer'
  // ],
  //not persist
  blacklist: [
    // 'dict',
    // 'auth'
  ],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});