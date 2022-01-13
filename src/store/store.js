import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './Reducers';

import thunk from 'redux-thunk';

const initState = {};
const store = createStore(
    rootReducer,
    initState,
    compose(
        applyMiddleware(thunk),
    )
);

export default store;
