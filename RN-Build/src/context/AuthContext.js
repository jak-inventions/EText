import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from './createDataContext';
import etextApi from '../api/etext';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
    switch(action.type){
        case 'add_error':
            return { ...state, errorMessage: action.payload };
        case 'sign_in':
            return { ...state, token: action.payload, errorMessage: '' };
        case 'sign_out':
            return { ...state, token: null, errorMessage: '' };
        default:
            return state;
    }
};

const signIn = (dispatch) => async ({ email, password }) => {
    try{
        const response = await etextApi.post('/signin', { email, password });
        const token = response.data.token;
        dispatch({ type: 'sign_in', payload: token });
        navigate('mainFlow');
    }
    catch(err){
        dispatch({ type: 'add_error', payload: err });
    }
};

const signUp = (dispatch) => async ({ email, username, password, passwordConfirm }) => {
    if(password !== passwordConfirm){
        dispatch({ type: 'add_error', payload: 'Passwords must match' });
    }
    else{
        try{
            const response = await etextApi.post('/signup', { email, username, password });
            const token = response.data.token;
            dispatch({ type: 'sign_in', payload: token });
            navigate('mainFlow');
        }
        catch(err){            
            dispatch({ type: 'add_error', payload: `An error occurred: ${err}` });
        }
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, signUp, /*signout, clearErrorMessage, tryLocalSignin*/ },
    { /*isSignedIn: false, errorMessage: ''*/ }
);

