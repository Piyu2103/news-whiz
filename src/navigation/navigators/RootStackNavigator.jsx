import React from 'react'
import HomeStackNavigator from './HomeStackNavigator'
import { NavigationContainer } from '@react-navigation/native';
const RootStackNavigator = () => {
  return (
    <NavigationContainer>
        <HomeStackNavigator/>
    </NavigationContainer>
  )
}

export default RootStackNavigator