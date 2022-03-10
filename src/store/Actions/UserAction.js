import axiosInstance from "../../Api/AxiosCreate";
import ActionType from "../Constants/Type";
import { message } from "antd";
import { history } from '../../App';
import url from "../../Path/UrlLocation";
import { useHistory } from "react-router-dom";

export const userLogin = (dataAnimal) => async dispatch => {
   
    try {
        const res = await axiosInstance.post('/user/login', dataAnimal, {
            headers: { user: localStorage.getItem('user')}
        })
        .then((response) => {
            console.log(response)
            if(response.status === 200) {
                message.success(response.data.message)
                console.log(response.data.data.user.setupWizardCompleted)
                localStorage.setItem('userDetails',JSON.stringify(response.data))
                if(!response.data.data.user.setupWizardCompleted){
                    console.log("setup wizard status", response.data.data.user.setupWizardCompleted)
                    if(response.data.data.user.packageType){
                        history.push('/businessaccount')
                    }else{
                        history.push("/petlover")
                    }
                }else{
                    history.push("/main")
                }
            } else {
                message.error(response.data.message)
            }
            return response.data
        })
        dispatch({
            type: ActionType.LOGIN_USER,
            payload: res.data
        })

    } catch(err) {
        alert(err)
    }
}


export const emailCheckRequest = (data1) => (dispatch) => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {

        // dispatch(EnableLoader());

        const res = axiosInstance.post(`/user/emailCheck`,
            {
                email: data1,
            }
        )
            .then(response => {

                console.log("response-->", response);

                // dispatch(DisableLoader());
                if (response.data.status === 200) {
                    resolve(true)   
                    message.success(response.data.message);
                }
                else {
                        message.error(response.data.message);
                }
                

            })
            .catch(error => {

                console.log("response error-->", error.message);
                message.error(error.message);
                // dispatch(DisableLoader());
                // setTimeout(() => {
                //     utils.topAlertError(error.message);
                // }, timeOut);
            });
    });
}

export const userRegister = (data1) => (dispatch) => {

    
    console.log("fields-->", data1);
    return new Promise((resolve) => {

        let userSignUpData = {
            zipcode:data1.zipcode,
            city:data1.city,
            email:data1.email,
            name:data1.name,
            password: data1.password,
            phone:data1.phone,
            state:data1.state,
            packageId:data1.packageId,
            packageType:data1.packageType,
            businessName:data1.businessName ? data1.businessName : "",
            noOfEmployees:data1.noOfEmployees ? data1.noOfEmployees : "",
            website:data1.website ? data1.website : "",
            mobile:true,
        }

        var formData = new FormData();
        
       

        for (const property in userSignUpData) {
            formData.append(property,userSignUpData[property]);
          }
          for (var key of formData.entries()) {
        	console.log("formdata-->",key)
		}

        axiosInstance.post(`/user/breeder/register`,formData)
            .then(response => {

                console.log("response-->", response);

                if (response.data.status === 200) {
                    dispatch({
                                    type: ActionType.REGISTER_USER,
                                    payload: response.data
                                })
                    resolve({
                        type: ActionType.REGISTER_USER,
                        payload: response.data
                    })
                    message.success(response.data.message);
                    history.push("/verification")
                }
                else {
                    message.error(response.data.message);
                }

            })
            .catch(error => {

                console.log("response error-->", error.message);
                alert(error.message)

            });
    });
}

// export const userRegister = (dataAnimal) => async dispatch => {
//     console.log(JSON.parse(dataAnimal))
//     try {
//         const res = axiosInstance.post('/user/breeder/register',JSON.parse(dataAnimal), {
//             headers: { user: localStorage.getItem('user')}
//         })
//         .then((response) => {
//             console.log('response-->', response)
//             if(response.data.status === 200) {
//                 message.success(response.data.message)
//                 history.push("/verification")
//                 console.log(response.data.data)
//              } else {
//                 message.error(response.data.message)
//              }
//         })
      
//         dispatch({
//             type: ActionType.REGISTER_USER,
//             payload: res.data
//         })

//     } catch(err) {
//         alert(err)
//     }
// }

export const userForgotPassword = (dataAnimal) => async dispatch => {
    try {
        const res = await axiosInstance.post('/user/forgetpassword2', dataAnimal, {
            headers: { auth: localStorage.getItem('auth')}
        })
        .then((response) => {
            if(response.status === 200) {
                message.success(response.data.message)
                 history.push('/forgotpassword', {...dataAnimal , phone: response.data.data.phone})
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
        .then(response => {
            if(response.data.status === 200){
                message.success(response.data.message)
                history.push('/otp', {dataAnimal})
            } else {
                message.error(response.data.message)
            }
            return response.data
        })
       
        dispatch({
            type: ActionType.RESEND_CODE_VERIFICATION,
            payload: res.data    
        })
    } catch(err) {
        alert(err)
    }
}

export const forgotPhoneVerification = (dataAnimal) => async dispatch => {
    try {
        const res = await axiosInstance.post('/user/forgetpasswordphone', dataAnimal, {
            headers: {auth: localStorage.getItem('auth')}
        })
        .then(response => {
            if(response.data.status === 200){
                message.success(response.data.message)
                history.push('/otp', {dataAnimal})
            } else {
                message.error(response.data.message)
            }
            return response.data
        })
       
        dispatch({
            type: ActionType.FORGOT_PHONE_VERIFICATION,
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
                history.push('/resetpassword', {dataAnimal})
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



export const ChangePassword = (dataAnimal) => async dispatch => {
    try {
        const res = await axiosInstance.post(`/user/resetForgetPasswordByCode`, dataAnimal, {
          headers: {auth: localStorage.getItem('auth')}  
        }).then(response =>  {
            if(response.data.status === 200) {
                message.success(response.data.message)
                history.push('/successpassword')
            } else {
                message.error(response.data.message)
            }
            return response.data
        })

        dispatch({
            type: ActionType.PASSWORD_CHANGE,
            payload: res.data
        })
    } catch(err) {
        alert(err)
    }
}

export const ResendVerifyByCode = (dataAnimal) => async dispatch => {
    console.log(dataAnimal)
    try {
        const res = await axiosInstance.post('/user/verifyByCode', dataAnimal, {
            headers: {auth: localStorage.getItem('auth')}

        }).then(response => {
            if(response.data.status === 200) {
                message.success(response.data.message)
                history.push('/creditcard')
            } else {
                message.error(response.data.message)
            }
            return response.data
        })
    } catch(err) {
        alert(err)
    }
}


export const userVerifyCode = (data1) => dispatch => {

    console.log("fields-->", data1);

    return new Promise((resolve) => {


        axiosInstance.post(`/user/verifySmsMobile`,
           data1
        )
            .then(response => {

                console.log("response-->", response.data.data);

                if (response.data.status === 200) {
                    resolve(true);
                    message.success(response.data.message)
                    if(response.data.data.packageType == "Business"){
                        history.push('/creditcard')
                    }else{
                        history.push('/thankyou')
                    }
                }
                else {
                    message.error(response.data.message)

                }

            })
            .catch(error => {

                console.log("response error-->", error.message);
                message.error(error.message)
            });
    });
};