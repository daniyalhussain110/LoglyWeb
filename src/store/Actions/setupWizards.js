import axiosInstance from "../../Api/AxiosCreate";
import ActionType from "../Constants/Type";
import { message } from "antd";
import { history } from '../../App';
import url from "../../Path/UrlLocation";

export const allForm = async(data) => {
    console.log("sdhbjasb")
    let arr = JSON.parse(localStorage.getItem('userDetails'))
   console.log(arr.data.token,"sdabkasbd")
    try {
        const res = await axiosInstance.get('/form/all/forms', {
            headers: { auth:arr.data.token}
        })
        .then((response) => {
            console.log(response)
            if(response.status == 200){
                return response.data.data
            }
           
        })
        // dispatch({
        //     type: ActionType.ALL_FORMS,
        //     payload: res.data
        // })
        return res

    } catch(err) {
        alert(err)
    }
}

export const getTeamMember = async()=>{
    let arr = JSON.parse(localStorage.getItem('userDetails'))
    try{
        const res = await axiosInstance.get('/user/breeder/employees', {
            headers: { auth:'eyJhbGciOiJIUzI1NiJ9.NjA1ZGZlZWEyZmMyMGE1OGUwODI2MzI4.E4YUfJWkwtLYEzaoLJ7DYiFLRKmTw31ezMbzh1HleQs'}
            // headers:{auth:arr.data.token}
        })
        .then((response) => {
            console.log(response)
            if(response.status == 200){
                return response.data.data
            }
           
        })
        return res
    }catch(e){
        console.log(e)
    }
}

export const uploadProfileImage = async(data)=>{
    let arr = JSON.parse(localStorage.getItem('userDetails'))
    console.log(data,"sdabkasbd")
    try{
        const res = await axiosInstance.post('/user/v2/image/upload', data,{
            headers: { auth:arr.data.token}
        })
        .then((response) => {
            console.log(response)
            if(response.status == 200){
                return response.data.data
            }
           
        })
    }catch(e){
        console.log(e)
    }

}

export const uploadSetupWizard = async(data)=>{
    console.log(data)
    let arr = JSON.parse(localStorage.getItem('userDetails'))
    try{  const res = await axiosInstance.post('/user/v2/setupwizard', data,{
        headers: { auth:arr.data.token}
    })
    .then((response) => {
        console.log(response)
        if(response.status == 200){
            history.push('/main')
            return response.data
        }
       
    })
}catch(e){
    console.log(e)
}
}