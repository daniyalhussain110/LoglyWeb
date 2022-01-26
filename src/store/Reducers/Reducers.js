import ActionType from '../Constants/Type'

const initState = {
    cities: [],
    states: [],
    zipcodes: [],
    zipcode: {},
    stated: {},
    city: {}
}

export default function(state = initState, action) {
    switch(action.type) {
        case ActionType.GET_CITIES:
            return {...state, cities: action.payload}
        case ActionType.GET_STATES:
            return {...state, states: action.payload}
        case ActionType.GET_ZIP_CODE:
            return {...state, zipcodes: action.payload}
        default:
            return state
    }
}