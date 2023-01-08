

/* export const store = createStore(
    rootR,
    composeWithDevTools(applyMiddleware(thunk))
    );

export default store;  */
import {combineReducers,compose,applyMiddleware, legacy_createStore} from "redux"
import thunk from "redux-thunk"
import rootR from "./reducers.js"

const reducer = combineReducers ({
    rootR,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore(){
    const store = legacy_createStore(rootR,composeEnhancers(applyMiddleware(thunk)))
    return store;
}
