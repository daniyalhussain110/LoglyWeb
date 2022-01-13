import axios from "axios";
import PetTypes from "../Constants/PetConstants";

export const addteam = (team) => async dispatch => {
    try {
        const res = await axios.post("http://localhost:3001/team", team)
        dispatch({
            type: PetTypes.ADDPETS,
            payload: res.data
        })
    } catch(err) {
        alert(err)
    }
}

export const getteam = () => async dispatch => {
    try {
        const res = await axios.get("http://localhost:3001/team");
        dispatch({
            type: PetTypes.GETPETS,
            payload: res.data
        })

    } catch(err) {
        alert(err)
    }
}