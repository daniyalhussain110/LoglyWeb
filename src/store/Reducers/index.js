import { combineReducers } from 'redux';
import PetReducers from './PetReducers';

export default combineReducers({
    myPets: PetReducers
})