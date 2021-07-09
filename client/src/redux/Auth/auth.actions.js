import { LOGIN_SUCCESS, LOGIN_FAIL, INITIAL_STATE, FETCH_DETAIL } from "./auth.actions.types";
import * as api from "../api/index";

// export const fetchActions = ()=> async (dispatch, getState)=>{
//     dispatch({type: "INITIAL_STATE"});

//     try {
//         const response= await Axios.get();
//         dispatch({type:"LOGIN_SUCCESS"})
//     } catch (error) {
//         dispatch({type:"LOGIN_FAIL", error})
//     }
// }

export const login=() => async (dispatch)=>{
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