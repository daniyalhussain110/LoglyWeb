import axiosInstance from "../../Api/AxiosCreate";
import ActionType from "../Constants/Type";
import { useHistory } from 'react-router-dom'
import { message } from "antd";
import history from "../../History/history";

export const userLogin = (dataAnimal) => async dispatch => {
   
    try {
        const res = axiosInstance.post('/user/login', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => {
            if(response.data.status === 200) {
                message.success(response.data.message)
                history.push('/welcome')
            } else {
                message.error(response.data.message)
            }
        })
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
        const res = axiosInstance.post('/user/breeder/register', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => {
            if(response.data.status === 200) {
                message.error(response.data.message)
                history.push('/')
             } else {
                message.error(response.data.message)
             }
        })
      
        dispatch({
            type: ActionType.REGISTER_USER,
            payload: res.data
        })

    } catch(err) {
        alert(err)
    }
}

export const userForgotPassword = (dataAnimal) => async dispatch => {
    try {
        const res = await axiosInstance.post('/user/forgetpassword', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => {
            if(response.data.status === 200) {
              message.success(response.data.message)      
            } else {
                message.error(response.data.message)
            }
        })
        dispatch({
            type: ActionType.FORGET_PASSWORD,
            payload: res.data
        })

    } catch(err) {
        alert(err)
    }
}