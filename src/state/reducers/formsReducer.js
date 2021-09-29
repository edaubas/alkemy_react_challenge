import { SIGN_IN } from '../constants';

const formsReducer = (state = {}, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: action.payload };
        default:
            return state;
    }
}

export default formsReducer;