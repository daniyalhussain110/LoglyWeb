import ActionType from '../Constants/Type';

const initState = {
    accountType: [],
    type: {}
}

export default function(state = initState, action) {
    switch(action.type) {
        case ActionType.SUBSCRIPTION_PACKAGE_TYPE:
            return {...state, accountType: action.payload}
        default:
            return state
    }
}