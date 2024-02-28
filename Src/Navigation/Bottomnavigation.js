import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import Dashboard from '../Screens/Dashboard';
import Requestscreen from '../Screens/Requestscreen';
import Profilescreen from '../Screens/Profilescreen';
import {height, width} from '../Authentication/Siigninscreen';
import Inboxscreen from '../Screens/Inboxscreen';

const Clienttab = createBottomTabNavigator();

const Bottomnavigation = () => {
  return (
    <Clienttab.Navigator
    screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: '#4a87d7',height:55 },
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor:'white',
        tabBarLabelStyle: { fontSize: 13 },
      })}
    >
      <Clienttab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size}) => (
            <Image style={{height:27,width:27}} source={require('../Assets/image-removebg.png')}/>
          ),
        }}
      />
      <Clienttab.Screen
        name="Request"
        component={Requestscreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Request',
          tabBarIcon: ({color, size, focused}) => (
            <Image style={{height:27,width:27}} source={require('../Assets/interview.png')}/>
          ),
        }}
      />
      {/* <Clienttab.Screen
        name="inbox"
        component={Inboxscreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Inbox',
          tabBarIcon: ({color, size}) => (
            <Image source={require('../Assets/inbox.png')} />
          ),
        }}
      /> */}
      {/* <Clienttab.Screen
        name="profile"
        component={Profilescreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size, focused}) => (
            <Image
              resizeMode="contain"
              source={require('../Assets/Profile.png')}
              style={{
                tintColor: focused ? '#2C476F' : 'gray',
                width: size,
                height: size,
                top: 2,
              }}
            />
          ),
        }}
      /> */}

<Clienttab.Screen
            name='inbox'
            component={Inboxscreen}
            options={{
                headerShown:false,
                tabBarLabel:'Messages',
                tabBarIcon:({color,size})=>(
                    <Image style={{height:27,width:27}} source={require('../Assets/bottommessage.png')}/>

                )
            }}
            />
    </Clienttab.Navigator>
  );
};

export default Bottomnavigation;
