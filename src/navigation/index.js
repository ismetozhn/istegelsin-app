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
import DenemeGet from '../screens/DenemeGet';
import App from '../screens/SilRequest';
import DenemeGet2 from '../screens/DenemeGet2';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditUserScreen from '../screens/EditUserScreen';
import EditCompanyScreen from '../screens/EditCompanyScreen';
import CompanyJobAdd from '../screens/CompanyJobAdd';
import UpdateCompanyJob from '../screens/UpdateCompanyJob';
import LoginScreen2 from '../screens/LoginScreen2';
import CompanyJobAll from '../screens/CompanyJobAll';
import ApplyScreen from '../screens/ApplyScreen';
import UserApplyScreen from '../screens/UserApplyScreen';
import ActiveJobScreen from '../screens/ActiveJobScreen';
import OtpUserScreen from '../screens/OtpUserScreen';



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
        <Stack.Screen name="Deneme" component={DenemeGet} />
        <Stack.Screen name="Sil" component={App} />
        <Stack.Screen name="UserD" component={DenemeGet2} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
        <Stack.Screen name="EditCompany" component={EditCompanyScreen} />
        <Stack.Screen name="AddJob" component={CompanyJobAdd} />
        <Stack.Screen name="UpdateCompanyJob" component={UpdateCompanyJob} />
        <Stack.Screen name="Login2" component={LoginScreen2} />
        <Stack.Screen name="CompanyJob" component={CompanyJobAll} />
        <Stack.Screen name="Basvurular" component={ApplyScreen} />
        <Stack.Screen name="KullanıcıBasvuru" component={UserApplyScreen} />
        <Stack.Screen name="ActiveJob" component={ActiveJobScreen} />
        <Stack.Screen name="Otp" component={OtpUserScreen} />
        

       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;