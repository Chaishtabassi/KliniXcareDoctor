import {  Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Logoutscreen = ({navigation}) => {

    const Confirm = ()=>{
        navigation.navigate('SignInScreen');
    }

    const cancel = ()=>{
        navigation.goBack();
    }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* <Image source={require('../../Assets/logout.png')} style={styles.image} /> */}
        <Text style={styles.heading}>Are you sure you want to Sign Out ?</Text>
      </View>

      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.button} onPress={cancel}>
            <Text style={styles.buttonText}>cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={Confirm}>
            <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Logoutscreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: 20,
      backgroundColor:'white'
    },
    content: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 150, 
      height: 150,
      resizeMode: 'contain',
      marginBottom: 20, 
    },
    heading: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    description: {
      fontSize: 16,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#49b2e9',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      width: '50%', 
      marginRight:10
    },
    button1: {
      backgroundColor: '#888888',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      width: '50%', 
      marginRight:10
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
  })