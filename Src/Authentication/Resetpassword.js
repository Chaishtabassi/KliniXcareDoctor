import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Backbutton from '../Component/Backbutton';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {width} from './Siigninscreen';

const Resetpassword = ({navigation, route}) => {
  const {pin} = route.params;
  console.log('pinnnnnnnnnnnnnnnnnnn',pin)

  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const Reset = async () => {
    const storedPin = await AsyncStorage.getItem('userPin');
    console.log(storedPin)
    const access_token = await AsyncStorage.getItem('access_token');

    try {
      const apiUrl = `http://teleforceglobal.com/doctor/api/v1/setPin`;

      const formData = new FormData();

      formData.append('new_password', text);
      formData.append('new_password_confirmation', text1);
      formData.append('old_password', pin);

      const authToken = access_token;

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response && response.status === 200) {
        const responseData = response.data;
  
        console.log('Response Data:', responseData);
  
        if (responseData.message === 'PIN set successfully') {
          navigation.navigate('pin');
        } else {
          Toast.show({
            text1: responseData.message,
            type: 'error',
          });
        }
      } else {
        Toast.show({
          text1: responseData.message,
          type: 'error',
        });
        Toast.show({
          text1: `Non-200 status code: ${response?.status}`,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Toast.show({
        text1: 'An error occurred. Please try again later.',
        type: 'error',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Backbutton />
        <View
          style={{
            // backgroundColor: 'red',
            width: width * 0.9,
            justifyContent: 'center',
          }}>
          <Text style={styles.title}>Reset Pin</Text>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.centeredText}>Enter new password and confirm.</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          label="Old Pin"
          keyboardType="number-pad"
          maxLength={4}
          value={text2}
          onChangeText={text => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setText2(numericValue);
          }}
          theme={{colors: {primary: '#478ffd'}}}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          label="Enter New Pin"
          onChangeText={text => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setText(numericValue);
          }}
          keyboardType="number-pad"
          maxLength={4}
          value={text}
          theme={{colors: {primary: '#478ffd'}}}
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          outlineColor="#e4efff"
          label="Confirm New Pin"
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={text => {
            const numericValue = text.replace(/[^0-9]/g, '');
            setText1(numericValue);
          }}
          value={text1}
          theme={{colors: {primary: '#478ffd'}}}
        />

        <TouchableOpacity style={styles.button} onPress={Reset}>
          <Text style={styles.buttonText}>Change Pin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Resetpassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a87d7',
    height: '8%',
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    color: 'white',
    top: 12,
  },
  textContainer: {
    margin: 10,
    padding: 10,
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Regular',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    top: 20,
    backgroundColor: '#e4efff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4a87d7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 25,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
