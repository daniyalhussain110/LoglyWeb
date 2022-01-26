import axiosInstance from '../../Api/AxiosCreate';
import ActionType from '../Constants/Type';

export const getCities = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/api/city/all')
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


export const getStates = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/api/state/all')
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

export const getZipCode = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/api/zipcode')
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
