import { combineReducers } from '@reduxjs/toolkit';
import someReducer from './someSlice';

const rootReducer = combineReducers({
    some: someReducer,
});

export default rootReducer;