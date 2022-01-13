import PetTypes from "../Constants/PetConstants";

const initState = {
    teams: [],
    team: {}
}

export default function(state = initState, action) {
    switch(action.type) {
        case PetTypes.GETPETS :
            return {
                ...state,
                teams: action.payload
            }
        case PetTypes.ADDPETS :
            return {
                ...state,
                teams: [action.payload, ...state.teams]
            }
        
        default: {
            return state;
        }
    }
}