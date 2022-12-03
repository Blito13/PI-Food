import {combineReducers,compose,applyMiddleware, legacy_createStore} from "redux"
import thunk from "redux-thunk"

import rootR from '../Redux/reducers';

const reducer = combineReducers ({
    rootR,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore(){
   
    const store = legacy_createStore(rootR,composeEnhancers(applyMiddleware(thunk)))
    return store;
}
 