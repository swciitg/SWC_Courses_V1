import { LOGIN_SUCCESS, LOGIN_FAIL } from './auth.actions.types';

const authReducer = (state = { isAuthenticated: null }, action) => {
  if(action.type === LOGIN_SUCCESS)
    return state;

  if(action.type === LOGIN_FAIL)
    return state;

  return state;
};

export default authReducer;