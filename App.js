import { View, Text } from 'react-native'
import React from 'react'
import RootStackNavigator from './src/navigation/navigators/RootStackNavigator'
import store from './src/core/redux/store/store'

const App = () => {
  return (
    <Provider store={store}>
      <RootStackNavigator/>
    </Provider>
  )
}

export default App