import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';

import { MonoText } from '../components/StyledText';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.HomeHeader}>EText</Text>
      <Text style={styles.HomeSubheader}>Formal yet efficient</Text>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
  },
  HomeHeader: {
    fontSize: 30,
    marginTop: 15,
  },
  HomeSubheader: {
    fontSize: 20,
    marginTop: 10,
  },
});
