import { LOGIN_FAIL , LOGIN_SUCCESS } from './auth.actions.types'

export const fetchActions = ()=> async (dispatch, getState)=>{
    dispatch({type: "INITIAL_STATE"});

    try {
        const response= await Axios.get();
        dispatch({type:"LOGIN_SUCCESS"})
    } catch (error) {
        dispatch({type:"LOGIN_FAIL", error})
    }
}


export const Login = (user) => {
    return {
      type: LOGIN_SUCCESS,
      payload: user
    };
  };
  
  export const Logout = () => {
    return {
      type: LOGIN_FAIL
    };
  };
  