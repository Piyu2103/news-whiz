import {View, Text} from 'react-native';
import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import Splash from '../../screens/splash/components/Splash';
import Home from '../../screens/home/components/Home';

const HomeStackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
