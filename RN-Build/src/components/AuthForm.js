import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ headerText }) => {
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
            <Button title='Sign In' />
            <Text style={style.subtext}>
                <Text>
                    Don't have an account?
                </Text>
                <TouchableOpacity>
                    <Text style={styles.link}>Sign up</Text>
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
        textAlign: 'center'
    },
    link: {
        color: 'blue',
        textDecorationLine: 'underline'
    }
});

export default AuthForm;