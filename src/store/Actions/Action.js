import axiosInstance from '../../Api/AxiosCreate';
import ActionType from '../Constants/Type';

export const getStates = () =>  dispatch => {
    return new Promise((resolve)=>{
        try {
        axiosInstance.get('/state/all')
        .then(response => {
            console.log("response--->",response)
            resolve(response.data.data)
        })
   
        // dispatch({
        //     type: ActionType.GET_STATES,
        //     payload: res.data
        // })
    }
    catch (error) {
        alert(error)
    }
});
   
}

export const getCities = (state) =>  dispatch => {
   
    return new Promise((resolve)=>{
    try {
        axiosInstance.get(`/city/all?stateId=${state}`)
        .then(response => {
            console.log("response--->",response)
            resolve(response.data.data)
        })
   
        // dispatch({
        //     type: ActionType.GET_CITIES,
        //     payload: res.data
        // })
    }
    catch (error) {
        alert(error)
    }
});
   
}


export const getZipCode = (city) => dispatch => {
    return new Promise((resolve) => {
    try {
        axiosInstance.get(`/zipcode/city/${city}`)
        .then(response => {
            console.log("response--->",response)
            resolve(response.data.data)
        })
        // dispatch({
        //     type: ActionType.GET_ZIP_CODE,
        //     payload: res.data
        // })
    }
    catch (error) {
        alert(error)
    }
})
}

