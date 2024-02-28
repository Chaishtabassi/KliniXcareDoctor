import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native-elements';
import { TextInput, List, Divider, IconButton } from 'react-native-paper';
import CountryPicker from 'react-native-country-picker-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Phonenumber = () => {
    const [visible, setVisible] = useState(false);
    const [country, setCountry] = useState({
      cca2: 'IN',
    callingCode: '91'});
    const [username, setUsername] = useState('');
  
    const onSelectCountry = (country) => {
      setCountry(country);
      const callingCode = country?.callingCode ? `+${country.callingCode[0]}` : '';
      if (onChange) {
        onChange(callingCode);
      }
      setVisible(false);
    };
  
    const openCountryPicker = () => {
      setVisible(true);
    }

  return (
    <View>
       <View
      style={{
        // marginLeft: 10,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        paddingHorizontal: 8,
        paddingTop: 25,
      }}
    >
      <Text style={{ fontSize:14,fontWeight:'500'}}>
      {`+${country.callingCode}`}
      </Text>
    </View>
    <TextInput
      value={username}
      onChangeText={setUsername}
      label="Enter Phone Number"
      mode="outlined"
      keyboardType='number-pad'
         multiline={true}
      fontSize={16}
      maxLength={10}
      outlineColor="#e4efff"
      style={{
        // marginLeft:15,
        // marginBottom: 10,
        height: 60,
        backgroundColor: '#e4efff',
        // width: '90%',
        zIndex: 0,
        paddingLeft: 35, 
      }}
      theme={{ colors: { primary: '#478ffd' } }}
      dense={true}
      left={
        <TextInput.Icon
          style={{ borderRightWidth: 1, borderRadius: 0, alignSelf: 'center'}}
          icon="chevron-down"
          onPress={openCountryPicker}
        />
      }
    />
        <CountryPicker
          visible={visible}
          onClose={() => setVisible(false)}
          onSelect={onSelectCountry}
          withFilter
          // withFlag
          withCallingCode
          withCountryNameButton
          placeholder=""
        />
      </View>
  )
}

export default Phonenumber

const styles = StyleSheet.create({})