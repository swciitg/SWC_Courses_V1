export const fetchActions = ()=> async (dispatch, getState)=>{
    dispatch({type: "INITIAL_STATE"});

    try {
        const response= await Axios.get();
        dispatch({type:"LOGIN_SUCCESS"})
    } catch (error) {
        dispatch({type:"LOGIN_FAIL", error})
    }
}