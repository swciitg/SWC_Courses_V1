import React from 'react';
import { createStore,applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import authReducer from './auth.reducers';

const store=createStore(authReducer, applyMiddleware(thunk));

const ReduxAuth=()=>{
    return <Provider
            store={store}>
           </Provider>
}
export default ReduxAuth;