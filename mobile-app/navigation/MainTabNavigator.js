import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ConversationsScreen from '../screens/ConversationsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ConversationScreen from '../screens/ConversationScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeStack.path = '';

const conversationsStack = createStackNavigator(
  {
    Links: ConversationsScreen,
  },
  config
);

conversationsStack.navigationOptions = {
  tabBarLabel: 'Conversations',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-text' : 'md-text'} />
  ),
};

conversationsStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

SettingsStack.path = '';

const ConversationStack = createStackNavigator(
  {
    Conversation: ConversationScreen,
  },
  config
);

ConversationStack.navigationOptions = {
  tabBarLabel: 'Conversation',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ConversationStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  conversationsStack,
  SettingsStack,
  ConversationStack,
});

tabNavigator.path = '';

export default tabNavigator;
