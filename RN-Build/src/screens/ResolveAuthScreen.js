// Check to see if user is signed in, & direct accordingly
import React, { useContext } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';

const ResolveAuthScreen = ({ navigation }) => {
    const { checkSignedIn } = useContext(AuthContext);
    checkSignedIn();

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ResolveAuthScreen;

