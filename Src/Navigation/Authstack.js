import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Siigninscreen from '../Authentication/Siigninscreen';
import Splashscreen from '../Authentication/Splashscreen';
import Forgotpassword from '../Authentication/Forgotpassword';
import Resetpassword from '../Authentication/Resetpassword';
import Confirmrest from '../Authentication/Confirmrest';
import Accountcreated from '../Authentication/Accountcreated';
import Bottomnavigation from './Bottomnavigation';
import Pinscreen from '../Authentication/Pinscreen';
import Faqscreen from '../Screens/dashboard/Faqscreen';
import Privacyscreen from '../Screens/dashboard/Privacyscreen';
import Helpcentre from '../Screens/dashboard/Helpcentre';
import Profilescreen from '../Screens/Profilescreen';
import Appointment from '../Screens/Profile/Appointment';
import Doctorsscreen from '../Screens/Profile/Doctorsscreen';
import Testscreen from '../Screens/Profile/Testscreen';
import Logoutscreen from '../Screens/Profile/Logoutscreen';
import Personalinfoscreen from '../Screens/Profile/Personalinfoscreen';
import Patientdetails from '../Screens/Patientdetails';
import Previoushistory from '../Screens/Previoushistory';
import Messagesscreen from '../Screens/Messagesscreen';
import Vedioscreen from '../Screens/Vedioscreen';
import Medicalprescription from '../Medicalprescription';
import Holidaysscreen from '../Screens/Profile/Holidaysscreen';
import Notification from '../Screens/Notification';
import Messagepatient from '../Screens/Messagepatient';
import Messagedashboard from '../Screens/Messagedashboard';
import Patientrecords from '../Screens/Profile/Patientrecords';
import Labrequest from '../Screens/Labrequest';

const Auth = createStackNavigator();

const Authstack = () => {
  return (
    <Auth.Navigator>
      {/* <Auth.Screen
            name='splash'
            component={Splashscreen}
            options={{
                headerShown:false,
                ...TransitionPresets.RevealFromBottomAndroid
            }}
            /> */}
      <Auth.Screen
        name="SignInScreen"
        component={Siigninscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="forgot"
        component={Forgotpassword}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="reset"
        component={Resetpassword}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="confirmrest"
        component={Confirmrest}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="accountcreated"
        component={Accountcreated}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="bottom"
        component={Bottomnavigation}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="pin"
        component={Pinscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="faq"
        component={Faqscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="privacy"
        component={Privacyscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="help"
        component={Helpcentre}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="profile"
        component={Profilescreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="medical"
        component={Medicalprescription}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="appoitmentprofile"
        component={Appointment}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

<Auth.Screen
        name="holiday"
        component={Holidaysscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="doctorslist"
        component={Doctorsscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="Test"
        component={Testscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="logout"
        component={Logoutscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="personalinfo"
        component={Personalinfoscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />

      <Auth.Screen
        name="patient"
        component={Patientdetails}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="previous"
        component={Previoushistory}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="message"
        component={Messagesscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
      <Auth.Screen
        name="vedio"
        component={Vedioscreen}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
        <Auth.Screen
        name="notification"
        component={Notification}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
       <Auth.Screen
        name="messagepa"
        component={Messagepatient}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
        <Auth.Screen
        name="messagedashboard"
        component={Messagedashboard}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
          <Auth.Screen
        name="patientdetail"
        component={Patientrecords}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
        <Auth.Screen
        name="labrequest"
        component={Labrequest}
        options={{
          headerShown: false,
          ...TransitionPresets.RevealFromBottomAndroid,
        }}
      />
    </Auth.Navigator>
  );
};

export default Authstack;
