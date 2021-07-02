import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { setNavigator } from './src/navigationRef';
// Context
import { Provider as AuthProvider } from './src/context/AuthContext';
// Screens
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ConversationsScreen from './src/screens/ConversationsScreen';
import AccountScreen from './src/screens/AccountScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
// Icon Stuff
import { Feather } from '@expo/vector-icons';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
    ResetPasswordScreen: ResetPasswordScreen
  }),
  mainFlow: createBottomTabNavigator({
    conversationsFlow: {
      screen: createStackNavigator({
        Conversations: ConversationsScreen
      }),
      navigationOptions: {
        tabBarLabel: 'Conversations',
        tabBarIcon: (({ tintColor }) => (
          <Feather name='message-circle' color={tintColor} size={24} />
        ))
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: {
        tabBarLabel: 'Account',
        tabBarIcon: (({ tintColor }) => (
          <Feather name='user' color={tintColor} size={24} />
        ))
      }
    }
  })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </AuthProvider>
  );
};