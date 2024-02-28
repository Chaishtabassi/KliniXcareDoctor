import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import Authstack from './Authstack';

const Rootnavigator = () => {
  return (
    <NavigationContainer>
      <Authstack />
    </NavigationContainer>
  );
}

export default Rootnavigator;
