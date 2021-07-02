const initState={
  isAuth:null,
  err:null
}

const authReducer = (state=initState,action)=>{
  switch(action.type){
      case "INITIAL_STATE":
          return {
              ...state,
              err=null,
          }
      case "LOGIN_SUCCESS":
          return {
              ...state,
              isAuth=true,
              err=false,
          }
      case "LOGIN_FAIL":
          return {
              ...state,
              isAuth=false,
              err=action.error,
          } 
      default:
          return state;
  }
}

export default authReducer;