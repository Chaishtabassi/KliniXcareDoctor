import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  AppState
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput, List, Divider, IconButton} from 'react-native-paper';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';

export const {width, height} = Dimensions.get('screen');

const Siigninscreen = ({navigation}) => {

  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    getDeviceToken(); 
  }, []);

  // useEffect(() => {
  //   // ... (existing code)
  
  //   // Listen for background notifications
  //   const unsubscribeOnBackgroundMessage = messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Background Notification:', remoteMessage);
  //     // Handle the notification as needed
  //   });
  
  //   return () => {
  //     unsubscribeOnBackgroundMessage();
  //   };
  // }, []);
  

  const getDeviceToken = async () => {
    try {
      let token = await messaging().getToken();
      
      if (!token) {
        // If the token is not available, request a new one
        token = await messaging().requestPermission();
      }
  
      console.log('Device Token:', token);
      setDeviceToken(token);
  
      // Save the device token in AsyncStorage
      await AsyncStorage.setItem('deviceToken', token);
    } catch (error) {
      console.error('Error getting device token:', error);
    }
  };
  

  // async function requestUserPermission() {
  //   try {
  //     const authStatus = await messaging().requestPermission();
  //     const enabled =
  //       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
  //     if (enabled) {
  //       console.log('Authorization status:', authStatus);
  //     }
  //   } catch (error) {
  //     console.error('Error requesting FCM permission:', error);
  //   }
  // }

  PushNotification.createChannel(
    {
      channelId: 'channel-id', // Use a unique channel id
      channelName: 'Channel Name',
      channelDescription: 'A channel to categorize your notifications',
      soundName: 'default', // Optional, you can use a custom sound file
      importance: 4, // Set the importance level (0 - 4)
      vibrate: true, // Enable vibration
    },
    (created) => console.log(`Channel created: ${created}`),
  );

  useEffect(() => {
    let remoteMessage = null; // Declare remoteMessage in the outer scope
  
    const handleForegroundNotification = (message) => {
      console.log('Foreground Notification:', message);
  
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: message.notification.title,
        message: message.notification.body,
      });
    };
  
    const unsubscribeOnMessage = messaging().onMessage(async (message) => {
      console.log('A new FCM message arrived!', JSON.stringify(message));
      remoteMessage = message; // Update the outer variable
      handleForegroundNotification(message);
    });
  
    const appStateChangeHandler = (nextAppState) => {
      if (nextAppState === 'active') {
        const notificationOpen = messaging().getInitialNotification();
        if (notificationOpen) {
          // navigation.navigate('notification', {
          //   notificationData: remoteMessage, // Access data from the outer variable
          // });
          console.log('Notification caused app to open from quit state:', notificationOpen);
        }
      }
    };
  
    const unsubscribeOnAppStateChange = AppState.addEventListener('change', appStateChangeHandler);
  
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp((message) => {
      console.log('Background Notification:', message);
  
      navigation.navigate('notification', {
        notificationData: message.data,
      });
    });
  
    messaging()
      .getInitialNotification()
      .then((message) => {
        if (message) {
          console.log('Initial Notification:', message);
          remoteMessage = message; // Update the outer variable
  
          navigation.navigate('notification', {
            notificationData: message.data,
          });
        }
      });
  
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
      unsubscribeOnAppStateChange.remove();
    };
  }, [navigation]);

  async function requestUserPermission() {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.error('Error requesting FCM permission:', error);
    }
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  const [visible, setVisible] = useState(false);
  const [country, setCountry] = useState({
    cca2: 'PH',
    callingCode: '63',
  });
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    func();
  }, []);

  const func = async () => {
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
  };

  const openCountryPicker = () => {
    setVisible(true);
  };

  const onSelectCountry = selectedCountry => {
    setCountry(selectedCountry);
    setVisible(false);
  };

  const handlePhoneNumberVerification = async () => {
    if (!username) {
      setError('The Field cannot be empty');
      return;
    }

    if (username.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError('');

    const phoneNumber = username;
    await AsyncStorage.setItem('phoneNumber', phoneNumber);
    navigation.navigate('pin', {phoneNumber});
  };

  return (
    <KeyboardAvoidingView style={{
      flex: 1,
      justifyContent: 'space-between',
      // backgroundColor: '#49B2E9',
      backgroundColor:'white'
    }}>
      <View
        style={{
          flex:1,
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Image source={require('../Assets/Logo.png')} style={styles.logo1} /> */}
          <Image source={require('../Assets/newlogo.png')} resizeMode="contain" style={styles.logo1}/>
          <Text style={{fontSize:20,fontWeight:'700',bottom:20,color:'black'}}>Doctor App</Text>
        </View>

        <Image
          source={require('../Assets/doctorlogin.png')}
          resizeMode="contain"
          style={styles.logo}
        />

<View style={{alignItems:'center',width:'100%',bottom:0,position:'absolute',height:'38%'}}>

          <Text
            style={{
              fontSize: 15,
              fontFamily: 'NunitoSans_7pt-Regular',
              top: 5,
            }}>
            Sign in to continue
          </Text>

          <View
            style={{
              position: 'absolute',
              top: 38,
              left: width * 0.08,
              zIndex: 1,
              // paddingHorizontal: 5,
              paddingTop: 12,
              // backgroundColor: 'yellow',
              width: width * 0.1,
              height: height * 0.06,
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: width * 0.15,
              borderRightWidth: 1,
            }}>
            <Text
              style={{fontSize: 14, fontWeight: '500', top: height * 0.003}}>
              {`+${country.callingCode}`}
            </Text>
            <TouchableOpacity onPress={openCountryPicker}>
              <Image
                resizeMode="contain"
                style={{
                  height: height * 0.05,
                  width: width * 0.05,
                  bottom: 10,
                  bottom: height * 0.01,
                }}
                source={require('../Assets/Arrow.png')}></Image>
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              value={username}
              onChangeText={text => {
                const numericValue = text.replace(/[^0-9]/g, '');
                setUsername(numericValue);
              }}
              placeholder="Enter Phone Number"
              mode="outlined"
              keyboardType="phone-pad"
              fontSize={16}
              maxLength={10}
              outlineColor="#e4efff"
              allowFontScaling
              style={{
                height: 60,
                top: 13,
                backgroundColor: '#e4efff',
                zIndex: 0,
                paddingLeft: 50,
                width: Dimensions.get('window').width * 0.85,
              }}
              theme={{colors: {primary: '#478ffd'}}}
              dense={true}
              // left={
              //   <TextInput.Icon
              //     style={{
              //       borderRightWidth: 1,
              //       borderRadius: 1,
              //       alignSelf: 'center',
              //       height: height * 0.05,
              //     }}
              //     name="chevron-down"
              //     onPress={openCountryPicker}
              //   />
              // }
            />
          </View>

          {error ? (
            <Text style={{color: 'red', paddingTop: 15}}>{error}</Text>
          ) : null}

          <CountryPicker
            visible={visible}
            onClose={() => setVisible(false)}
            onSelect={onSelectCountry}
            withFilter
            withCallingCode
            withCountryNameButton
            placeholder=""
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handlePhoneNumberVerification}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color:'black',position:'absolute',bottom:0}}>Powered by KliniXKare</Text>

      </View>
    </KeyboardAvoidingView>
  );
};

export default Siigninscreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    // padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  logo: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.3,
  },
  logo1: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
  },
  button: {
    backgroundColor: '#4a87d7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.86,
    height: 50,
    top:10
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
