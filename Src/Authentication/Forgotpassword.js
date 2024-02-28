import { View, Text, StyleSheet ,Dimensions,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import Backbutton from '../Component/Backbutton';
import { TextInput} from 'react-native-paper';

const Forgotpassword = ({navigation}) => {

    const [text, setText] = useState('');

    const handleTextChange = (newText) => {
        setText(newText);
    };

    const Reset =()=>{
        navigation.navigate('reset');
    }
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Backbutton />
      <Text style={styles.title}>Forgot Pin</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.centeredText}>
        Please enter your email address. You will receive a link to create a new pin via email.
      </Text>
      <TextInput
        style={styles.input}
        mode="outlined"
        outlineColor="#e4efff"
        label="Enter Email Id"
        onChangeText={handleTextChange}
        value={text}
        theme={{ colors: { primary: '#478ffd' } }}
      />
      <TouchableOpacity style={styles.button} onPress={Reset}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white'
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomEndRadius:20,
      borderBottomLeftRadius:20,
      backgroundColor:'#49B2E9',
      height:'8%'
    },
    title: {
      flex: 1,
      fontSize: 18,
      color: 'black',
      fontFamily:'Domine-Bold',
      textAlign: 'center',
      alignSelf: 'center',
      color:'white',
    },
    textContainer: {
      margin: 10,
      padding: 10,
      alignItems: 'center', 
    },
    centeredText: {
      fontSize: 15,
      fontFamily: 'NunitoSans_7pt-Regular',
      color: 'black',
      marginBottom: 10,
      textAlign: 'center', 
    },
    input: {
      width: '100%',
      top: 20,
      backgroundColor: '#e4efff',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#49b2e9',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginTop: 25,
      width: Dimensions.get('window').width * 0.9,
      height: 50,
    },
    buttonText: {
      color: 'white',
      fontFamily:'NunitoSans_7pt-Bold',
      textAlign: 'center',
      fontSize: 16,
    },
  });

export default Forgotpassword;
