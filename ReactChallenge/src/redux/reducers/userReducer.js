import { EDIT} from '../actions/constants';
import Data from './../../employee_data.json';
const initialState = Data.data

const user=(state = initialState, action) => {
    switch (action.type) {
        case EDIT:
            let newState=initialState.map((data)=>{
                if(action.data.id==data.id)
                    return action.data
                else
                    return data
            })
            return newState; 
   
        default:
            return state;
    }
}

export default user;