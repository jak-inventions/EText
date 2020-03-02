import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default function ConversationScreen() {
  return (
    <ScrollView style={styles.container}>

    </ScrollView>
  );
}

ConversationScreen.navigationOptions = {
  title: 'Conversations',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  contact: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  contactText: {
    fontSize: 15,
  }
});
