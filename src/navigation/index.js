import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import JobDetailScreen from '../screens/JobDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserSignUp from '../screens/UserSignUp';
import UserLoginScreen from '../screens/UserLoginScreen';
import MenuScreen from '../screens/MenuScreen';
import ContactScreen from '../screens/ContactScreen';
import CompanySignUp from '../screens/CompanySignUp';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditUserScreen from '../screens/EditUserScreen';
import EditCompanyScreen from '../screens/EditCompanyScreen';
import CompanyJobAdd from '../screens/CompanyJobAdd';
import UpdateCompanyJob from '../screens/UpdateCompanyJob';
import CompanyLoginScreen from '../screens/CompanyLoginScreen';
import CompanyJobAll from '../screens/CompanyJobAll';
import CompanyApplyScreen from '../screens/CompanyApplyScreen';
import UserApplyScreen from '../screens/UserApplyScreen';
import UserActiveJobScreen from '../screens/UserActiveJobScreen';
import UserOtpScreen from '../screens/UserOtpScreen';
import CompanyJobAcceptance from '../screens/CompanyJobAcceptance';




const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="SignUp" component={UserSignUp} />
        <Stack.Screen name="Login" component={UserLoginScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="İletişim" component={ContactScreen} />
        <Stack.Screen name="SignUp2" component={CompanySignUp} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="EditUser" component={EditUserScreen} />
        <Stack.Screen name="EditCompany" component={EditCompanyScreen} />
        <Stack.Screen name="AddJob" component={CompanyJobAdd} />
        <Stack.Screen name="UpdateCompanyJob" component={UpdateCompanyJob} />
        <Stack.Screen name="Login2" component={CompanyLoginScreen} />
        <Stack.Screen name="CompanyJob" component={CompanyJobAll} />
        <Stack.Screen name="Basvurular" component={CompanyApplyScreen} />
        <Stack.Screen name="KullanıcıBasvuru" component={UserApplyScreen} />
        <Stack.Screen name="ActiveJob" component={UserActiveJobScreen} />
        <Stack.Screen name="Otp" component={UserOtpScreen} />
        <Stack.Screen name="SirketKabul" component={CompanyJobAcceptance} />
        

       

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;