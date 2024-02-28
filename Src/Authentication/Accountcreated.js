import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const Accountcreated = ({navigation}) => {

    const Confirm = ()=>{
        navigation.navigate('SignInScreen');
    }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../Assets/reset.png')} style={styles.image} />
        <Text style={styles.heading}>Account Created!</Text>
        <Text style={styles.description}>
        Your account had been created successfully.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={Confirm}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Accountcreated

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: 20,
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
      fontSize: 24,
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
      width: '100%', 
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 16,
    },
  })