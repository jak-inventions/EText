import { styleSheets } from 'min-document';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button } from 'react-native-elements';
import { Context as AuthContext } from '../context/AuthContext';
import Spacer from '../components/Spacer';

const AccountScreen = () => {
    const { signOut } = useContext(AuthContext);

    return(
        <SafeAreaView style={styles.container}>
            <Spacer>
                <Text h1Style={styles.headerText} h1>Account Screen</Text>
                <Button
                    title='Logout'
                    onPress={signOut}
                />
            </Spacer>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontWeight: 'normal'
    }
});

export default AccountScreen;