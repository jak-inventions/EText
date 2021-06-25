import React from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';

const SignInScreen = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <Spacer space={30}>
                <AuthForm
                    type='Sign In'
                    headerText='Welcome to EText 👋'
                    onSwitch={() => {
                        navigation.navigate('SignUp');
                    }}
                    onSubmit={() => {
                        // Sign In
                    }}
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