import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Requestheader from '../Component/Requestheader';
import Appointmentlist from '../Data/Appointmentlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {height} from '../Authentication/Siigninscreen';

const Requestscreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  const {height, width} = Dimensions.get('screen');

  useFocusEffect(
    React.useCallback(() => {
      callApi();
    }, []),
  );

  const [apiData, setApiData] = useState([]);

  const callApi = async selectedDate => {
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
          setLoading(false);
          setApiData(responseData.data);
          console.log('Users Array:', responseData.data);
        } else {
          console.error('Non-200 status code:', response.status);
          setLoading(false);
        }
      } else {
        console.error('Response is undefined');
        setLoading(false);
      }
    } catch (error) {
      console.error('erorrr', error);
      setLoading(false);
    }
  };

  const Patientdetail = patient => {
    navigation.navigate('patient', {selectedpatient: patient});
    console.log(patient);
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
        case 5:
          return 'reschedule';
      default:
        return 'Unknown Status';
    }
  };

  const getStatusColor = status => {
    switch (status) {
      case 0:
        return 'green'; 
      case 1:
        return 'orange';
      case 2:
        return 'blue';
      case 3:
        return 'red'; 
        case 5:
          return 'purple'; 
      default:
        return 'black'; 
    }
  };

  const renderItem = ({item}) => (
    // <TouchableOpacity onPress={() => Patientdetail(item)}>
    <View style={styles.cardContainer}>
      <TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 12,
            // height: height * 0.1,
          }}>
          <Image
            style={{
              height: height * 0.1,
              width: width * 0.2,
              borderRadius: 2,
              margin: 12,
            }}
            resizeMode="contain"
            source={require('../Assets/patientimage.jpg')}
          />
          <View
            style={{
              marginLeft: 15,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontFamily: 'NunitoSans_7pt-Bold',
                color: 'black',
              }}>
              {/* Patient Name:{'  '} */}
              {item.user.fullname}
            </Text>
            <View style={{ flexDirection:'row',justifyContent:'space-between'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NunitoSans_7pt-Light',
                  color: 'grey',
                  // marginLeft: 10,
                }}>
                {/* Gender:{'  '} */}
                {item.gender === 0 ? 'Female' : 'Male'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NunitoSans_7pt-Light',
                  color: getStatusColor(item.status),
                  // marginLeft: 10,
                }}>
                {getStatusDescription(item.status)}
              </Text>
              </View>

              <Text style={{ fontFamily: 'Domine-Regular' }}>
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>

              {/* <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NunitoSans_7pt-Light',
                  color: 'grey',
                }}>
                {item.user.age}
              </Text> */}
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NunitoSans_7pt-Light',
                  color: 'grey',
                  // marginLeft: 10,
                }}>
                {/* Gender:{'  '} */}
                {item.time_range}
              </Text>
          </View>
          {/* 
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '30%',
          }}>
          <TouchableOpacity onPress={() => callPhoneNumber(item.identity)}>
            <Icon name="call-outline" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={chat}>
            <Icon name="chatbubbles-outline" size={25} color="black" />
          </TouchableOpacity>
        </View> */}

<TouchableOpacity
          style={styles.button}
          onPress={() => Patientdetail(item)}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        </View>
      
      </TouchableOpacity>
    
    </View>
    // </TouchableOpacity>
  );

  // const renderItem = ({item}) => (
  //   // <TouchableOpacity onPress={() => Patientdetail(item)}>
  //   <View style={styles.cardContainer}>
  //     <View style={{flexDirection: 'row', alignItems: 'center'}}>
  //       <Image
  //         resizeMode="contain"
  //         style={{height: height * 0.1, width: width * 0.22}}
  //         source={require('../Assets/profilepic.jpg')}
  //       />
  //       <View
  //         style={{
  //           marginLeft: 10,
  //           flex: 1,
  //           // height: height * 0.1,
  //           justifyContent: 'space-around',
  //         }}>
  //         <Text
  //           style={{
  //             fontSize: 15,
  //             fontFamily: 'NunitoSans_7pt-Bold',
  //             color: 'black',
  //           }}>
  //           {item.user.fullname}
  //         </Text>
  //         <View style={{}}>
  //           <Text
  //             style={{
  //               fontSize: 14,
  //               fontFamily: 'NunitoSans_7pt-Light',
  //               color: 'grey',
  //             }}>
  //             {item.user.age}
  //           </Text>
  //           <Text
  //             style={{
  //               fontSize: 14,
  //               fontFamily: 'NunitoSans_7pt-Light',
  //               color: 'grey',
  //             }}>
  //             {item.user.gender === 0 ? 'Male' : 'Female'}
  //           </Text>
  //         </View>
  //       </View>
  //       <TouchableOpacity
  //         style={styles.button}
  //         onPress={() => Patientdetail(item)}>
  //         <Text style={styles.buttonText}>View</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  //   // </TouchableOpacity>
  // );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={handleBackButtonPress}>
          <Image
            resizeMode="contain"
            style={{
              height: height * 0.02,
              width: width * 0.04,
              left: 5,
              tintColor: '#FFF',
            }}
            source={require('../Assets/BackButton.png')}></Image>
        </TouchableOpacity> */}
        <Text style={styles.title}>REQUEST</Text>
      </View>

      {apiData.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          {loading ? (
            // Show the loader in the center of the screen
            <ActivityIndicator size="large" color="#49b2e9" />
          ) : (
            <Image
              style={{height: '65%', width: '65%'}}
              resizeMode="contain"
              source={require('../Assets/null.png')}
            />
          )}
        </View>
      ) : (
        <FlatList
          data={apiData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

export default Requestscreen;

const styles = StyleSheet.create({
  itemContaine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#49b2e9',
    borderRadius: 5,
    padding: 15,
    paddingVertical: 20,
  },
  cardContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    margin: 10,
    height: height * 0.12,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // height: 40,
    height: 50,
    backgroundColor: '#4e93e1',
    justifyContent: 'center',
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
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
  imageContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  text1: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Domine-Bold',
    color: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Domine-Bold',
  },
  bottomText: {
    // fontSize: height * 0.023,
    fontSize: 20,
    fontWeight: '500',
    color: '#FFF',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
  },
  dayDateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10,
    width: 60,
    height: 60,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#4e93e1',
    // backgroundColor: 'red',
    alignItems: 'center',
    borderRadius: 30,
    width: Dimensions.get('window').width * 0.2,
    height: height * 0.04,
    marginLeft:20
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 17,
  },
});
