import { message } from 'antd';
import axiosInstance from '../../Api/AxiosCreate';
import ActionType from '../Constants/Type';

export const SubscriptionPacakgeType = () => async dispatch => {
    try {
        const res = await axiosInstance.get('/subscription/minimum', {
           headers: {user: localStorage.getItem('user')} 
        })
        .then((response) => {
            console.log(response.data.data)
           
            return response.data
        })
        
        dispatch({
            type: ActionType.SUBSCRIPTION_PACKAGE_TYPE,
            payload: res.data
        })
        
    } catch(err) {
        alert(err)
    }
}