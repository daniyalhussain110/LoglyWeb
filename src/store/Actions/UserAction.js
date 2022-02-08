import axiosInstance from "../../Api/AxiosCreate";
import ActionType from "../Constants/Type";
import { message } from "antd";
import { history } from '../../App';
import url from "../../Path/UrlLocation";

export const userLogin = (dataAnimal) => async dispatch => {
   
    try {
        const res = await axiosInstance.post('/user/login', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => {
            if(response.data.status === 200) {
                // message.success(response.data.message)
                console.log('response -->', response.data)
                if(!response.data.setupWizardCompleted) {
                    window.location.href = `${url}/setupWizard`
                } 
                else {
                    window.location.href = `${url}/main`
                }
                return response.data
               
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
            console.log('response-->', response)
            if(response.data.status === 200) {
                message.success(response.data.message)
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
        const res = await axiosInstance.post('/user/forgetpassword2', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => {
            console.log(response.data.status , response.data.message)
            if(response.status === 200) {
                message.success(response.data.message)
                history.push('/forgotpassword')
            } else {
                message.error(response.data.message)
            }
            return response.data
        })
        dispatch({
            type: ActionType.FORGET_PASSWORD,
            payload: res
        })

    } catch(err) {
        alert(err)
     
    }
}

export const resendCodeVerification = (dataAnimal) => async dispatch => {
    try {
        const res = await axiosInstance.post('/user/resendCodeVerification', dataAnimal, {
            headers: {auth: localStorage.getItem('auth')}
        })
        .then(response => response.data)

        dispatch({
            type: ActionType.RESEND_CODE_VERIFICATION,
            payload: res.data    
        })
    } catch(err) {
        alert(err)
    }
}

export const resetForgetPasswordByCode = (dataAnimal) => async dispatch => {
    try {
        const res = await axiosInstance.post(`/user/verifyByCodePassword`, dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => {
            console.log(response)
            if(response.data.status === 200) {
                message.success(response.data.message)
                history.push('/resetpassword')
            } else {
                message.error(response.data.message)
            }
            return response.data
        })

        dispatch({
            type: ActionType.FORGOT_PASSWORD_CHANGE,
            payload: res.data
        })
    } catch(err) {
        alert(err)
    }
}



export const ChangePassword = (passwordStr, dataAnimal) => async dispatch => {
    try {
        const res = await axiosInstance.post(`/user/resetForgetPasswordByCode/${passwordStr}`, dataAnimal, {
          headers: {auth: localStorage.getItem('auth')}  
        }).then(response => response.data)

        dispatch({
            type: ActionType.PASSWORD_CHANGE,
            payload: res.data
        })
    } catch(err) {
        alert(err)
    }
}
