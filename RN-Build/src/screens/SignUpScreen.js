import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignUpScreen = ({ navigation }) => {
    const { signUp } = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Spacer space={30}>
                <AuthForm
                    type='Sign Up'
                    headerText='Welcome Aboard ⛵'
                    onSwitch={() => {
                        navigation.navigate('SignIn');
                    }}
                    onSubmit={signUp}
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