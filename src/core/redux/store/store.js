import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { homeReducer } from './slice/home/index';

const store = createStore(homeReducer, applyMiddleware(thunk));
export const thunkDispatch = (store.dispatch);

export default store;