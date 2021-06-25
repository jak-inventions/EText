import createDataContext from './createDataContext';
import etextApi from '../api/etext';

const authReducer = (state, action) => {
    switch(action.type){
        default:
            return state;
    }
};

const signIn = (dispatch) => async ({ email, password }) => {
    try{
        const response = await etextApi.post('/signin', { email, password });
        console.log(response.data.token);
    }
    catch(err){
        console.log(err);
    }
};

const signUp = (dispatch) => async ({ email, username, password, passwordConfirm }) => {
    if(password !== passwordConfirm){
        console.log('passwords must match');
        //Return error message
    }
    else{
        try{
            const response = await etextApi.post('/signup', { email, username, password });
            console.log(response.data.token);
        }
        catch(err){
            console.log(err);
        }
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signIn, signUp, /*signout, clearErrorMessage, tryLocalSignin*/ },
    { /*isSignedIn: false, errorMessage: ''*/ }
);

