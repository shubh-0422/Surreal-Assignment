import { combineReducers } from 'redux';
import userReducers from './userReducer';

const rootReducer = combineReducers({
    userDetails: userReducers,
})

export default rootReducer;