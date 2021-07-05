import { combineReducers } from "redux";
import authReducer from './Auth/auth.reducer'

export default combineReducers({
    auth: authReducer,
})