import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthForm from '../components/AuthForm';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const SignInScreen = ({ navigation }) => {
    const { state: { errorMessage }, signIn } = useContext(AuthContext);

    return(
        <View style={styles.container}>
            <Spacer space={30}>
                <AuthForm
                    type='Sign In'
                    headerText='Welcome to EText 👋'
                    onSwitch={() => {
                        navigation.navigate('SignUp');
                    }}
                    onSubmit={signIn}
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