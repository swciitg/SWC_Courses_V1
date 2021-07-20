import { LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGOUT } from "./auth.actions.types";
const initState={
  isAuth:null,
  loading:null,
}

const authReducer = (state=initState ,action)=>{
  switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				loading: false,
				isAuth: true,
                user: action.payload.data
			};
		case LOGIN_FAIL:
			return {
				isAuth: false,
				loading: false,
			};
		case LOGOUT:
			return {
				loading: false,
				isAuth: false,
			};
		default:
			return state;
	}
}

export default authReducer;