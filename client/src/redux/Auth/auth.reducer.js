import { LOGIN_SUCCESS, LOGIN_FAIL, INITIAL_STATE, FETCH_DETAIL } from "./auth.actions.types";

const initState={
  isAuth:null,
  err:null,
  loding:null,
  user_detail:[],
}

const authReducer = (state=initState,action)=>{
  switch(action.type){
      case INITIAL_STATE:
          return {
              ...state,
              loding=true,
              err=null,
          }
      case LOGIN_SUCCESS:
          return {
              loding=false,
              isAuth=true,
              err=false,
            }
      case FETCH_DETAIL:
            return {
                ...state,
                user_detail=action.payload,
            }      
      case LOGIN_FAIL:
          return {
              ...state,
              loding=false,
              isAuth=false,
              err=action.error,
          } 
      default:
          return state;
  }
}

export default authReducer;