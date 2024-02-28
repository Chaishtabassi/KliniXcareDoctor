import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image  } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Inboxscreen = ({navigation}) => {
  const [doctorsData, setDoctorsData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getmessage();
    }, []),
  );

  const getmessage = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const storedoctorid = await AsyncStorage.getItem('doctor_id');
      const bearerToken = access_token;

      console.log(access_token)
  
      const api = 'http://teleforceglobal.com/doctor/api/v1/fetchPatientsWithLastChat';
  
      const authToken = bearerToken;
  
      const formData = new FormData();
      formData.append('doctor_id', storedoctorid);
  
      console.log(formData);
  
      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });
  
      if (response && response.status === 200) {
        const responseText = await response.text();
        console.log(responseText)
        const parsed_res = JSON.parse(responseText);
  
        console.log('hloooooooooooooooooooo', parsed_res);
        setDoctorsData(parsed_res.data);
      } else {
        console.error('Non-200 status code:', response?.status);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  const chat =(item)=>{
    console.log(item.last_chat)
    var id = item.last_chat.appointment_id
    var doctorid=item.last_chat.doctor_id
    navigation.navigate('message',{item});
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => chat(item)}>
      <View style={{ flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        {/* {item.image_url && (
          <Image
            source={{ uri: item.image_url }}
            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 16 }}
          />
        )} */}
        <Image  style={{ height: 50, width: 50 ,borderRadius:50}} source={require('../Assets/patientimage.jpg')}/>
        <View style={{marginLeft:15}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.fullname}</Text>
          <Text style={{ fontSize: 16, marginTop: 8 }}>{item.last_chat.message}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
        <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4989d9',
          height: 45,
        }}>
        {/* <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{marginLeft: 10}}> */}
          {/* <Icon name="chevron-left" size={30} color="white" /> */}
        {/* </TouchableOpacity> */}
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
           Messages
          </Text>
        </View>
      </View>
      <View>
      <FlatList
      data={doctorsData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
      </View>
  </View>
  )
}

export default Inboxscreen

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // itemContainer: {
  //   // alignItems: 'center',
  //   padding: 12,
  //   borderRadius: 8, // Add border radius for a card-like appearance
  //   borderWidth: 1,
  //   borderColor: '#ddd', // Add border color
  //   backgroundColor: '#fff', // Add background color
  //   shadowColor: '#7aa8e6', // Add shadow color
  //   shadowOffset: {
  //     width: 1,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.23,
  //   shadowRadius: 2.62,
  //   elevation: 4,
  //   margin: 8, // Add margin bottom for space between items
  // },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    // margin:15
  },
})