import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../components/Spacer';

const ConversationsScreen = () => {
    return(
        <SafeAreaView style={StyleSheet.container}>
            <Spacer>
                <Text h2Style={styles.headerText} h2>Conversations</Text>
            </Spacer>
        </SafeAreaView>
    );
};

ConversationsScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerText: {
        fontWeight: 'normal'
    }
});

export default ConversationsScreen;