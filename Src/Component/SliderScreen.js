import React from 'react';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {height, width} from '../Authentication/Siigninscreen';

const data = [
  {
    id: '1',
    title: 'Moksh',
    Specialist: 'Video Confrence',
  },
  {id: '2', title: 'Rana', Specialist: 'At Clinic'},
  {id: '3', title: 'Moggi', Specialist: 'At Clinic'},
  {id: '4', title: 'Koko', Specialist: 'At Clinic'},
  {id: '5', title: 'Cash', Specialist: 'At Clinic'},
];

const SliderScreen = () => {
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
      <View>
        <Text
          style={{
            color: '#6B7F96',
            fontWeight: '600',
            fontSize: height * 0.017,
          }}></Text>
        <Text
          style={{
            color: '#294473',
            fontWeight: '600',
            fontSize: height * 0.017,
          }}>
          Patient Name{'\n'}
          {item.title}
        </Text>
        <Text style={{color: '#294473'}}>
          Appointment Type {'  '}
          {item.Specialist}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
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
    width: width * 0.85,
    justifyContent: 'space-evenly',
    borderRadius: 12,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    marginTop: 20,
  },
});

export default SliderScreen;
