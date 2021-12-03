import { EDIT} from './constants';

export const editUser = (accessData) => {  
    return { type: EDIT, data: accessData }
};