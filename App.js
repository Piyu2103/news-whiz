import React from 'react'
import RootStackNavigator from './src/navigation/navigators/RootStackNavigator'
import store from './src/core/redux/store/store'
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <RootStackNavigator/>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  )
}

export default App