import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { height } from '../../Authentication/Siigninscreen'

const Personalinfoscreen = ({navigation}) => {
  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  const { height, width } = Dimensions.get('screen');
  const [doctordetail, setdoctordetail] = useState('');
  const [ModalVisible, setModalVisible] = useState(false);
  const [Educationmodal, setEducationModal] = useState(false);
  const [education, setEducation] = useState('');
  const [Degree, setDegree] = useState('');
  const [Hospital, sethospital] = useState('');
  const [Modelvisible2, setModelvisible2] = useState(false);

  const Model = () => {
    setModalVisible(!ModalVisible);
  }

  const Model2 = () => {
    setEducationModal(!Educationmodal);
  }
  const Model3 = () => {
    setModelvisible2(!Modelvisible2);
  }

  useEffect(() => {
    func();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      Doctordetail();
    }, []),
  );

  const Doctoredit = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const storedoctorid = await AsyncStorage.getItem('doctor_id');
    const bearerToken = access_token;

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/updateDoctorDetails`;

      const authToken = bearerToken;
      const formData = new FormData();

      formData.append('doctor_id', storedoctorid);
      formData.append('name', doctordetail.name);
      formData.append('country_code', doctordetail.country_code);
      formData.append('mobile_number', doctordetail.mobile_number);
      formData.append('gender', doctordetail.gender);
      formData.append('category_id', doctordetail.category_id);
      formData.append('designation', doctordetail.designation);
      formData.append('degrees', doctordetail.degrees);
      formData.append('languages_spoken', doctordetail.languages_spoken);
    formData.append('experience_year', doctordetail.experience_year);
    formData.append('consultation_fee', doctordetail.consultation_fee);
    formData.append('about_youself', Hospital);
    formData.append('educational_journey', education);
      formData.append('online_consultation', doctordetail.online_consultation);
      formData.append('clinic_consultation', doctordetail.clinic_consultation);


      console.log('hello', formData);

      const response = await fetch(api, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log('edit', responseData.data);
          Doctordetail()
          sethospital(Hospital || doctordetail.about_youself)
          setEducation(education || doctordetail.educational_journey)
          setDegree(Degree || doctordetail.degrees)

          if (ModalVisible) {
            Model()
          }
          if (Educationmodal) {
            Model2()
          }
          if (Modelvisible2) {
            Model3()
          }
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  }

  const Doctordetail = async () => {
    const access_token = await AsyncStorage.getItem('access_token');
    const bearerToken = access_token;
    console.log(bearerToken);

    try {
      const api = `http://teleforceglobal.com/doctor/api/v1/doctor-info`;

      const authToken = bearerToken;

      const response = await fetch(api, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response) {
        if (response.status === 200) {
          const responseText = await response.text();
          const responseData = JSON.parse(responseText);
          console.log('doctor', responseData.data);
          setdoctordetail(responseData.data);
        } else {
          console.error('Non-200 status code:', response.status);
        }
      } else {
        console.error('Response is undefined');
      }
    } catch (error) {
      console.error('erorrr', error);
    }
  }

  const func = async () => {
    const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
    if (storedPhoneNumber != null || storedPhoneNumber != undefined) {
      // navigation.navigate('Rootclienttab');
    }
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
          style={{ marginLeft: 10 }}>
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
            Profile
          </Text>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../Assets/photo.png')}
          style={styles.profileImage}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>{doctordetail.name}</Text>
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#4e93e1' }}>{doctordetail.designation}</Text>
        </View>

      </View>

      <View style={{ margin: 10, justifyContent: 'space-between', height: '27%' }}>
        <View style={{ backgroundColor: '#f8f8f8', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name='call' color='#4e93e1' size={15} />
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#9c9c9c' }}>  {doctordetail.mobile_number}</Text>
        </View>

        <View style={{ backgroundColor: '#f8f8f8', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name='mail' color='#4e93e1' size={15} />
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#9c9c9c' }}>  Jasmine@gmail.coom</Text>
        </View>

        <View style={{ backgroundColor: '#f8f8f8', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Icon name='bag' color='#4e93e1' size={15} />
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#9c9c9c' }}>  {doctordetail.experience_year} Years Experience</Text>
        </View>

        <View style={{ backgroundColor: '#f8f8f8', padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('../../Assets/rupee.png')} />
          <Text style={{ fontSize: 14, fontWeight: '700', color: '#9c9c9c' }}>  {doctordetail.consultation_fee}</Text>
        </View>
      </View>


      <View style={{ margin: 10 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>About</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../Assets/edit.png')} />
            <TouchableOpacity onPress={Model3}>
              <Text style={{ color: '#4e93e1', fontWeight: '600' }}>Edit</Text>
            </TouchableOpacity>

          </View>
        </View>

        <Text>{doctordetail.about_youself}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Educational Journey</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../Assets/edit.png')} />
            <TouchableOpacity onPress={Model}>
              <Text style={{ color: '#4e93e1', fontWeight: '600' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text>{doctordetail.educational_journey}</Text>

        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Medical Degrees</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../Assets/edit.png')} />
            <TouchableOpacity onPress={Model2}>
              <Text style={{ color: '#4e93e1', fontWeight: '600' }}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text>{doctordetail.degrees}</Text> */}
        <Text></Text>

        <Text>{doctordetail.clinic_address}</Text>

        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>Visiting Time</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={require('../../Assets/edit.png')} />
            <Text style={{ color: '#4e93e1', fontWeight: '600' }}>Edit</Text>
          </View>
        </View> */}

        <Text></Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Educationmodal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'black',
                  fontFamily: 'NunitoSans_7pt-Bold',
                }}>
                Medical Degrees
              </Text>
              <TouchableOpacity
                onPress={Model2}
                style={{
                  backgroundColor: '#deeefd',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: height * 0.02,
                    width: width * 0.03,
                    marginTop: 1,
                  }}
                  source={require('../../Assets/CloseIcon.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={{ top: 20 }}>
              {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      Discount percent:
                    </Text> */}
              <TextInput
                value={Degree}
                onChangeText={setDegree}
                placeholder={doctordetail.degrees}
                multiline
                placeholderTextColor={'black'}
                style={{ backgroundColor: '#f4f4f4', top: 10 }}
              />
            </View>
            <TouchableOpacity style={styles.buttons} onPress={Doctoredit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'black',
                  fontFamily: 'NunitoSans_7pt-Bold',
                }}>
                Educational Journey
              </Text>
              <TouchableOpacity
                onPress={Model}
                style={{
                  backgroundColor: '#deeefd',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: height * 0.02,
                    width: width * 0.03,
                    marginTop: 1,
                  }}
                  source={require('../../Assets/CloseIcon.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={{ top: 20 }}>
              {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      Discount percent:
                    </Text> */}
              <TextInput
                value={education}
                onChangeText={setEducation}
                placeholder={doctordetail.educational_journey}
                multiline
                placeholderTextColor={'black'}
                style={{ backgroundColor: '#f4f4f4', top: 10 }}
              />
            </View>
            <TouchableOpacity style={styles.buttons} onPress={Doctoredit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={Modelvisible2}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '800',
                  color: 'black',
                  fontFamily: 'NunitoSans_7pt-Bold',
                }}>
                About Yourself
              </Text>
              <TouchableOpacity
                onPress={Model3}
                style={{
                  backgroundColor: '#deeefd',
                  borderRadius: 20,
                  padding: 5,
                }}>
                <Image
                  resizeMode="contain"
                  style={{
                    height: height * 0.02,
                    width: width * 0.03,
                    marginTop: 1,
                  }}
                  source={require('../../Assets/CloseIcon.png')}
                />
              </TouchableOpacity>
            </View>

            <View style={{ top: 20 }}>
              {/* <Text style={{ fontSize: 16, fontWeight: '600' }}>
                      Discount percent:
                    </Text> */}
              <TextInput
                value={Hospital}
                onChangeText={sethospital}
                placeholder={doctordetail.about_youself}
                multiline
                placeholderTextColor={'black'}
                style={{ backgroundColor: '#f4f4f4', top: 10 }}
              />
            </View>
            <TouchableOpacity style={styles.buttons} onPress={Doctoredit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Personalinfoscreen;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    // height: height * 0.1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    height: height * 0.35,
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  buttons: {
    backgroundColor: '#4d91e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: height * 0.1,
    height: 50,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: 'black',
    fontFamily: 'Domine-Bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    width: Dimensions.get('window').width * 0.9,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    width: '90%',
    marginBottom: 15,
    backgroundColor: '#e4efff',
    borderRadius: 8,
  },
  input1: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#e4efff',
    zIndex: 0,
    width: '90%',
  },
});
