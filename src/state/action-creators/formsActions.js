import { SIGN_IN } from '../constants';

export const signInSubmit = (token) => {
    return (dispatch) => {
        dispatch({
            type: SIGN_IN,
            payload: token
        })
    }
}