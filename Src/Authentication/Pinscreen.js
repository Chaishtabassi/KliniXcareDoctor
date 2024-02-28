import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Backbutton from '../Component/Backbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import OTPTextView from 'react-native-otp-textinput';
import Toast from 'react-native-toast-message';
import {width} from './Siigninscreen';
import {ToastAndroid} from 'react-native';

const Pinscreen = ({navigation}) => {
  const [pin, setPin] = useState(['', '', '', '']);
  const pinInputs = useRef(Array(4).fill(null));
  const [enteredPin, setEnteredPin] = useState('');

  const Done = async () => {
    callapi();
    try {
      if (checkpin) {
        if (enteredPin === savedpin) {
          navigation.navigate('bottom');
        } else {
          console.error('Incorrect PIN entered.');
          ToastAndroid.show('Incorrect PIN entered', ToastAndroid.SHORT);
        }
      } else {
        if (enteredPin.length === 4) {
          savePin();
          await callapi();
        } else {
          ToastAndroid.show('Please enter a 4-digit PIN', ToastAndroid.SHORT);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      ToastAndroid.show('Incorrect PIN entered', ToastAndroid.SHORT);
    }
  };
  
  const callapi = async () => {
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
  
    console.log(storedPhoneNumber);

    const storedDeviceToken = await AsyncStorage.getItem('deviceToken');
  
    if (enteredPin && enteredPin.length === 4) {
      try {
        const apiUrl = `http://teleforceglobal.com/doctor/api/v1/doctorLogin`;
  
        const formData = new FormData();
  
        formData.append('mobile_number', storedPhoneNumber);
        formData.append('password', enteredPin);
        formData.append('device_token',storedDeviceToken);
  
        console.log(formData);
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response) {
          // Toast.show({
          //   text1: 'under if condition',
          //   type: 'error',
          // });
          if (response.status === 200) {
            const responseData = response.data;
  
            console.log('Response Data:', responseData);
  
            const access_token = responseData.data.access_token;
            await AsyncStorage.setItem('access_token', access_token);
            console.log(access_token);
  
            const doctor_id = JSON.stringify(responseData.data.id);
            console.log(responseData.data.id);
            await AsyncStorage.setItem('doctor_id', doctor_id);
  
            if (responseData.message === 'Login successfully') {
              navigation.navigate('bottom');
            } else {
              console.error('Incorrect PIN entered.');
              ToastAndroid.show('Incorrect PIN entered', ToastAndroid.SHORT);
            }
          } 
        }
      } catch (error) {
        console.error('Error:', error);
        Toast.show({
          text1: 'Incorrect Pin.',
          type: 'error',
        });
      }
    } else {
      ToastAndroid.show('Please enter a 4-digit PIN', ToastAndroid.SHORT);
    }
  };
  

  useEffect(() => {
    storedpin();
  }, []);

  useEffect(() => {
    if (pin.join('').length === 4) {
      setEnteredPin(pin.join(''));
    }
  }, [pin]);

  let checkpin = false;
  let savedpin = '';

  const storedpin = async () => {
    const storedPin = await AsyncStorage.getItem('userPin');
    console.log('sssssssss',storedPin);
    if (storedPin !== null) {
      checkpin = true;
      savedpin = storedPin;
    }
  };

  const savePin = async () => {
    try {
      await AsyncStorage.setItem('userPin', enteredPin);
    } catch (error) {
      console.error('Error saving PIN:', error);
    }
  };

  const forgotpin = () => {
    navigation.navigate('reset', {
      pin: savedpin,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <Text style={styles.title}>Enter Your Pin</Text>
      </View>
      <View style={styles.textContainer}>
        <View style={{bottom: 30, alignItems: 'center'}}>
          <Text style={styles.centeredText}>
            Please enter your 4-digit Pin.
          </Text>

          <View style={styles.pinInputContainer}>
            <OTPTextView
              containerStyle={[styles.otpContainer, styles.customBorder]}
              textInputStyle={styles.pinInput}
              handleTextChange={text => setEnteredPin(text)}
              numberOfInputs={4}
              inputBorderColor="red"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={Done}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', top: 10, alignItems: 'center'}}>
          <Text style={{fontFamily: 'NunitoSans_7pt-Regular', fontSize: 14}}>
            {' '}
            Forgot your pin?
          </Text>
          <TouchableOpacity onPress={forgotpin}>
            <Text
              style={{
                color: '#4a87d7',
                fontWeight: '500',
                fontFamily: 'NunitoSans_7pt-Regular',
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Pinscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.2,
    top: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomEndRadius: 20,
    // borderBottomLeftRadius: 20,
    backgroundColor: '#4a87d7',
    height: '8%',
  },
  title: {
    // flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
    color: 'white',
    width: width * 0.9,
  },
  textContainer: {
    flex: 3,
    alignItems: 'center',
    top: 50,
  },
  centeredText: {
    fontSize: 18,
    fontFamily: 'NunitoSans_7pt-Light',
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  otpContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 10,
  },
  pinInput: {
    flex: 1,
    height: 50,
    fontSize: 24,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a87d7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    // height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    fontSize: 16,
  },
});
