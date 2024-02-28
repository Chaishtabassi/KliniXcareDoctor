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
    Button
  } from 'react-native';
  import React, { useState } from 'react';
  import { useFocusEffect } from '@react-navigation/native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import Icon from 'react-native-vector-icons/AntDesign';
  import { Picker } from '@react-native-picker/picker';
  import moment from 'moment';
  import {height, width} from '../../Authentication/Siigninscreen';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import Toast from 'react-native-toast-message';
import { Calendar } from 'react-native-calendars';

const Holidaysscreen = () => {
    const [holidaysData, setHolidaysData] = useState([]);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useFocusEffect(
        React.useCallback(() => {
          getholidays();
        }, []),
      );

      const addholiday = async () => {
        setShowCalendarModal(true);
      };
    
      const handleDateChange = async (event, selectedDate) => {
        setShowCalendarModal(false);
        if (selectedDate) {
          setSelectedDate(selectedDate); // Update to use the selectedDate directly
          const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
          await addholidayapi(formattedDate);
        }
      };

      const handleDateSelect = async(date) => {
        console.log(date)
        setSelectedDate(date);
        setShowCalendarModal(false);
    
        setShowCalendarModal(false);
        if (date) {
          setSelectedDate(date); // Update to use the selectedDate directly
          const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
          await addholidayapi(date);
        }
      };
    
      

      const addholidayapi =  async(formattedDate)=>{
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;
        console.log(bearerToken)
    
        const storedoctorid = await AsyncStorage.getItem('doctor_id');

        try {
            const api = `http://teleforceglobal.com/doctor/api/v1/addHoliday`;
            const authToken = bearerToken;
            const formData = new FormData();
            formData.append('doctor_id', storedoctorid);
            formData.append('date', formattedDate);

            console.log(formData)
        
            const response = await fetch(api, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
              body: formData,
            });
        
            if (response.status === 200) {
                const responseText = await response.text();
                const responseData = JSON.parse(responseText);
                console.log(responseData.data);
                getholidays();
            } else {
              console.error('Non-200 status code:', response.status);
            }
          } catch (error) {
            console.error('Error:', error);
          }
      }
      

      const getholidays = async ()=>{
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;
        console.log(bearerToken)
    
        const storedoctorid = await AsyncStorage.getItem('doctor_id');
    
        try {
          const api = `http://teleforceglobal.com/doctor/api/v1/getHolidays`;
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
              console.log(responseData.data);
              setHolidaysData(responseData.data);
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


      const deleteapi = async(item)=>{
        const { id } = item; 
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;
        console.log(bearerToken)
    
        const storedoctorid = await AsyncStorage.getItem('doctor_id');
    
        try {
          const api = `http://teleforceglobal.com/doctor/api/v1/deleteHoliday`;
          const authToken = bearerToken;
          const formData = new FormData();
          formData.append('holiday_id', id);
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
              console.log(responseData.data);
                  Toast.show({
      text1: 'Holiday deleted successful.',
      type: 'success',
    });
             getholidays()
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
    
  const handleBackButtonPress = () => {
    navigation.goBack();
  };


  return (
    <View style={{backgroundColor:'white',flex:1}}>
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4e93e1',
          height: '7%',
        }}>
        <TouchableOpacity
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
        </TouchableOpacity>
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
           Manage Holidays
          </Text>
        </View>
      </View>

      <View style={{ margin: 10,}}>
        <Text style={{ fontSize: 18, fontWeight: '500', color: 'black' }}>Add your holidays here</Text>
        <Text style={{ fontSize: 15, fontWeight: '400', color: '#666',top:7 }}>On those days, patient would not be able to book appointment for consultation</Text>
      </View>
      {holidaysData.length === 0 ? (
        <View style={{ margin: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'black' }}>No holidays available</Text>
        </View>
      ) : (
        <FlatList
        style={{ top: 20,margin:10 }}
        data={holidaysData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, backgroundColor: '#f4f4f4', marginBottom: 10 }}>
            <View>
              <Text style={{ fontSize: 16, color: 'black' }}>{moment(item.date).format('YYYY MMMM D')}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteapi(item)}>
              <Icon name="delete" color="#4681cf" size={20} />
            </TouchableOpacity>
          </View>
        )}
      />
      
      )}

<TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          backgroundColor: '#4e93e1',
          borderRadius: 30,
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={addholiday}>
        <Icon name="plus" color="white" size={27} />
      </TouchableOpacity>

      {/* Calendar Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCalendarModal}
        onRequestClose={() => setShowCalendarModal(false)}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {/* <DateTimePicker
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={handleDateChange}
          /> */}

<Calendar
            onDayPress={(day) => handleDateSelect(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'blue' }
            }}
          />
        </View>
      </Modal>

    </View>
  )
}

export default Holidaysscreen