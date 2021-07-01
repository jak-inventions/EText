import React, { useContext } from 'react';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signOut } = useContext(AuthContext);

    return(
        <>
            <Text>Account Screen</Text>
            <Button
                title='Logout'
                onPress={signOut}
            />
        </>
    );
};

export default AccountScreen;