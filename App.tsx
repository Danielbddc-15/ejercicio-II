import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import JokesScreen from './src/screens/JokesScreen';
import WiFiScreen from './src/screens/WiFiScreen';
import LanguageProvider from './src/context/LanguageContext';
import './src/i18n/i18n';

const Tab = createBottomTabNavigator();

function App(): JSX.Element {
  return (
    <LanguageProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
            headerStyle: {
              backgroundColor: '#F8F8F8',
            },
            headerTintColor: '#000',
          }}>
          <Tab.Screen
            name="Login"
            component={LoginScreen}
            options={{
              tabBarLabel: 'Login',
              title: 'Login',
            }}
          />
          <Tab.Screen
            name="Jokes"
            component={JokesScreen}
            options={{
              tabBarLabel: 'Jokes',
              title: 'Chuck Norris Jokes',
            }}
          />
          <Tab.Screen
            name="WiFi"
            component={WiFiScreen}
            options={{
              tabBarLabel: 'WiFi',
              title: 'WiFi Scanner',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </LanguageProvider>
  );
}

export default App;