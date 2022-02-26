import React, { Component } from 'react';

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/loginScreen';
import SplashScreen from './src/splashScreen';
import MainScreen from './src/mainScreen';
import RegisterScreen from './src/registerScreen';

export default class App extends Component {
  Stack = createNativeStackNavigator();

  render() {
    return (
      <NavigationContainer>
        <this.Stack.Navigator 
          screenOptions={{
            headerShown: false
          }}
          initialRouteName="splashScreen">
          <this.Stack.Screen name="splashScreen" component={SplashScreen} />
          <this.Stack.Screen name="loginScreen" component={LoginScreen} />
          <this.Stack.Screen name="registerScreen" component={RegisterScreen} />
          <this.Stack.Screen name="mainScreen" component={MainScreen} />
        </this.Stack.Navigator>
      </NavigationContainer>
    )
  }
}