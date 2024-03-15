import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import ContactScreen from '../screens/ContactScreen';
import SignUpScreen2 from '../screens/SignUpScrenn2';
import SettingsScreen from '../screens/SettingsScreen';
import Deneme from '../screens/Deneme';
import App from '../screens/SilRequest';



const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="İletişim" component={ContactScreen} />
        <Stack.Screen name="SignUp2" component={SignUpScreen2} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Deneme" component={Deneme} />
        <Stack.Screen name="Sil" component={App} />
        
        

       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;