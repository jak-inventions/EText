import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';

const SignInScreen = () => {
    return(
        <View style={styles.container}>
            <Spacer space={30}>
                <AuthForm
                    headerText='Welcome to EText 👋'
                />
            </Spacer>
        </View>
    );
}


SignInScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    }
});

export default SignInScreen;