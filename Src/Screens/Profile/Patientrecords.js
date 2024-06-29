import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Backbutton from '../../Component/Backbutton';

const Patientrecords = ({ navigation }) => {
  const [patientHistory, setPatientHistory] = useState([]);

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    patienthistory();
  }, []);

  const patienthistory = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;

    const storedoctorid = await AsyncStorage.getItem('doctor_id');

    try {
      const apiUrl = 'https://espinarealty.com/doctor/api/v1/fetchPatientHistory';
      const authToken = bearerToken;

      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('start', '0');
      formData.append('length', '10');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        setPatientHistory(responseData.data); // Set patient history data
      } else {
        console.log('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemname}>{item.user.fullname}</Text>
      <Text style={styles.itemText}>{item.user.identity}</Text>
      <Text style={styles.itemText}>
        {item.user.gender === "1" ? "Male" : item.user.gender === "0" ? "Female" : "Other"}
      </Text>
      <Text style={styles.itemText}>{item.problem}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <Backbutton/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Patients History</Text>
        </View>
      </View>
      <FlatList
        data={patientHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Patientrecords;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#4e93e1',
  },
  backButton: {
    height: '100%',
    width: 15,
    tintColor: 'white',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft:20

  },
  itemname: {
    fontSize: 17,
    fontFamily: 'NunitoSans_7pt-Bold',
    color: 'black',
    marginLeft:20
  },
});
