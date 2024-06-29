import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import {height, width} from '../Authentication/Siigninscreen';

const Backbutton = ({Props: any}) => {
  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Icon name="chevron-left" size={30} color="white" style={{marginLeft:10}}/>
        {/* <Image
          resizeMode="contain"
          style={{
            height: height * 0.03,
            width: width * 0.07,
            tintColor: 'white',
            left: 15,
          }}
          source={require('../Assets/BackButton.png')}></Image> */}
      </TouchableOpacity>
    </View>
  );
};

export default Backbutton;

const styles = StyleSheet.create({});
