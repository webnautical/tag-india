import { configureStore, combineReducers, createAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TagIndiaAPI } from './../api/TagIndiaAPI';
import { TapAPI } from './../api/TapAPI';

export const resetAllState = createAction('RESET_ALL');

const appReducer = combineReducers({
  [TagIndiaAPI.reducerPath]: TagIndiaAPI.reducer,
  [TapAPI.reducerPath]: TapAPI.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetAllState.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(TagIndiaAPI.middleware)
      .concat(TapAPI.middleware),
});

setupListeners(store.dispatch);