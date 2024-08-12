import {homeReducer} from './slice/home/index';
import {getDefaultMiddleware,configureStore,combineReducers} from '@reduxjs/toolkit';


const rootReducer = combineReducers({
  home: homeReducer,
  // other reducers can go here
});

const store = configureStore({ 
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false
    }),
  ]
});

export const thunkDispatch = store.dispatch;
export default store;
