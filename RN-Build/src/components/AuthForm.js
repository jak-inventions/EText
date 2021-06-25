import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ type, headerText, onSwitch, onSubmit }) => {
    return (
        <View style={styles.container}>
            
            <Spacer>
                <Text style={styles.header} h3>{headerText}</Text>
            </Spacer>
            <Input
                placeholder='Email'
                leftIcon={
                    <Spacer space={5}>
                        <Icon
                            name='envelope'
                            size={22}
                            color='lightgrey'
                        />
                    </Spacer>
                }
            />
            <Input
                placeholder='Password'
                leftIcon={
                    <Spacer space={5}>
                        <Icon
                            name='lock'
                            size={28}
                            color='lightgrey'
                        />
                    </Spacer>
                }
            />
            {
                type === 'Sign Up'
                    ? (
                        <Input
                            placeholder='Confirm Password'
                            leftIcon={
                                <Spacer space={5}>
                                    <Icon
                                        name='lock'
                                        size={28}
                                        color='lightgrey'
                                    />
                                </Spacer>
                            }
                        />
                    )
                    : null
            }
            <Button
                title={type}
                onPress={onSubmit}
            />
            <Text style={styles.subtext}>
                {
                    type === 'Sign In'
                        ? "Don't "
                        : type === 'Sign Up'
                            ? 'Already '
                            : ''
                }
                have an account?
                {"\n"}
                <TouchableOpacity onPress={onSwitch}>
                    <Text style={styles.link}>
                        {
                            type === 'Sign In'
                                ? 'Sign up'
                                : type === 'Sign Up'
                                    ? 'Sign in'
                                    : ''}
                    </Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 150
    },
    header: {
        textAlign: 'center'
    },
    subtext: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 18,
        marginTop: 15
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 18,
        marginTop: 10
    }
});

export default AuthForm;