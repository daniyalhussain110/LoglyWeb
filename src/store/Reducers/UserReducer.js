import ActionType from "../Constants/Type";

export default function(state = {}, action) {
    switch(action.type) {
        case ActionType.REGISTER_USER:
            return {...state, register: action.payload}
        case ActionType.LOGIN_USER:
            return {...state, loginsuccess: action.payload}
        case ActionType.FORGET_PASSWORD:
            return {...state, forgotpassword: action.payload}
        case ActionType.FORGOT_PASSWORD_CHANGE:
            return {...state, passwordchange: action.payload}
        case ActionType.FORGOT_PHONE_VERIFICATION:
            return {...state, forgotPhoneVerificationSuccess: action.payload}
        case ActionType.PASSWORD_CHANGE:
            return {...state, passwordChangeSuccess: action.payload}
        case ActionType.REGISTERATION_VERIFY_BY_CODE:
            return {...state, registrationSuccessCode: action.payload}
        default:
            return state
    }
}