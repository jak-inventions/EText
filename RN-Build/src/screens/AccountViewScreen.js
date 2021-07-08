import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, Divider } from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as AuthContext } from '../context/AuthContext';

const AccountViewScreen = ({ navigation }) => {
    const { state: { user }, signOut, getUserInfo } = useContext(AuthContext);
    getUserInfo();

    return(
        <SafeAreaView style={styles.container}>
            <Spacer>
                <Text h2Style={styles.standardText} h2>Account Information</Text>
                <Divider orientation="horizontal" />
                <Text h3Style={styles.standardText} h3>{user.username || 'Loading'}</Text>
                <Text h4Style={styles.standardText} h4>{user.email || 'Loading'}</Text>
                <Spacer>
                    <Button
                        title='Edit Account'
                        onPress={() => navigation.navigate('AccountEdit')}
                    />
                </Spacer>
                <Spacer>
                    <Button
                        title='Logout'
                        onPress={signOut}
                    />
                </Spacer>
            </Spacer>
        </SafeAreaView>
    );
};

AccountViewScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    standardText: {
        fontWeight: 'normal'
    }
});

export default AccountViewScreen;