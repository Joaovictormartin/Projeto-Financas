import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import Routes from './src/routes/index';
import AuthContext from './src/contexts/auth';

console.disableYellowBox=true;

export default function App() {
  return (
    <NavigationContainer>
      <AuthContext>
        <StatusBar backgroundColor="#131313" barStyle="light-content" />
        <Routes />  
      </AuthContext>
      
    </NavigationContainer>
  );
}


