import { styleSheets } from 'min-document';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Divider } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = () => {
    const { signOut } = useContext(AuthContext);

    return(
        <SafeAreaView style={styles.container}>
            <Spacer>
                <Text h2Style={styles.standardText} h2>Account Information</Text>
                <Divider orientation="horizontal" />
                <Text h2Style={styles.standardText} h2>Username</Text>
                <Text h3Style={styles.standardText} h3>Email</Text>
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
    standardText: {
        fontWeight: 'normal'
    }
});

export default AccountScreen;