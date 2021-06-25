import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ type, headerText, onSwitch, onSubmit }) => {
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirm, setPasswordConfirm] = useState(null);

    return (
        <View style={{marginBottom: type === 'Sign In' ? 150 : 100}}>
            <Spacer>
                <Text h3Style={styles.header} h3>{headerText}</Text>
            </Spacer>
            <Input
                placeholder='Email'
                onChangeText={setEmail}
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
            {
                type === 'Sign Up'
                    ? (
                        <Input
                            placeholder='Username'
                            onChangeText={setUsername}
                            leftIcon={
                                <Spacer space={5}>
                                    <Icon
                                        name='user'
                                        size={28}
                                        color='lightgrey'
                                    />
                                </Spacer>
                            }
                        />
                    )
                    : null
            }
            <Input
                placeholder='Password'
                onChangeText={setPassword}
                leftIcon={
                    <Spacer space={5}>
                        <Icon
                            name='lock'
                            size={28}
                            color='lightgrey'
                        />
                    </Spacer>
                }
                secureTextEntry={true}
            />
            {
                type === 'Sign Up'
                    ? (
                        <Input
                            placeholder='Confirm Password'
                            onChangeText={setPasswordConfirm}
                            leftIcon={
                                <Spacer space={5}>
                                    <Icon
                                        name='lock'
                                        size={28}
                                        color='lightgrey'
                                    />
                                </Spacer>
                            }
                            secureTextEntry={true}
                        />
                    )
                    : type === 'Sign In'
                        ? (
                            /*<TouchableOpacity>
                                <Spacer>
                                    <Text style={styles.forgotPassword}>ForgotPassword</Text>
                                </Spacer>
                            </TouchableOpacity>*/
                            null
                        )
                        : null
            }
            <Button
                title={type}
                onPress={() => onSubmit({ email, username, password, passwordConfirm })}
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
                    <Text style={styles.switchPage}>
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
    header: {
        textAlign: 'center',
        fontWeight: 'normal'
    },
    subtext: {
        marginTop: 15,
        textAlign: 'center',
        fontSize: 18,
        marginTop: 15
    },
    forgotPassword: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 18
    },
    switchPage: {
        color: 'blue',
        textDecorationLine: 'underline',
        fontSize: 18,
        marginTop: 10
    }
});

export default AuthForm;