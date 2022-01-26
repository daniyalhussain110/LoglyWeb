import ActionType from "../Constants/Type";

export default function(state = {}, action) {
    switch(action.type) {
        case ActionType.REGISTER_USER:
            return {...state, register: action.payload}
        case ActionType.LOGIN_USER:
            return {...state, loginsuccess: action.payload}
        default:
            return state
    }
}