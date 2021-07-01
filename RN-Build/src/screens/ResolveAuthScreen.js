// Check to see if user is signed in, & direct accordingly
import React, { useContext } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = ({ navigation }) => {
    const { checkSignedIn } = useContext(AuthContext);
    checkSignedIn();

    return (
        <></>
    );
};

export default ResolveAuthScreen;

