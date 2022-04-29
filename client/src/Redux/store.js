import { createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootR from '../Redux/reducers';

export const store = createStore(
    rootR,
    composeWithDevTools(applyMiddleware(thunk))
    );

export default store; 