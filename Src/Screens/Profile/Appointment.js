import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Backbutton from '../../Component/Backbutton';
import Icon from 'react-native-vector-icons/AntDesign';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {height, width} from '../../Authentication/Siigninscreen';

const Appointment = ({navigation}) => {
  const [apiData, setApiData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const callApi = async () => {
    const storedate = await AsyncStorage.getItem('selectedDateFormatted');
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `https://espinarealty.com/doctor/api/v1/fetchAppointmentHistory`;

      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log(responseText);

          setApiData(responseData.data);
          console.log('Users Array:', responseData.data);
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

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const getStatusDescription = status => {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'Accepted';
      case 2:
        return 'Completed';
      case 3:
        return 'Declined';
      default:
        return 'Unknown Status';
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.cardContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={{height: 90, width: 90}}
          resizeMode="contain"
          source={require('../../../Src/Assets/patientimage.jpg')}
        />
        <View style={{marginLeft: 15, flex: 1}}>
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'NunitoSans_7pt-Bold',
              color: 'black',
            }}>
            {item.user.fullname}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NunitoSans_7pt-Light',
                color: 'grey',
              }}>
              {item.user.age}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'NunitoSans_7pt-Light',
                color: 'grey',
                marginLeft: 10,
              }}>
              {item.gender === 0 ? 'Female' : 'Male'}
            </Text>
          </View>
          <Text style={styles.date}>
            {new Date(item.user.created_at).toLocaleString()}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          backgroundColor: '#4e93e1',
          padding: 10,
        }}>
        <Text style={{fontSize: 18, fontWeight: '600',color:'white'}}>
          {getStatusDescription(item.status)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4e93e1',
          height: '7%',
        }}>
          <Backbutton/>
        {/* <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{marginLeft: 10}}>
          <TouchableOpacity onPress={handleBackButtonPress}>
            <Image
              resizeMode="contain"
              style={{
                height: height * 0.02,
                width: width * 0.04,
                tintColor: 'white',
                left: 5,
              }}
              source={require('../../Assets/BackButton.png')}></Image>
          </TouchableOpacity>
        </TouchableOpacity> */}
        <View
          style={{
            height: height * 0.08,
            width: width * 0.9,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              margin: 10,
              fontSize: 18,
              color: '#FFF',
              fontFamily: 'Domine-Bold',
              textAlign: 'center',
            }}>
            Appointment History
          </Text>
        </View>
      </View>

      <FlatList
        data={apiData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    margin: 10,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  title1: {
    fontSize: 20,
    fontFamily: 'Domine-Bold',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#49b2e9',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e1da',
    marginTop: 10,
  },
  button1: {
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '34%',
  },
  button2: {
    backgroundColor: '#888888',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    width: '34%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
