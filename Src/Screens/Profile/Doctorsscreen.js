import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { height, width } from '../../Authentication/Siigninscreen';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import Backbutton from '../../Component/Backbutton';

const Doctorsscreen = ({ navigation }) => {
  const [serviceLocations, setServiceLocations] = useState([]);
  const [selectedServiceLocation, setSelectedServiceLocation] = useState(serviceLocations[0]?.id || '');

  useFocusEffect(
    React.useCallback(() => {
      getslots();
      Servicelocation();
    }, []),
  );

  const [keys, setKeys] = useState(["0", "1", "2", "3", "4", "5", "6"]);

  const getslots = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(access_token)
    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `https://espinarealty.com/doctor/api/v1/getSlots`;
      const authToken = bearerToken;
      const formData = new FormData();
      formData.append('doctor_id', storedoctorid);
      console.log(formData)
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
          setApiData(responseData.data);
          // setKeys(Object.keys(responseData.data));

          console.log('gettttttttttttttt', responseData.data)
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

  day_fuc = (e) => {
    if (e == 'Monday') {
      return 1;
    }
    if (e == 'Tuesday') {
      return 2
    }
    if (e == 'Wednesday') {
      return 3
    }
    if (e == 'Thursday') {
      return 4
    }
    if (e == 'Friday') {
      return 5
    }
    if (e == 'Saturday') {
      return 6
    }
    if (e == 'Sunday') {
      return 0
    }
  }


  const Servicelocation = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const storedoctorid = await AsyncStorage.getItem('doctor_id');
    const bearerToken = access_token;

    try {
      const api = `https://espinarealty.com/doctor/api/v1/getServiceLocations`;

      const authToken = bearerToken;
      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log('servise', responseData.data);
          setServiceLocations(responseData.data);
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

  const callApi = async (formattedStartTime, formattedEndTime) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `https://espinarealty.com/doctor/api/v1/addSlot`;

      const authToken = bearerToken;

      const formData = new FormData();
      console.log(dayname);
      var send_day = await day_fuc(dayname);

      formData.append('doctor_id', storedoctorid);
      formData.append('start_time', formattedStartTime);
      formData.append('end_time', formattedEndTime);
      formData.append('max_appointment', maxAppointments);
      formData.append('date', calenderdate);
      formData.append('location_id', selectedServiceLocation);

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
          Toast.show({
            text1: responseData.message,
            type: 'error', // You can adjust the type based on your styling
          });
          closeModal()
          getslots()
          // setaddslot(responseData.data);
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


  const editapi = async (formattedStartTim, formattedEndTim) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `https://espinarealty.com/doctor/api/v1/editSlot`;

      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('start_time', formattedStartTim);
      formData.append('end_time', formattedEndTim);
      formData.append('max_appointment', editappointment);
      formData.append('slot_id', selectedSlot.id);
      formData.append('location_id', selectedServiceLocation);

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
          cancelmodal()
          getslots()
          // setaddslot(responseData.data);
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

  const [apiData, setApiData] = useState([]);

  const getWeekday = (dayNumber) => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[dayNumber - 1]; // Adjust the index
  };

  const [editmodal, seteditmodal] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWeekday, setSelectedWeekday] = useState('Monday');
  const [maxAppointments, setMaxAppointments] = useState('1');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dayname, setDayname] = useState('');
  const [editappointment, setappointment] = useState('')
  const [editenttime, seteditendtime] = useState('')
  const [editstarttime, seteditstarttime] = useState('')
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [editisDatePickerVisible, seteditDatePickerVisibility] = useState(false);
  const [editisEndTimePickerVisible, seteditEndTimePickerVisibility] = useState(false);
  const [editisStartTimePickerVisible, seteditStartTimePickerVisibility] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);


  const openModal = () => {
    setModalVisible(true);
    setappointment
  };

  const Editmodal = (item) => {
    seteditmodal(true)
    setSelectedSlot(item);
    seteditstarttime(item.start_time)
    seteditendtime(item.end_time)
    setappointment(item.max_appointment)
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  const cancelmodal = () => {
    seteditmodal(false);
  };

  const handleAddAppointment = () => {
    const formattedStartTime = moment(startTime, 'hh:mm A').format('HH:mm');
    const formattedEndTime = moment(endTime, 'hh:mm A').format('HH:mm');

    callApi(formattedStartTime, formattedEndTime);
  };

  const handleAddAppointmen = (selectedSlot) => {
    const formattedStartTim = moment(editstarttime, 'hh:mm A').format('HH:mm');
    const formattedEndTim = moment(editenttime, 'hh:mm A').format('HH:mm');

    editapi(formattedStartTim, formattedEndTim);
  };


  const renderItem = ({ item }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    // Safe access to hospital_title
    const hospitalTitle = item.location ? item.location.hospital_title : 'No location specified';

    return (
      <View style={styles.itemContainer}>
        <View style={{ backgroundColor: '#dbe6f9', borderRadius: 20, padding: 10, width: '75%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ fontSize: 14, fontFamily: 'NunitoSans_7pt-Light', color: '#4e93e1' }}>
              {formatDate(item.date)}
            </Text>
            <Text>{hospitalTitle}</Text>
            <Text>{item.start_time}-{item.end_time}</Text>
          </View>

          <TouchableOpacity onPress={() => handlePress(item)}>
            <Icon name='closecircle' size={20} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            console.log(item);
            Editmodal(item);
          }}>
            <Icon name='edit' size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };


  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState(null);

  const handleDelete = async () => {
    if (slotToDelete) {
      setDeleteModalVisible(false);
      await deleteslot(slotToDelete);
    }
  };


  const handlePress = (item) => {
    setSlotToDelete(item);
    setDeleteModalVisible(true);
  };



  const deleteslot = async (e) => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const api = `https://espinarealty.com/doctor/api/v1/deleteSlot`;
      const authToken = bearerToken;
      const formData = new FormData();
      formData.append('slot_id', e.id);
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
          getslots()
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

  const filter = () => {
    navigation.navigate('filter');
  };

  const dropdownData = serviceLocations.map(location => ({
    label: location.hospital_title,
    value: location.id,
  }));

  const daynames = (key) => {
    if (key == 1) {
      return 'Monday';
    }
    else if (key == 2) {
      return 'Tuesday';
    }
    else if (key == 3) {
      return 'Wednesday';
    }
    else if (key == 4) {
      return 'Thursday';
    }
    else if (key == 5) {
      return 'Friday';
    }
    else if (key == 6) {
      return 'Saturday';
    }
    else if (key == 0) {
      return 'Sunday';
    }
  }

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleStartTimeConfirm = (date) => {
    setStartTime(date.toLocaleTimeString());
    hideStartTimePicker();
  };

  const handleEndTimeConfirm = (date) => {
    setEndTime(date.toLocaleTimeString());
    hideEndTimePicker();
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const handleConfirm = (date) => {
    setStartTime(date.toLocaleTimeString());
    setDatePickerVisibility(false);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showDatePicke = () => {
    seteditDatePickerVisibility(true);
  };
  const handleConfir = (date) => {
    seteditstarttime(date.toLocaleTimeString());
    seteditDatePickerVisibility(false);
  };
  const hideDatePicke = () => {
    seteditDatePickerVisibility(false);
  };

  const showEndTimePicke = () => {
    seteditEndTimePickerVisibility(true);
  };

  const hideEndTimePicke = () => {
    seteditEndTimePickerVisibility(false);
  };

  const handleEndTimeConfir = (date) => {
    seteditendtime(date.toLocaleTimeString());
    hideEndTimePicke();
  };
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const handleDateSelect = async (date) => {
    console.log(date)
    setSelectedDate(date);
    setShowCalendarModal(false);

    setShowCalendarModal(false);
    if (date) {
      setSelectedDate(date); // Update to use the selectedDate directly
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      openModal();
      setcalenderdate(date)
      // await callApi(date);
    }
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calenderdate, setcalenderdate] = useState('')
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4e93e1',
          height: '7%',
        }}>
     <Backbutton/>
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
            Appointment Slots
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={{ margin: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Add appointment slots</Text>
        </View>

        <View>

          <Calendar
            onDayPress={(day) => handleDateSelect(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: '#4e93e1' }
            }}
          />


          {/* <Modal
        animationType="slide"
        transparent={true}
        visible={showCalendarModal}
        onRequestClose={() => setShowCalendarModal(false)}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
 

<Calendar
            onDayPress={(day) => handleDateSelect(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue' }
            }}
          />
        </View>
      </Modal> */}
        </View>
        {/* <View>
          <FlatList
            data={keys}
            renderItem={({ item: key }) => (
              <View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                  <Text style={{
                    fontSize: 17,
                    fontFamily: 'NunitoSans_7pt-Bold',
                    color: 'black',
                    fontWeight: '700'
                  }}>{daynames(key)}</Text>

                  <TouchableOpacity onPress={
                    () => {
                      openModal();
                      if (key == 1) {
                        setDayname('Monday');
                      }
                      if (key == 2) {
                        setDayname('Tuesday');
                      }
                      if (key == 3) {
                        setDayname('Wednesday');
                      }
                      if (key == 4) {
                        setDayname('Thursday');
                      }
                      if (key == 5) {
                        setDayname('Friday');
                      }
                      if (key == 6) {
                        setDayname('Saturday');
                      }
                      if (key == 0) {
                        setDayname('Sunday');
                      }
                    }
                  }>

                    <Text style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: '#4e93e1',
                      fontWeight: '700',
                    }}>Add</Text>

                  </TouchableOpacity>

                </View>
                <FlatList
                  data={apiData[key]}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                />
              </View>
            )}
          />
        </View> */}

        <FlatList
          data={apiData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />

        <Modal
          transparent={true}
          animationType="slide"
          visible={editmodal}
          onRequestClose={cancelmodal}>
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center' }}>
            <View style={{
              height: height * 0.55,
              width: '90%',
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}>
              <Text style={{ color: '#4e93e1', fontSize: 18, fontWeight: '500', margin: 10 }}>Edit Slot</Text>

              <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>Maximum Appointment </Text>
              <View style={{ backgroundColor: '#f9f9f9' }}>

                {/* <Picker
                  selectedValue={selectedServiceLocation}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log("Selected Value:", itemValue);
                    setSelectedServiceLocation(itemValue);
                  }}
                >
                  {serviceLocations.map(location => (
                    <Picker.Item key={location.id} label={location.hospital_title} value={location.id} />
                  ))}
                </Picker> */}
                <Dropdown
                  style={[{ height: 40, margin: 10 }, isFocus && { borderColor: 'blue', height: 50 }]}
                  placeholderStyle={{ color: 'black' }}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dropdownData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={selectedServiceLocation}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSelectedServiceLocation(item.value);
                    setIsFocus(false);
                    console.log("Selected Value:", item.value);
                  }}
                />


                <Picker
                  style={{ backgroundColor: '#f9f9f9', }}
                  selectedValue={editappointment}
                  onValueChange={(itemValue) => setappointment(itemValue)}>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4 " value="4 " />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                  <Picker.Item label="7" value="7" />
                  <Picker.Item label="8" value="8" />
                  <Picker.Item label="9" value="9" />
                  <Picker.Item label="10" value="10" />
                </Picker>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>Start Time </Text>

                  <View style={{ backgroundColor: '#f9f9f9', margin: 10, width: width * 0.35 }}>
                    <TouchableOpacity onPress={showDatePicke}>
                      <TextInput
                        placeholder=""
                        value={editstarttime}
                        style={{ marginLeft: 10 }}
                        placeholderTextColor={'black'}
                        onChangeText={(text) => seteditstarttime(text)}
                        editable={false}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={editisDatePickerVisible}
                      mode="time"
                      onConfirm={handleConfir}
                      onCancel={hideDatePicke}
                    />
                  </View>
                </View>

                <View>
                  <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>End Time </Text>

                  <View style={{ backgroundColor: '#f9f9f9', margin: 10, width: width * 0.35 }}>
                    <TouchableOpacity onPress={showEndTimePicke}>
                      <TextInput
                        placeholder=""
                        value={editenttime}
                        style={{ marginLeft: 10 }}
                        placeholderTextColor={'black'}
                        onChangeText={(text) => seteditendtime(text)}
                        editable={false}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={editisEndTimePickerVisible}
                      mode="time"
                      onConfirm={handleEndTimeConfir}
                      onCancel={hideEndTimePicke}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <TouchableOpacity style={styles.button} onPress={() => handleAddAppointmen(selectedSlot)}>
                  <Text style={styles.buttonText1}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={cancelmodal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </Modal>

        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center' }}>
            <View style={{
              height: height * 0.57,
              width: '90%',
              backgroundColor: 'white',
              padding: 13,
              borderRadius: 10,
              elevation: 5,
            }}>
              <Text style={{ color: '#4e93e1', fontSize: 18, fontWeight: '500', margin: 10 }}>Add Slot ({dayname})</Text>
              <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>Service Location</Text>
              <View style={{ backgroundColor: '#f9f9f9' }}>
                {/* <Picker
                selectedValue={selectedServiceLocation}
                // onValueChange={(itemValue, itemIndex) => setSelectedServiceLocation(itemValue)}
                >
                {serviceLocations.map(location => (
                  <Picker.Item key={location.id} label={location.hospital_title} value={location.id} />
                ))}
              </Picker> */}

                {/* <Picker
                  style={{ backgroundColor: '#f9f9f9' }}
                  selectedValue={selectedServiceLocation}
                  onValueChange={(itemValue, itemIndex) => {
                    console.log("Selected Value:", itemValue);
                    setSelectedServiceLocation(itemValue);
                  }}
                >
                  {serviceLocations.map(location => (
                    <Picker.Item key={location.id} label={location.hospital_title} value={location.id} />
                  ))}
                </Picker> */}


                <Dropdown
                  style={[{ height: 40, margin: 10 }, isFocus && { borderColor: 'blue', height: 50 }]}
                  placeholderStyle={{ color: 'black' }}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={dropdownData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select item' : '...'}
                  searchPlaceholder="Search..."
                  value={selectedServiceLocation}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setSelectedServiceLocation(item.value);
                    setIsFocus(false);
                    console.log("Selected Value:", item.value);
                  }}
                />


              </View>
              <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>Maximum Appointment</Text>
              <View style={{ backgroundColor: '#f9f9f9' }}>

                <Picker
                  style={{ backgroundColor: '#f9f9f9', }}
                  selectedValue={maxAppointments}
                  onValueChange={(itemValue) => setMaxAppointments(itemValue)}>
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3" value="3" />
                  <Picker.Item label="4 " value="4 " />
                  <Picker.Item label="5" value="5" />
                  <Picker.Item label="6" value="6" />
                  <Picker.Item label="7" value="7" />
                  <Picker.Item label="8" value="8" />
                  <Picker.Item label="9" value="9" />
                  <Picker.Item label="10" value="10" />
                </Picker>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>Start Time </Text>

                  <View style={{ backgroundColor: '#f9f9f9', margin: 10, width: width * 0.35 }}>
                    <TouchableOpacity onPress={showDatePicker}>
                      <TextInput
                        placeholder=""
                        value={startTime}
                        style={{ marginLeft: 10 }}
                        placeholderTextColor={'black'}
                        // onChangeText={(text) => setStartTime(text)}
                        editable={false}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="time"
                      onConfirm={handleConfirm}
                      onCancel={hideDatePicker}
                    />
                  </View>
                </View>

                <View>
                  <Text style={{ fontSize: 16, color: 'black', margin: 10 }}>End Time </Text>

                  <View style={{ backgroundColor: '#f9f9f9', margin: 10, width: width * 0.35 }}>
                    {/* <TextInput
                    placeholder=""
                    value={endTime}
                    style={{ marginLeft: 10 }}
                    placeholderTextColor={'black'}
                    onChangeText={(text) => setEndTime(text)}
                  /> */}

                    <TouchableOpacity onPress={showEndTimePicker}>
                      <TextInput
                        placeholder=""
                        value={endTime}
                        style={{ marginLeft: 10 }}
                        placeholderTextColor={'black'}
                        editable={false}
                      />
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isEndTimePickerVisible}
                      mode="time"
                      onConfirm={handleEndTimeConfirm}
                      onCancel={hideEndTimePicker}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                <TouchableOpacity style={styles.button} onPress={handleAddAppointment}>
                  <Text style={styles.buttonText1}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1} onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
        </Modal>

        <Modal visible={isDeleteModalVisible} transparent={true}>
          <View style={{ flex: 1, justifyContent: 'center', margin: 20, borderRadius: 20 }}>
            <View style={{ backgroundColor: 'white', height: '25%', borderWidth: 1, borderColor: 'lightgrey' }}>
              <View style={{ margin: 10, justifyContent: 'space-evenly', flex: 1 }}>
                <Text style={{ color: '#4e93e1', fontSize: 18, fontWeight: '500' }}>Are you sure you want to delete this slot?</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={styles.button} onPress={() => setDeleteModalVisible(false)}>
                    <Text style={styles.buttonText1}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button1} onPress={handleDelete}>
                    <Text style={styles.buttonText}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </View>
  );
};

export default Doctorsscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    padding: 8,
    margin: 10,
    // backgroundColor: '#f9f9f9'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#4e93e1',
    justifyContent: 'center',

  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#4989d9',
    alignItems: 'center',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.30,
    height: 43,
    borderWidth: 1,
    borderColor: '#e3e1da',

  },
  buttonText: {
    color: '#4989d9',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  buttonText1: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 15,
  },
  button1: {
    justifyContent: 'center',
    // backgroundColor: '#888888',
    alignItems: 'center',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.30,
    height: 43,
    borderWidth: 1,
    borderColor: '#e3e1da',

  },
  title: {
    flex: 1,
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: '#e3e1da',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#49b2e9',
    alignItems: 'center',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.35,
    height: 50,
  },
  button1: {
    justifyContent: 'center',
    backgroundColor: '#888888',
    alignItems: 'center',
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.35,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
