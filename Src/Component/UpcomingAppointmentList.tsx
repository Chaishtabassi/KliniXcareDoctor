import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {height, width} from '../Authentication/Siigninscreen';
import Appointmentlist from '../Data/Appointmentlist';
import {FlatList} from 'react-native-gesture-handler';

const data = [
  {
    id: '1',
    title: 'eden',
    AppointmentType: 'Video Confrence',
  },
  {id: '2', title: 'Rogger', AppointmentType: 'At Clinic'},
  {id: '3', title: 'Sam', AppointmentType: 'Video Confrence'},
  {id: '3', title: 'Lisa', AppointmentType: 'At Clinic'},
  {id: '3', title: 'Buddy', AppointmentType: 'Video Confrence'},
  {id: '3', title: 'Bobs', AppointmentType: 'At Clinic'},
];

const UpcomingAppointmentList = () => {
  const renderItem = ({item}) => (
    <View style={styles.item}>
      <View>
        <Image
          style={{
            height: height * 0.1,
            width: width * 0.2,
            top: 5,
          }}
          source={require('../Assets/photo.png')}></Image>
      </View>
      <View style={{width: width * 0.65}}>
        <Text
          style={{
            color: '#294473',
            fontWeight: '900',
            fontSize: height * 0.017,
            marginTop: 12,
            marginLeft: 12,
          }}>
          Patient Name{'\n'}
          {item.title}
        </Text>
        <Text style={{color: '#6B7F96', marginLeft: 12}}>
          Appointment Type {item.AppointmentType}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.95,
    marginLeft: 5,
  },
  item: {
    backgroundColor: '#FFF',
    // padding: 20,
    // marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: 'row',
    height: height * 0.15,
    width: width * 0.9,
    justifyContent: 'space-around',
    borderRadius: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
    marginTop: 20,
  },
});

export default UpcomingAppointmentList;
