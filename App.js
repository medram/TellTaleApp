import * as React from 'react';

import { StyleSheet, useColorScheme} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage, { showMessage } from 'react-native-flash-message'
import AsyncStorage from '@react-native-community/async-storage'

import { StackMenu } from './src/navigators'
import { darkTheme, lightTheme } from './src/configs/themes';
import { AuthContext } from './src/utils/contexts'
import { signIn } from './src/services/auth-service';
// set some global Axios configs
import './src/configs/api'


function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const currentTheme = isDarkMode === 'dark' ? darkTheme : lightTheme

  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch(action.type)
    {
      case 'IS_LOADING':
        return { ...prevState, isLoading: !!action.payload}
      case 'UPDATE_USER':
        return { ...prevState, user: action.payload}
      case 'IS_LOGGED_IN':
        return { ...prevState, isLoggedIn: !!action.payload}
    }
  }, {
    user: {},
    isLoggedIn: false,
    isLoading: false,
  })

  const authContext = React.useMemo(() => ({
    signIn: async (email, password) => {
      try
      {
        dispatch({type: 'IS_LOADING', payload: true})
        const res = await signIn(email, password)
        const data = res.data
        const user = { ...data.user, token: data.token }

        dispatch({ type: 'UPDATE_USER', payload: user})
        // save user data on storage
        await AsyncStorage.setItem('@user', JSON.stringify(user))
        showMessage({
          message: 'Signed in successfully.',
          type: 'success'
        })

        dispatch({ type: 'IS_LOGGED_IN', payload: true})
      } catch(error) {
        showMessage({
          message: 'Invalid Credentials!',
          type: 'danger'
        })
      }
      dispatch({type: 'IS_LOADING', payload: false})
    },
    signOut: async () => {
      dispatch({ type: 'IS_LOGGED_IN', payload: false })
      dispatch({ type: 'UPDATE_USER', payload: {} })
    },
  }), [])

  React.useEffect(() => {
    (async () => {
      try
      {
        const user = JSON.parse(await AsyncStorage.getItem('@user'))

        if (user.token)
        {
          dispatch({ type: 'UPDATE_USER', payload: user})
          dispatch({ type: 'IS_LOGGED_IN', payload: true})
        }
      } catch (err){
        console.log(err)
      }
    })()
  }, [])

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={currentTheme}>
        <AuthContext.Provider value={{...authContext, ...state}} >

          <NavigationContainer theme={currentTheme}>
            <StackMenu />
          </NavigationContainer>

        </AuthContext.Provider>

        <FlashMessage position="top" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
