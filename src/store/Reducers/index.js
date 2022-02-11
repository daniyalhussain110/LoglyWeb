import { combineReducers } from 'redux';
import Reducers from './Reducers';
import userReducer from './UserReducer';
import SubscriptionReducer from './SubscriptionReducer';

export default combineReducers({
    myCities: Reducers,
    myState: Reducers,
    myZipCode: Reducers,
    myUser: userReducer,
    mySubscription: SubscriptionReducer
})

