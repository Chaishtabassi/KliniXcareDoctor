import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Button,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { height } from '../Authentication/Siigninscreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { CheckBox } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';

const Patientdetails = ({ route, navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ModalVisible, setModalVisibl] = useState(false);
  const [diagnosed, setdiagnosed] = useState('0');
  const [charges, setcharges] = useState('0');
  const [diagnosedError, setDiagnosedError] = useState('');
  const { height, width } = Dimensions.get('screen');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisibl, setModalVisib] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [medicalpre, setmedicalpre] = useState(true);
  const [isModalVisiblerefer, setModalVisiblerefer] = useState(false);
  const [refer, setRefer] = useState(null);
  const[namerefer,setnamerefer]=useState('')
   const [slottime, setslottime] = useState('')

  const handleButtonPress = () => {
    setModalVisiblerefer(!isModalVisiblerefer);
  };

  const closeModal = () => {
    setModalVisiblerefer(false);
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleModa = () => {
    setModalVisib(!isModalVisibl);
  };
  const canceltooglemodal = () => {
    setcancelmodalvisible(!cancelmodalvisible);
  };

  const toggleCalendarModal = () => {
    setShowCalendarModal(!showCalendarModal);
  };

  const Model = () => {
    setModalVisibl(!ModalVisible);
  }

  const cancelmodal = () => {
    setcancelmodalvisible(!cancelmodalvisible);
  }

  const [cancelmodalvisible, setcancelmodalvisible] = useState(false);

  const medical = patien => {
    navigation.navigate('medical', { selectedpatien: patien });
    console.log(patien);
  };

  const selectedpatient = route.params ? route.params.selectedpatient : null;

  useFocusEffect(
    React.useCallback(() => {
      console.log(selectedpatient.status)
      if (selectedpatient.status == 1) {
        setShow(false);
        setmedicalpre(false)
      } else if (selectedpatient.status == 3) {
        sethide_btns(false);
        setmedicalpre(false)
      } else if (selectedpatient.status == 2) {
        setShow(false);
        sethide_btns(false)
      } else if (selectedpatient.status == 0) {
        // setShow(false);
        setmedicalpre(false)
      }else if (selectedpatient.status == 5) {
        setShow(false);
        setmedicalpre(false)
      }

      const Referapi = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;

        const storedoctorid = await AsyncStorage.getItem('doctor_id');

        try {
          const api = `http://teleforceglobal.com/doctor/api/v1/getDotors`;
          const authToken = bearerToken;
          const formData = new FormData();

          formData.append('doctor_id', storedoctorid);
          formData.append('appointment_date', selectedpatient.date);

          console.log('hello', formData);
          console.log(formattedDate);

          const response = await fetch(api, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            body: formData,
          });

          if (response) {
            const responseText = await response.text();
            const responseData = JSON.parse(responseText);
            console.log('helo',responseText);

            setRefer(responseData.data);
            if (responseData.status === false) {
              Toast.show({
                type: 'error',
                text1: responseData.message,
              });
            } else {
              // setModalVisib(true);
            }
          }
        } catch (error) {
          console.error('erorrr', error);
        }
      };

      Referapi()

    }, []),
  );

  const refernameapi =async()=>{
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/referTo`;
      const authToken = bearerToken;
      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('newDoctor_id', namerefer);
      formData.append('slot_id', slottime);

      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        const responseText = await response.text();
        const responseData = JSON.parse(responseText);
        console.log('helo',responseText);

        if (responseData.status === false) {
          Toast.show({
            type: 'error',
            text1: responseData.message,
          });
        } else {
          setModalVisiblerefer(false);
          Toast.show({
            type: 'success',
            text1: responseData.message,
          });
          // setModalVisib(true);
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  }

  const referid = (item)=>{
    console.log(item)
    setnamerefer(item.id);
    setslottime(null);
  }

  const [show, setShow] = useState(true);

  const [hide_btns, sethide_btns] = useState(true);
  const [reason, setreson] = useState('')

  const Reschedule = async () => {
    console.log("inside");
    setShowCalendarModal(true);
  }


  // const handleDateChange = async (event, date) => {
  //   var compare = new Date();
  //   if(moment(date).format('YYYY-MM-DD') != moment(compare).format('YYYY-MM-DD')){
  //     setShowCalendarModal(false);
  //     if (selectedDate) {
  //       const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
  //       const dateObject = new Date(formattedDate); // Convert to Date object
  //       setSelectedDate(dateObject);
  //       console.log(formattedDate);

  //       await Slotsbydate(formattedDate);
  //       if (slots.length > 0) {
  //         setSelectedTime(slots[0]);
  //       }
  //     }
  //   }
  // };

  const handleDateChange = async (event, selectedDate) => {
    console.log(selectedDate);
    setShowCalendarModal(false);
    if (event.type === 'dismissed') {
      // Calendar closed without selecting a date, no action needed
      return;
    }
    if (selectedDate) {
      setSelectedDate(selectedDate); // Update to use the selectedDate directly
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      await Slotsbydate(formattedDate);
    }
  };
  

  const Rescheduleapi = async (selectedDate) => {
    console.log(selectedDate)
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    console.log('Formatted date:', formattedDate);
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/rescheduleAppointmentByDoctor`;
      const authToken = bearerToken;
      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('date', formattedDate);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('slot_id', selectedTime.id);

      console.log('hello', formData);
      console.log(formattedDate);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response) {
        const responseText = await response.text();
        const responseData = JSON.parse(responseText);
        console.log(responseText);

        if (responseData.status === false) {
          Toast.show({
            type: 'error',
            text1: responseData.message,
          });
        } else {
          Toast.show({
            type: 'success',
            text1: responseData.message,
          });
          setModalVisib(false);
          navigation.navigate('Request')
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };


  const Slotsbydate = async (formattedDate) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/fetchDoctorSlotsByDate`;
      const authToken = bearerToken;
      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('date', formattedDate);

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
          setModalVisib(true);
          setSlots(responseData.data);
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  }

  const rejected = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/declineAppointment`;
      const authToken = bearerToken;
      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('reason', reason);
      formData.append('status', 3);

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
          console.log(responseData.message);

          if (responseData.message == 'Appointment declined successfully') {
            sethide_btns(false);
            canceltooglemodal();
            Toast.show({
              text1: 'Your Appointment is declined',
              type: 'success',
            });
          } else {
            Toast.show({
              text1: 'This appointment cant be declined!',
              type: 'error',
            });
          }
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const completeapi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/completeAppointment`;
      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('status', 2);

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
          console.log(responseData.message);

          if (responseData.message == 'Appointment completed successfully') {
            Toast.show({
              text1: 'Your Appointment is completed',
              type: 'success',
            });
            setShow(false)
            setmedicalpre(false)
            sethide_btns(false)
          navigation.navigate('Request')
          } else {
            Toast.show({
              text1: 'This booking cant be completed!',
              type: 'error',
            });
          }
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const additionalcharges = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/addAdditionalCharges`;
      const authToken = bearerToken;
      console.log('API acceptAppointment');
      const formData = new FormData();

      formData.append('appointment_id', selectedpatient.id);
      formData.append('additional_charge', charges);

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
          console.log('add', responseData);
          Model();
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  }

  const discountapi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/addDiscountAmount`;
      const authToken = bearerToken;
      console.log('API acceptAppointment');
      const formData = new FormData();

      formData.append('appointment_id', selectedpatient.id);
      formData.append('discount_amount', diagnosed);

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
          toggleModal();
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  }

  const callapi = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/acceptAppointment`;
      const authToken = bearerToken;
      console.log('API acceptAppointment');
      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('appointment_id', selectedpatient.id);
      formData.append('status', 1);

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
          console.log(responseData.message);

          if (responseData.message == 'Appointment accepted successfully') {
            setShow(false);
            Toast.show({
              text1: 'Your Appointment is Accepted',
              type: 'success',
            });
          } else {
            Toast.show({
              text1: 'This appointment cant be accepted!',
              type: 'error',
            });
          }
        }
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  };

  const dateStr = selectedpatient.created_at;
  const formattedDate = new Date(dateStr).toISOString().split('T')[0];

  const date = new Date(dateStr);
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const handleDateSelect = async(date) => {
    console.log(date)
    setSelectedDate(date);
    setShowCalendarModal(false);
    // You can perform additional actions here with the selected date

    setShowCalendarModal(false);
    if (date) {
      setSelectedDate(date); 
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      await Slotsbydate(date);
    }
  };

  const handlePress = (patient) => {
    navigation.navigate('labrequest', { selectedpatient: patient });
  };

  return (
    // <ScrollView>
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4e93e1',
          height: '7%',
        }}>
        <TouchableOpacity onPress={handleBackButtonPress}>
          <Image
            resizeMode="contain"
            style={{
              height: height * 0.02,
              width: width * 0.04,
              tintColor: 'white',
              left: 10,
            }}
            source={require('../Assets/BackButton.png')}></Image>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text
            style={{
              fontSize: height * 0.02,
              bottom: 4,
              paddingRight: 12,
              fontWeight: '700',
              color: '#FFF',
            }}>
            {selectedpatient.appointment_number}
          </Text>
          {/* <Text
            style={{
              fontSize: 12,
              fontWeight: '700',
              paddingRight: 12,
            }}>
            {selectedpatient.appointment_number}
          </Text> */}
        </View>
      </View>
      <ScrollView>
        {selectedpatient && (
          <View style={styles.itemContainer}>
            <View style={{ flexDirection: 'row', }}>
              <Image
                style={{ height: 80, width: 80 }}
                resizeMode="contain"
                source={require('../Assets/patientimage.jpg')}
              />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: 'NunitoSans_7pt-Bold',
                    color: 'black',
                  }}>
                  {selectedpatient.user.fullname}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontFamily: 'Domine-Regular' }}>
                    {new Date(selectedpatient.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </Text>

                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                      marginLeft: 10,
                    }}>
                    {selectedpatient.user.gender === 0 ? 'Female' : 'Male'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'NunitoSans_7pt-Light',
                    color: 'grey',
                  }}>
                  {selectedpatient.time_range}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.itemContainer1}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Date</Text>
            <Text style={styles.description}>{selectedpatient.date}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={styles.heading}>Time</Text>
            <Text style={styles.description}>{selectedpatient.time_range}</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Type</Text>
            <Text style={styles.description}>
              {selectedpatient.type === 0 ? 'At Clinic' : 'Online'}
            </Text>
          </View>
        </View>

        <View style={styles.itemContainer1}>
          <Text style={styles.heading}>Consultation Charge</Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
            <Image style={{ height: 15, width: 15 }} source={require('../Assets/peso.png')} />
            <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
              {selectedpatient.service_amount}
            </Text>
          </View>
        </View>

        <View style={{ margin: 10, marginLeft: 16 }}>
          <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Light' }}>
            Problem
          </Text>
        </View>

        <View style={styles.itemContainer1}>
          <Text style={styles.heading}>{selectedpatient.problem}</Text>
        </View>

        {!show &&
          <View>
            <TouchableOpacity onPress={toggleModal} style={{ margin: 10, marginLeft: 16 }}>
              <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Light' }}>Add Discount</Text>
            </TouchableOpacity>

            <View style={styles.itemContainer1}>
              <Text style={styles.heading}>Discount</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
                  {diagnosed}%
                </Text>
              </View>
            </View>

            <TouchableOpacity style={{ margin: 10, marginLeft: 16 }} onPress={Model}>
              <Text style={{ fontSize: 17, fontFamily: 'NunitoSans_7pt-Light' }}>
                Add Additional Charges
              </Text>
            </TouchableOpacity>

            <View style={styles.itemContainer1}>
              <Text style={styles.heading}>Additional Charges</Text>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 15, fontFamily: 'NunitoSans_7pt-Bold', color: 'black' }}>
                  {charges}
                </Text>
              </View>
            </View>

            <View style={styles.itemContainer1}>
        <Text style={styles.heading}>Lab Request</Text>
        <TouchableOpacity onPress={() => handlePress(selectedpatient)}>
          <Icon name='keyboard-arrow-right' size={25} />
        </TouchableOpacity>
      </View>

          </View>
        }


        {medicalpre &&
          <View>

            <View style={styles.itemContainer1}>
              <Text style={styles.heading}>Medical Prescription</Text>
              <TouchableOpacity onPress={() => medical(selectedpatient)}>
                <Icon name='keyboard-arrow-right' size={25} />
              </TouchableOpacity>
            </View>


          </View>
        }

  <View style={{marginHorizontal:10}}>
  <TouchableOpacity style={styles.button} onPress={Reschedule}>
                  <Text style={styles.buttonText}>Reschedule</Text>
                </TouchableOpacity>
  </View>

        {medicalpre &&

          <TouchableOpacity
            onPress={handleButtonPress}
            style={styles.button2}
          >
            <Text style={styles.medical}>Refer</Text>
          </TouchableOpacity>
        }

        {hide_btns &&
          <View style={{ flexDirection: 'column', margin: 10 }}>

            {!show &&
              <View>
                {/* <TouchableOpacity style={styles.button} onPress={() => chat(selectedpatient)}>
                  <Text style={styles.buttonText}>Messages</Text>
                </TouchableOpacity> */}

                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => medical(selectedpatient)}>
                  <Text style={styles.medical}>Encounter</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button2}
                  // onPress={toggleModal}
                  onPress={completeapi}>
                  <Text style={styles.buttonText1}>Complete Appointment</Text>
                </TouchableOpacity>
              </View>
            }

            {show &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity style={styles.button} onPress={callapi}>
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={cancelmodal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        }

        <View style={{ height: 20 }}></View>

        <Modal
  visible={isModalVisiblerefer}
  animationType="slide"
  transparent={true}
  onRequestClose={closeModal}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalConte}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: 'black',
            fontFamily: 'NunitoSans_7pt-Bold',
          }}>
          Refer to
        </Text>
        <TouchableOpacity
          onPress={handleButtonPress}
          style={{
            backgroundColor: '#deeefd',
            borderRadius: 20,
            padding: 5,
          }}>
          <Image
            resizeMode="contain"
            style={{
              height: height * 0.02,
              width: width * 0.03,
              marginTop: 1,
            }}
            source={require('../Assets/CloseIcon.png')}
          />
        </TouchableOpacity>
      </View>
      <Text style={{fontSize:14,fontWeight:'400'}}>Select Doctor and then their slots available </Text>
      {refer && refer.length > 0 && (
        <FlatList
          data={refer}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => (
            <View>

              <TouchableOpacity style={{ paddingVertical: 10 }} onPress={() => referid(item)}>
                <Text style={{ fontSize: 16, fontWeight: '400', color: 'black' }}>{item.name}</Text>
                </TouchableOpacity>

                {item.slots && item.slots.length > 0 ? (
                <FlatList
                  data={item.slots}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        console.log(item.id);
                        setslottime(item.id);
                        console.log('id',item.id)
                        setSelectedTime(item);
                      }}
                      style={[
                        styles.timeContainer,
                        selectedTime === item
                          ? { backgroundColor: '#49b2e9' }
                          : { backgroundColor: '#e3e1da' },
                      ]}
                    >
                      <Text
                        style={[
                          styles.date,
                          selectedTime === item
                            ? { color: 'white' }
                            : { color: 'black' },
                        ]}
                      >
                        {item.time_range}
                      </Text>
                      {item.is_break === "1" && (
                        <Text style={{ fontSize: 12, color: 'red' }}>
                          {item.description}
                        </Text>
                      )}
                    </TouchableOpacity>
                  )}
                />
              ) : (
                <Text>No slots available</Text>
              )}
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.butto} onPress={refernameapi}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>



        <Modal
          animationType="slide"
          transparent={true}
          visible={showCalendarModal}
          onRequestClose={()=>  setShowCalendarModal(false)}>
          <View style={{ flex: 1, justifyContent: 'center'}}>
          <Calendar
            onDayPress={(day) => handleDateSelect(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue' }
            }}
          />
          </View>
        </Modal>

        <Modal
          animationType="slide" // Slide animation from bottom to top
          transparent={true}
          visible={ModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '800',
                    color: 'black',
                    fontFamily: 'NunitoSans_7pt-Bold',
                  }}>
                  Additional Charges
                </Text>
                <TouchableOpacity
                  onPress={Model}
                  style={{
                    backgroundColor: '#deeefd',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: height * 0.02,
                      width: width * 0.03,
                      marginTop: 1,
                    }}
                    source={require('../Assets/CloseIcon.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ top: 20 }}>
                {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      Discount percent:
                    </Text> */}
                <TextInput
                  value={charges}
                  onChangeText={setcharges}
                  keyboardType='numeric'
                  placeholder={selectedpatient.diagnosed_with}
                  multiline
                  placeholderTextColor={'black'}
                  style={{ backgroundColor: '#f4f4f4', top: 10 }}
                />
              </View>
              <TouchableOpacity style={styles.buttons} onPress={additionalcharges}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide" // Slide animation from bottom to top
          transparent={true}
          visible={cancelmodalvisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '800',
                    color: 'black',
                    fontFamily: 'NunitoSans_7pt-Bold',
                  }}>
                  Reason for canceling an appointment
                </Text>
                <TouchableOpacity
                  onPress={cancelmodal}
                  style={{
                    backgroundColor: '#deeefd',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: height * 0.02,
                      width: width * 0.03,
                      marginTop: 1,
                    }}
                    source={require('../Assets/CloseIcon.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ top: 20 }}>
                {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      Discount percent:
                    </Text> */}
                <TextInput
                  value={reason}
                  onChangeText={setreson}
                  placeholder=''
                  multiline
                  placeholderTextColor={'black'}
                  style={{ backgroundColor: '#f4f4f4', top: 10 }}
                />
              </View>
              <TouchableOpacity style={styles.buttons} onPress={rejected}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisibl}
          onRequestClose={() => {
            setModalVisib(!isModalVisibl);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalConten}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '800',
                    color: 'black',
                    fontFamily: 'NunitoSans_7pt-Bold',
                  }}
                >
                  Slots Available
                </Text>
                <TouchableOpacity
                  onPress={toggleModa}
                  style={{
                    backgroundColor: '#deeefd',
                    borderRadius: 20,
                    padding: 5,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{
                      height: height * 0.02,
                      width: width * 0.03,
                      marginTop: 1,
                    }}
                    source={require('../Assets/CloseIcon.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ top: 15 }}>
                {slots !== undefined ? (
                  <View style={{ marginLeft: 10 }}>
                    {slots.length > 0 ? (
                      <FlatList
                        data={slots}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => {
                              console.log(item.id);
                              setSelectedTime(item);
                            }}
                            style={[
                              styles.timeContainer,
                              selectedTime === item
                                ? { backgroundColor: '#49b2e9' }
                                : { backgroundColor: '#e3e1da' },
                            ]}
                          >
                            <Text
                              style={[
                                styles.date,
                                selectedTime === item
                                  ? { color: 'white' }
                                  : { color: 'black' },
                              ]}
                            >
                              {item.time_range}
                            </Text>
                            {item.is_break === '1' && (
                              <Text style={{ fontSize: 12, color: 'red' }}>
                                {item.description}
                              </Text>
                            )}
                          </TouchableOpacity>
                        )}
                      />
                    ) : (
                      <Text style={{ marginLeft: 10 }}>No slots available</Text>
                    )}
                  </View>
                ) : (
                  <Text style={{ marginLeft: 10 }}>No slots available</Text>
                )}
              </View>

              <TouchableOpacity style={styles.buttons} onPress={() => Rescheduleapi(selectedDate)}>
  <Text style={styles.buttonText}>Submit</Text>
</TouchableOpacity>


            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide" // Slide animation from bottom to top
          transparent={true}
          visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '800',
                    color: 'black',
                    fontFamily: 'NunitoSans_7pt-Bold',
                  }}>
                  Discount
                </Text>
                <TouchableOpacity
                  onPress={toggleModal}
                  style={{
                    backgroundColor: '#deeefd',
                    borderRadius: 20,
                    padding: 5,
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: height * 0.02,
                      width: width * 0.03,
                      marginTop: 1,
                    }}
                    source={require('../Assets/CloseIcon.png')}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ top: 20 }}>
                {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      Discount percent:
                    </Text> */}
                <TextInput
                  value={diagnosed}
                  onChangeText={setdiagnosed}
                  keyboardType='numeric'
                  placeholder={selectedpatient.diagnosed_with}
                  multiline
                  placeholderTextColor={'black'}
                  style={{ backgroundColor: '#f4f4f4', top: 10 }}
                />
              </View>
              <TouchableOpacity style={styles.buttons} onPress={discountapi}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Patientdetails;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#e3e1da',
    top: 5
  },
  modalContainer: {
    flex: 1,
    // height: height * 0.1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  timeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
    borderRadius: 10,
    width: 160,
    height: 60,
  },
  modalConte: {
    height: height * 0.50,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalContent: {
    height: height * 0.35,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalConten: {
    height: height * 0.30,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  itemContainer: {
    margin: 10,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
  },
  itemContainer1: {
    margin: 10,
    backgroundColor: '#f6f8fb',
    borderRadius: 5,
    padding: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 17,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: 'black',
  },
  description: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: '#49b2e9',
    top: 5,
  },
  description1: {
    fontSize: 15,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: '#49b2e9',
  },
  button: {
    backgroundColor: '#4e93e1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  butto: {
    backgroundColor: '#4d91e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    height: 50,
  },
  buttons: {
    backgroundColor: '#4d91e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: height * 0.1,
    height: 50,
  },
  button1: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  button2: {
    backgroundColor: '#e0f0e3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 18,
  },
  medical: {
    color: '#4e93e1',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonText1: {
    color: '#67b774',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 18,
  },
  buttonac: {
    backgroundColor: '#4e93e1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    width: '45%',
  },
  buttonrj: {
    backgroundColor: '#4e93e1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 50,
    width: '45%',
  },
});
