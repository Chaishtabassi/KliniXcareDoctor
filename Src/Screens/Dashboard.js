import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ImageBackground,
  Linking ,
  BackHandler,
  Alert
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { phonecall } from 'react-native-communications';
import DateTimePicker from '@react-native-community/datetimepicker';
import { height, width } from '../Authentication/Siigninscreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';

const Dashboard = ({ navigation, route }) => {
  const [apiData, setApiData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isFocused]);

  useFocusEffect(
    React.useCallback(() => {
      callApi();
      total();
    }, []),
  );

  const [totalPatients, setTotalPatients] = useState(0);
  const [usersArray, setUsersArray] = useState([]);

  const total =async()=>{
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/fetchAppointmentHistory`;

      const authToken = bearerToken;

      const selectedDateFormatted = `${currentYear}-${String(
        currentMonth,
      ).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;

      await AsyncStorage.setItem(
        'selectedDateFormatted',
        selectedDateFormatted,
      );

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      // formData.append('date', selectedDateFormatted);

      // formData.append('status',1 );

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
        // body: JSON.stringify(),
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);

          const usersArray = [];
          for (const key in responseData.data) {
            if (responseData.data.hasOwnProperty(key)) {
              const userObject = responseData.data[key].user;
              if (userObject) {
                usersArray.push(userObject);
              }
            }
          }
          setTotalPatients(usersArray.length)
          console.log('jiiiiiiiiiiiiiiiiiiiiii:', responseData.data);
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  }

  const callApi = async selectedDate => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    const storedoctorid = await AsyncStorage.getItem('doctor_id');
    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/fetchAppointmentHistory`;

      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      // formData.append('date', selectedDateFormatted);
      formData.append('status', 1);

      // formData.append('status',0 );

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
        // body: JSON.stringify(),
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);

          const usersArray = [];
          for (const key in responseData.data) {
            if (responseData.data.hasOwnProperty(key)) {
              const userObject = responseData.data[key];
              if (userObject) {
                usersArray.push(userObject);
              }
            }
          }
          setApiData(usersArray);
          setUsersArray(usersArray.length);
          console.log('jiiiiiiiiiiiiiiiiiiiiii:', responseData.data[3]);
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

  const [doctordetail, setdoctordetail] = useState('');

  useEffect(() => {
    const Doctordetail = async () => {
      const access_token = await AsyncStorage.getItem('access_token');
      const bearerToken = access_token;
      console.log(bearerToken);

      try {
        const api = `http://teleforceglobal.com/doctor/api/v1/doctor-info`;

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
            console.log('doctor', responseData.data.name);

            setdoctordetail(responseData.data);
          } else {
            console.error('Non-200 status code:', response.status);
          }
        } else {
          console.error('Response is undefined');
        }
      } catch (error) {
        console.error('erorrr', error);
      }

    }
    Doctordetail();
  }, [])

  const handleDateSelection = date => {
    setSelectedDate(date);
    callApi(date); // Call the API when a date is selected
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const dates = [];

  for (let date = 1; date <= daysInMonth; date++) {
    dates.push(date);
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const Patientdetail = patient => {
    navigation.navigate('patient', { selectedpatient: patient });
  };

  const chat = (item) => {
    console.log(item)
    navigation.navigate('messagedashboard',{item});
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

  const startVideoCall = () => {
    navigation.navigate('vedio')
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => Patientdetail(item)} activeOpacity={1}>
    <View style={styles.cardContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 12,
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NunitoSans_7pt-Light',
                  color: 'grey',
                  // marginLeft: 10,
                }}>
                {/* Gender:{'  '} */}
                {/* {item.gender === 0 ? 'Male' : 'Female'}
              </Text> */}
                {/* <Text
              style={{
                fontSize: 14,
                fontFamily: 'NunitoSans_7pt-Light',
                color: 'grey',
              }}>
              {item.user.age} Years
            </Text> */}
            <Text style={{ fontFamily: 'Domine-Regular' }}>
                {new Date(item.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'NunitoSans_7pt-Light',
                  color: getStatusColor(item.status),
                  marginLeft: 10,
                }}>
                {getStatusDescription(item.status)}
              </Text>
            </View>
          
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

            <View style={{flexDirection:'row',justifyContent:'space-between',top:5}}>
              <View style={{backgroundColor:'#4e93e1',height:20,width:20,alignItems:'center',justifyContent:'center',borderRadius:30}}>
              <TouchableOpacity onPress={startVideoCall}>
      <Icon name='videocam-sharp' color='white' />
    </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => callPhoneNumber(item.user.identity)} style={{backgroundColor:'#4e93e1',height:20,width:20,alignItems:'center',justifyContent:'center',borderRadius:30}}>

              <Icon name='call' color='white'/>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => chat(item)}style={{backgroundColor:'#4e93e1',height:20,width:20,alignItems:'center',justifyContent:'center',borderRadius:30}}>
              <Icon name='chatbubble' color='white'/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </View>
   </TouchableOpacity>
  );

  const getStatusColor = status => {
    switch (status) {
      case 0:
        return 'green'; // Set your desired color for Pending status
      case 1:
        return 'orange'; // Set your desired color for Accepted status
      case 2:
        return 'blue'; // Set your desired color for Completed status
      case 3:
        return 'red'; // Set your desired color for Declined status
      default:
        return 'black'; // Set a default color for unknown status
    }
  };

  const callPhoneNumber = phoneNumber => {
    if (phoneNumber) {
      phonecall(phoneNumber, true);
    }
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedDatee, setSelectedDatee] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date) {
      setShowDatePicker(false);
      setSelectedDatee(date);

      const selectedYear = date.getFullYear();
      const selectedMonth = date.getMonth() + 1;
      const selectedDay = date.getDate();

      // Format the date as "YYYY-MM-DD"
      const formattedDate = `${selectedDay.toString().padStart(2, '0')}`;

      // Call the API with the formatted date
      callApi(formattedDate);

      setYear(selectedYear.toString());
      setMonth(selectedMonth.toString().padStart(2, '0'));
      setDay(selectedDay.toString().padStart(2, '0'));

      // Calculate age immediately when DOB is entered
      calculateAge(selectedYear, selectedMonth, selectedDay);
    }
  };

  const profile =()=>{
    navigation.navigate('profile')
  }

  const notification=()=>{
    navigation.navigate('notification');
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

<View style={{borderBottomRightRadius:30,borderBottomLeftRadius:30,backgroundColor:'#4a87d7',padding:20}}>
            <View style={{}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{fontSize:20,fontWeight:'700',color:'white'}}>Hello, {doctordetail.name}</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity onPress={profile} style={{marginRight:10}}>
            <Image style={{height:30,width:30}} source={require('../Assets/bottomprofile.png')}/>
            {/* <Image style={{height:30,width:30}} source={require('../Assets/notification.png')}/> */}
            </TouchableOpacity>
            <TouchableOpacity onPress={notification}>
            <Image style={{height:25,width:25}} source={require('../Assets/noti.png')}/>
            </TouchableOpacity>
            </View>
         
              </View>
        {/* <Text style={{fontSize:15,fontWeight:'300',color:'white'}}>How are you doing?</Text> */}
            </View>
   
        </View>
        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ height: 60, width: '45%', backgroundColor: '#4e93e1', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 14 }}>Total Patient </Text>
              <Text style={{ color: 'white', fontSize: 18 }}>{totalPatients}</Text>
            </View>

            <View style={{ height: 60, width: '45%', alignItems: 'center', backgroundColor: '#f3a25b', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 14 }}>Total Appointments </Text>
              <Text style={{ color: 'white', fontSize: 18 }}>{usersArray}</Text>
            </View>

          </View>

<ScrollView>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.bottomText}>Today's Appointments</Text>

            {apiData.length === 0 ? (
              <View
                style={{
                  margin: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{ height: '65%', width: '65%' }}
                  resizeMode="contain"
                  source={require('../Assets/null.png')}
                />
              </View>
            ) : (
              <FlatList
                data={apiData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                style={{
                  // backgroundColor: 'blue',
                  // height: height * 0.2,
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            )}
            
          </View>
          </ScrollView>
        </View>
    </View>
  );
};

function getDayName(year, month, day) {
  const date = new Date(year, month, day);
  const dayIndex = date.getDay();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[dayIndex];
}

export default Dashboard;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch', 'contain', etc.
    justifyContent: 'center',
    height: 150, // Adjust the height as needed
    borderRadius: 20, // Optional: Apply border radius to the image
  },

  overlay: {
    height: 150,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
    padding: 10,
  },
  text1: {
    fontSize: 16,
    fontFamily: 'NunitoSans_7pt-Regular',
  },
  dateText: {
    fontSize: 15,
    fontWeight: '500',
  },
  searchInput: {
    backgroundColor: '#f4f4f4',
    // padding: 10,
    margin: 10,
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: 'gray',
    fontFamily: 'NunitoSans_7pt-Regular',
  },
  cardContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
    margin: 10,
  },
  imageContainer: {
    // marginBottom: 5,
    // alignItems:'center'
  },
  image: {
    width: 30,
    height: 20,
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
    fontSize: 17,
    letterSpacing: 1,
    fontFamily: 'Domine-Bold',
    marginLeft: 12,
  },
  bottomText1: {
    fontSize: 18,
    fontFamily: 'Domine-Bold',
    bottom: 8,
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
    backgroundColor: '#49b2e9',
    alignItems: 'center',
    borderRadius: 30,
    width: Dimensions.get('window').width * 0.25,
    height: 52,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  UpcomingHeaderText: {
    backgroundColor: '#294473',
    height: height * 0.03,
    width: width * 0.2,
    // alignSelf: 'center',
    textAlign: 'center',
    borderRadius: 12,
    color: '#FFF',
  },
});
