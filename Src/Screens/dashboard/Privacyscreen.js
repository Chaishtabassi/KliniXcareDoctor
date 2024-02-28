import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Backbutton from '../../Component/Backbutton';
import {width} from '../../Authentication/Siigninscreen';

const Privacyscreen = () => {
  const {height, width} = Dimensions.get('screen');

  const handleBackButtonPress = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#4e93e1',
          height: '7%',
        }}>
        <TouchableOpacity
          onPress={handleBackButtonPress}
          style={{marginLeft: 10}}>
          <TouchableOpacity onPress={handleBackButtonPress}>
            <Image
              resizeMode="contain"
              style={{
                height: height * 0.02,
                width: width * 0.04,
                tintColor: 'white',
                left: 5,
              }}
              source={require('../../Assets/BackButton.png')}></Image>
          </TouchableOpacity>
        </TouchableOpacity>
        <View
          style={{
            height: height * 0.08,
            width: width * 0.9,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              margin: 10,
              fontSize: 18,
              color: '#FFF',
              fontFamily: 'Domine-Bold',
              textAlign: 'center',
            }}>
            Privacy Policy
          </Text>
        </View>
      </View>

      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 14,
            marginTop: 10,
            textAlign: 'center',
            lineHeight: 20,
            fontWeight: 'bold',
          }}>
          Welcome to KliniKCare! At KliniKCare, we are committed to protecting
          your privacy and ensuring the confidentiality of your personal and
          health information. When you use our telemedicine services, we may
          collect certain information to provide you with the best possible
          care. This includes personal details such as your name, contact
          information, and demographic data, as well as health information
          related to your medical history and treatment plans. We understand the
          sensitivity of this information and take measures to secure it,
          employing industry-standard safeguards to prevent unauthorized access,
          disclosure, or alteration. The information you share with us is used
          solely for the purpose of delivering telemedicine services,
          personalizing your experience, and improving our platform. We may
          share necessary details with healthcare providers involved in your
          care, as well as with third-party service providers who assist in
          delivering our services. KliniKCare is committed to complying with
          legal and regulatory requirements, and we provide you with choices
          regarding the use and disclosure of your information. You have the
          right to access, correct, or delete your personal information, and you
          can opt-out of certain communications. Our Privacy Policy may be
          updated periodically, and we will notify you of any changes.
        </Text>
      </View>
    </View>
  );
};

export default Privacyscreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    // margin: 10,
    flexDirection: 'row',
    width: width * 0.9,
    backgroundColor: 'black',
  },
});
