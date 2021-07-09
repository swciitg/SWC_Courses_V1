import { createStore ,applyMiddleware  } from 'redux'
import  root from './index'
import thunk from 'redux-thunk'

const store = createStore(
    root,
    applyMiddleware(thunk)
)
export default store

// const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25});
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
