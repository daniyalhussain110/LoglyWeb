import { combineReducers } from 'redux';
import Reducers from './Reducers';
import userReducer from './UserReducer';

export default combineReducers({
    myCities: Reducers,
    myState: Reducers,
    myZipCode: Reducers,
    myUser: userReducer
})

