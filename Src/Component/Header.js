import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import Drawernavigation from '../Navigation/Drawernavigation';
import { useNavigation, useIsFocused } from '@react-navigation/native'; 

const Header = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();  // Add this line
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Close the drawer if the current screen is not in focus
  if (!isFocused && isDrawerOpen) {
    setIsDrawerOpen(false);
  }

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDrawerToggle}>
        <Image source={require('../Assets/header.png')} />
      </TouchableOpacity>
      <Image style={{height:30,width:30,borderRadius:30}} source={require('../Assets/doctorimage.jpg')} />

      {isDrawerOpen && (
        <Drawernavigation onClose={handleDrawerToggle} navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    margin: 15,
    borderBottomWidth: 1, 
    borderBottomColor: 'gray', 
    paddingBottom: 10, 
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    backgroundColor:'white'
  },
});

export default Header;
