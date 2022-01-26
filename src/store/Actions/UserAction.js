import axiosInstance from "../../Api/AxiosCreate";
import ActionType from "../Constants/Type";

export const userLogin = (dataAnimal) => async dispatch => {
    try {
        const res = axiosInstance.post('/api/user/login', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => response.data)

        dispatch({
            type: ActionType.LOGIN_USER,
            payload: res.data
        })

    } catch(err) {
        alert(err)
    }
}

export const userRegister = (dataAnimal) => async dispatch => {
    try {
        const res = axiosInstance.post('/api/user/employee/register', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => response.data)

        dispatch({
            type: ActionType.REGISTER_USER,
            payload: res.data
        })

    } catch(err) {
        alert(err)
    }
}