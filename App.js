import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { StackMenu, TabMenu } from './src/navigators'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { darkTheme, lightTheme } from './src/configs/themes';



function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const currentTheme = isDarkMode === 'dark' ? darkTheme : lightTheme



  return (
    <SafeAreaProvider>
      <NavigationContainer theme={currentTheme}>
        <StackMenu />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
