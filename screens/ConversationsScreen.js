import React from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';

export default function ConversationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Contact name="Keanu Reeves" email="example@example.com" />
      <Contact name="Bob Ross" email="example@example.com" />
      <Contact name="Elon Musk" email="example@example.com" />
      <Contact name="Robby Rotten" email="example@example.com" />
    </ScrollView>
  );
}

class Contact extends React.Component{

  render(){
    return (
      <Touchable style={styles.contact} background={Touchable.Ripple('grey')} onPress={openConversation(this.props.email);}>
        <Text>
          <Text style={styles.contactHeader}>{this.props.name + "\n"}</Text>
          <Text style={styles.contactText}>{this.props.email}</Text>
        </Text>
      </Touchable>
    );
  };

}

function openConversation(email){



}

ConversationsScreen.navigationOptions = {
  title: 'Conversations',
  headerTitleStyle: {
    fontWeight: 'normal',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  contact: {
    backgroundColor: '#fdfdfd',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EDEDED',
  },
  contactHeader: {
    fontSize: 15,
  },
  contactText: {
    fontSize: 13,
    marginLeft: 5,
  }
});
