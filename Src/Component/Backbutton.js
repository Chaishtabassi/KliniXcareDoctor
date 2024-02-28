import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {height, width} from '../Authentication/Siigninscreen';

const Backbutton = ({Props: any}) => {
  const navigation = useNavigation();

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <View>
      <TouchableOpacity onPress={handleBackButtonPress}>
        <Image
          resizeMode="contain"
          style={{
            height: height * 0.03,
            width: width * 0.05,
            tintColor: 'white',
            left: 5,
          }}
          source={require('../Assets/BackButton.png')}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default Backbutton;

const styles = StyleSheet.create({});
