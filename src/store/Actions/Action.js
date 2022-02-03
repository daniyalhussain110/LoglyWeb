import axiosInstance from '../../Api/AxiosCreate';
import ActionType from '../Constants/Type';

export const getStates = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/state/all')
        .then(response => response.data)
   
        dispatch({
            type: ActionType.GET_STATES,
            payload: res.data
        })
    }
    catch (error) {
        alert(error)
    }
   
}

export const getCities = (state) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/city/all?stateId=${state}`)
        .then(response => response.data)
   
        dispatch({
            type: ActionType.GET_CITIES,
            payload: res.data
        })
    }
    catch (error) {
        alert(error)
    }
   
}


export const getZipCode = (city) => async dispatch => {
    try {
        const res = await axiosInstance.get(`/zipcode/city/${city}`)
        .then(response => response.data)
        dispatch({
            type: ActionType.GET_ZIP_CODE,
            payload: res.data
        })
    }
    catch (error) {
        alert(error)
    }
   
}
