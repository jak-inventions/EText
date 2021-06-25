import React from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';

const SignUpScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Spacer space={30}>
                <AuthForm
                    type='Sign Up'
                    headerText='Welcome aboard ⛵'
                    onSwitch={() => {
                        navigation.navigate('SignIn');
                    }}
                    onSubmit={() => {
                        // Sign Up
                    }}
                />
            </Spacer>
        </View>
    );
};

SignUpScreen.navigationOptions = () => {
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

export default SignUpScreen;