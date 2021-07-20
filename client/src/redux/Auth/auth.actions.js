import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGOUT } from "./auth.actions.types";
import * as api from "../../api/index";
import { useDispatch } from "react-redux";

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

export const Login = () => async (dispatch) => {
	dispatch({ type: LOGIN_REQUEST });
	try {
		const { data } = await api.loginUser();
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.data,
    });
    alert("Login success!");
    console.log("Data returned", data);
	} catch (error) {
		dispatch({ type: LOGIN_FAIL });
		alert(error.message);
	}
};

export const Logout = () => {
  const dispatch = useDispatch();
	// dispatch(
    // 	setAlert({
      // 		message: "User logged out successfully",
      // 	})
      // );
  dispatch({ type: LOGOUT });
  alert('Logged out');
};
