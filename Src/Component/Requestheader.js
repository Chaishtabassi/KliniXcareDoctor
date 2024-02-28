import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Drawernavigation from '../Navigation/Drawernavigation';

const Requestheader = () => {

    const navigation = useNavigation();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
    const handleDrawerToggle = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

  return (
    <View style={styles.container}>
    <TouchableOpacity onPress={handleDrawerToggle}>
      <Image source={require('../Assets/header.png')} />
    </TouchableOpacity>

    <Text style={styles.text}>Request</Text>

    <Image source={require('../Assets/photo.png')} />

    {isDrawerOpen && <Drawernavigation onClose={handleDrawerToggle} navigation={navigation} />}
  </View>
  )
}

export default Requestheader

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 15,
      borderWidth: 1, 
      borderColor: 'gray', 
      borderRadius: 5, 
      padding: 7, 
      borderLeftWidth:0,
      borderRightWidth:0,
      borderTopWidth:0
    },
    text: {
      fontSize: 18, 
      fontFamily:'Domine-Bold'
    },
  });
  