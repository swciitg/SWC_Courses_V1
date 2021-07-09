
import { LOGIN_SUCCESS, LOGIN_FAIL, INITIAL_STATE } from "./auth.actions.types";
import * as api from "../api/index";



// export const fetchActions = ()=> async (dispatch)=>{
//     try {
//         const { data } = await api.fetchUser();
//         dispatch({
//             type:LOGIN_SUCCESS,
//             payload:data.data,
//         })
//     } catch (error) {
//         dispatch({type:LOGIN_FAIL, error})
//     }
// }


export const Login = () => async (dispatch) =>{
    dispatch({type: INITIAL_STATE});
    try {
        const { data } = await api.fetchUser();
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.data,
        })
    } catch (error) {
        dispatch({type:LOGIN_FAIL, error})
    }
}
  
  export const Logout = () => {
    dispatch(
        setAlert({
          message: "User logged out successfully",
        })
      );
      dispatch({ type: LOGIN_FAIL });
  };

  
  