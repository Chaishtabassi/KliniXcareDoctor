import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Backbutton from '../Component/Backbutton';
import Icon from 'react-native-vector-icons/EvilIcons';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {height, width} from '../Authentication/Siigninscreen';
import {ScrollView} from 'react-native-gesture-handler';

const Profilescreen = ({navigation}) => {
  const [apiData, setApiData] = useState([]);
  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const personal = () => {
    navigation.navigate('personalinfo');
  };

  const appointment = () => {
    navigation.navigate('appoitmentprofile');
  };

  const doctor = () => {
    navigation.navigate('doctorslist');
  };

  const faq = () => {
    navigation.navigate('faq');
  };

  const logout = () => {
    navigation.navigate('logout');
  };

  const policy = () => {
    navigation.navigate('privacy');
  };

  const holiday = () => {
    navigation.navigate('holiday');
  };

  const records =()=>{
    navigation.navigate('patientdetail');
  }

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const callApi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    try {
      const api = `https://espinarealty.com/doctor/api/v1/doctor-info`;

      const authToken = bearerToken;

      const response = await fetch(api, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log(responseData);

          setApiData(responseData.data);
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  return (
    <ScrollView style={{backgroundColor:'white'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Profile</Text>
  <TouchableOpacity   onPress={handleBackButtonPress}> 
  <Image style={{ height: 27, width: 27,marginRight:10 }} source={require('../Assets/image-removebg.png')}/>
  </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          {/* <Image
            source={require('../Assets/photo.png')}
            style={styles.profileImage}
          /> */}
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{apiData.name}</Text>
            <Text style={styles.name}>{apiData.designation}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={personal}>
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              {/* <Image source={require('../Assets/user.png')} style={styles.leftImage} /> */}
              <Text style={styles.leftText}>Personal Info</Text>
            </View>
            <TouchableOpacity style={styles.rightContainer}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.03,
                  resizeMode: 'contain',
                }}
                source={require('../Assets/RightArrow.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.separator}></View>

        <TouchableOpacity onPress={appointment}>
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              {/* <Image source={require('../Assets/appointment.png')} style={styles.leftImage} /> */}
              <Text style={styles.leftText}>Appointment History</Text>
            </View>
            <TouchableOpacity style={styles.rightContainer}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.03,
                  resizeMode: 'contain',
                }}
                source={require('../Assets/RightArrow.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.separator}></View>

        <TouchableOpacity onPress={doctor}>
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              {/* <Image source={require('../Assets/doctor.png')} style={styles.leftImage} /> */}
              <Text style={styles.leftText}>Appointment Slots</Text>
            </View>
            <TouchableOpacity style={styles.rightContainer}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.03,
                  resizeMode: 'contain',
                }}
                source={require('../Assets/RightArrow.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.separator}></View>

<TouchableOpacity onPress={holiday}>
  <View style={styles.bottomContainer}>
    <View style={styles.leftContainer}>
      {/* <Image source={require('../Assets/doctor.png')} style={styles.leftImage} /> */}
      <Text style={styles.leftText}>Manage Holidays</Text>
    </View>
    <TouchableOpacity style={styles.rightContainer}>
      <Image
        style={{
          height: height * 0.03,
          width: width * 0.03,
          resizeMode: 'contain',
        }}
        source={require('../Assets/RightArrow.png')}
      />
    </TouchableOpacity>
  </View>
</TouchableOpacity>

<View style={styles.separator}></View>

<TouchableOpacity onPress={records}>
  <View style={styles.bottomContainer}>
    <View style={styles.leftContainer}>
      {/* <Image source={require('../Assets/doctor.png')} style={styles.leftImage} /> */}
      <Text style={styles.leftText}>Patients History</Text>
    </View>
    <TouchableOpacity style={styles.rightContainer}>
      <Image
        style={{
          height: height * 0.03,
          width: width * 0.03,
          resizeMode: 'contain',
        }}
        source={require('../Assets/RightArrow.png')}
      />
    </TouchableOpacity>
  </View>
</TouchableOpacity>

        <View style={styles.separator}></View>

        <TouchableOpacity onPress={policy}>
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              {/* <Image source={require('../Assets/blood.png')} style={styles.leftImage} /> */}
              <Text style={styles.leftText}>Privacy Policy</Text>
            </View>
            <TouchableOpacity style={styles.rightContainer}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.03,
                  resizeMode: 'contain',
                }}
                source={require('../Assets/RightArrow.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={styles.separator}></View>

        <TouchableOpacity onPress={faq}>
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              {/* <Image source={require('../Assets/blood.png')} style={styles.leftImage} /> */}
              <Text style={styles.leftText}>Help & FAQ</Text>
            </View>
            <TouchableOpacity style={styles.rightContainer}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.03,
                  resizeMode: 'contain',
                }}
                source={require('../Assets/RightArrow.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.separator}></View>

        <TouchableOpacity onPress={logout}>
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              {/* <Image source={require('../Assets/log.png')} style={styles.leftImage} /> */}
              <Text style={styles.leftText}>Log Out </Text>
            </View>
            <TouchableOpacity style={styles.rightContainer}>
              <Image
                style={{
                  height: height * 0.03,
                  width: width * 0.03,
                  resizeMode: 'contain',
                }}
                source={require('../Assets/RightArrow.png')}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profilescreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 40,
    height: 50,
    backgroundColor: '#4e93e1',
    justifyContent: 'center',

  },
  title: {
    flex: 1,
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Domine-SemiBold',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '700',
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    height: height * 0.1,
    justifyContent: 'center',
  },
  profileImage: {
    width: width * 0.3,
    height: height * 0.12,
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 15,
  },
  profileName: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Domine-SemiBold',
  },
  name: {
    fontSize: 15,
    color: 'grey',
    fontFamily: 'NunitoSans_7pt-Regular',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 13,
    top: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  leftText: {
    fontSize: 16,
    color: 'black',
    fontFamily: '',
  },
  rightContainer: {
    alignItems: 'center',
  },
  rightIcon: {
    width: 30,
    height: 30,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e1da',
    margin: 10,
  },
});
