import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  PermissionsAndroid
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import DocumentPicker from 'react-native-document-picker';
import { height, width } from './Authentication/Siigninscreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

const Medicalprescription = ({ route, navigation }) => {
  const richText = useRef();
  const selectedpatien = route.params ? route.params.selectedpatien : null;

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      getprescription();
    }, []),
  );

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download files.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getprescription = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/getPrescription';
      const access_token = await AsyncStorage.getItem('access_token');
      console.log(access_token)
      const authToken = access_token;

      const formData = new FormData();
      formData.append('doctor_id', selectedpatien.doctor.id);
      formData.append('appointment_id', selectedpatien.id);

      console.log(formData)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        if (responseData.status === true) {
          const prescriptionData = responseData.data;
          console.log('Prescription Data:', prescriptionData);

          setPrescriptionData(prescriptionData);
          setIsLoading(false);
          if (responseData.data !== null) setSubmissionSuccess(true);
          setreason(prescriptionData.encounter_reason);
          setnotes(prescriptionData.encounter_notes);
          setsummary(prescriptionData.summary);
          setcertificate(prescriptionData.medical_certificate);
          setassessment(prescriptionData.assessment);
          setsummary(prescriptionData.summary)
          setcertificate(prescriptionData.medical_certificate);
          setInstruction(prescriptionData.instructions)

          console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaa', prescriptionData)

          return prescriptionData;
        } else {
          console.error('No valid prescription data found in the response.');
          setIsLoading(false);
        }
      } else {
        console.error('Failed to fetch data. Status:', response.status);
        const errorText = await response.text();
        console.error('Error message:', errorText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Network error:', error.message);
      setIsLoading(false);
    }
  };

  const Printprescription = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/printPrescription';
      const access_token = await AsyncStorage.getItem('access_token');
      console.log(access_token)
      const authToken = access_token;

      const formData = new FormData();
      formData.append('appointment_id', selectedpatien.id);

      console.log(formData)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('certificate', responseData);

        // Download the PDF
        const pdfUrl = responseData.pdf_url;
        const { config, fs } = RNFetchBlob;

        const dest = fs.dirs.DownloadDir + '/Prescription.pdf';

        config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dest,
            description: 'Downloading PDF',
          },
        })
          .fetch('GET', pdfUrl)
          .then((res) => {
            console.log('File downloaded to:', res.path());
          })
          .catch((error) => {
            console.error('Download error:', error);
          });
      } else {
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };



  const handleEditPress = async () => {
    const prescriptionId = await getprescription();

    if (prescriptionId !== null) {
      editprescription(prescriptionId);
    } else {
      console.error('Unable to retrieve prescription data.');
    }
  };

  const editprescription = async (prescriptionId) => {
    console.log('idddddddddddddddddddddddddd', prescriptionId)
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/editPrescription';

      const prescriptionsArray = prescriptionData.prescription_details.map(prescription => ({
        category_id: prescription.category.id,
        medicine_id: prescription.medicine.id,
        dosage_id: prescription.dose.id,
        doseInterval_id: prescription.dose_interval.id,
        doseDuration_id: prescription.dose_duration.id,
        instruction: prescription.instruction,
      }));

      console.log('helo', prescriptionsArray)
      console.log('arrayyyyyyyyyyyyyy', prescriptionsArray)

      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('prescription_id', String(prescriptionId.id));
      formData.append('medicine', JSON.stringify(prescriptionsArray));
      formData.append('medical_certificate', String(certificate));
      formData.append('encounter_reason', String(reason));
      formData.append('encounter_notes', String(notes));
      formData.append('summmary', summary);
      formData.append('assessment', assessment);
      formData.append('instructions', Instruction)

      console.log('inst', formData);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
          // 'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('doctor', responseData);

        if (responseData.message == "This appointment has prescription already!") {
          console.log(responseData.message)
          getprescription();
          // Toast.show({
          //   text1: 'This appointment already includes a prescription!',
          //   type: 'error',
          // });
        } else {
          Toast.show({
            text1: 'Your prescription edited successfully!',
            type: 'success',
          });
          getprescription();
          setSubmissionSuccess(true);
        }
      } else {
        console.error('Failed to fetch data. Status:', response.status);
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  }

  const deleteprescription = async () => {
    console.log('eeeeeeeeeeeeeeeeeeeeee', prescriptionData)
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/deletePrescription';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('prescription_id', String(prescriptionData.id));

      console.log(formData)

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('delete', responseData);
        Toast.show({
          text1: 'Prescription deleted successful.',
          type: 'success',
        });
        getprescription();
      } else {
        console.error('Failed to delete prescription. Status:', response.status);
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [reason, setreason] = useState('');
  const [notes, setnotes] = useState('');
  const [summary, setsummary] = useState('');
  const [assessment, setassessment] = useState('');
  const [certificate, setcertificate] = useState('');
  const [Instruction, setInstruction] = useState('');

  const PrintMediacl = async (prescriptionId) => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/printMedicalCertificate';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', selectedpatien.id);

      console.log(formData)
      console.log(formData)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('certificate', responseData);

        // Download the PDF
        const pdfUrl = responseData.pdf_url;
        const { config, fs } = RNFetchBlob;

        const dest = fs.dirs.DownloadDir + '/medical_certificate.pdf';

        config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dest,
            description: 'Downloading PDF',
          },
        })
          .fetch('GET', pdfUrl)
          .then((res) => {
            console.log('File downloaded to:', res.path());
          })
          .catch((error) => {
            console.error('Download error:', error);
          });
      } else {
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  const printinstruction = async (prescriptionId) => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/printInstruction';
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', selectedpatien.id);

      console.log(formData)
      console.log(formData)
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('certificate', responseData);

        // Download the PDF
        const pdfUrl = responseData.pdf_url;
        const { config, fs } = RNFetchBlob;

        const dest = fs.dirs.DownloadDir + '/Instructions.pdf';

        config({
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: dest,
            description: 'Downloading PDF',
          },
        })
          .fetch('GET', pdfUrl)
          .then((res) => {
            console.log('File downloaded to:', res.path());
          })
          .catch((error) => {
            console.error('Download error:', error);
          });
      } else {
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [doseIntervals, setDoseIntervals] = useState([]);
  const [selectedDoseInterval, setSelectedDoseInterval] = useState(null);
  const [doseDurations, setDoseDurations] = useState([]);
  const [selectedDoseDuration, setSelectedDoseDuration] = useState(null);
  const [selectedMedicineId, setSelectedMedicineId] = useState(null);
  const [selectedMedicines, setSelectedMedicines] = useState(null);
  const [selectedDosage, setSelectedDosage] = useState(null);
  const [dosages, setDosages] = useState([]);
  const [medicine, setmedicine] = useState([]);
  const [insturction, setinsturction] = useState([]);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    fetchMedicineCategories();
    fetchDoseIntervals()
  }, []);

  const fetchMedicineCategories = async () => {
    try {
      const access_token = await AsyncStorage.getItem('access_token');
      const apiUrl = 'http://teleforceglobal.com/doctor/api/fetchmedicineCategories';
      const authToken = access_token;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setMedicines(data.category);

        // Assuming dose interval and dose duration are present in the API response
        setDoseIntervals(data.dose_interval);
        setDoseDurations(data.dose_duration);
      } else {
        throw new Error('Failed to fetch medicine categories');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDoseIntervals = async (categoryId) => {
    try {
      const apiUrl = `http://teleforceglobal.com/doctor/api/fetchMidicineslist`;
      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;

      const formData = new FormData();

      formData.append('category_id', String(categoryId));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log('Dose intervals:', data);
        setmedicine(data.medicines)
        setDosages(data.medicine_dosage);
      } else {
        throw new Error('Failed to fetch dose intervals');
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleMedicineCategoryChange = (value) => {
    console.log('value', value)
    const categoryId = value.id || value;

    setSelectedMedicineId(value);
    fetchDoseIntervals(categoryId);
  };

  const [prescriptions, setPrescriptions] = useState([]);

  const handleSubmit = () => {
    const newPrescription = {
      category_id: selectedMedicineId,
      medicine_id: selectedMedicines,
      dosage_id: selectedDosage,
      doseInterval_id: selectedDoseInterval,
      doseDuration_id: selectedDoseDuration,
      instruction: insturction,
    };
    setPrescriptions([...prescriptions, newPrescription]);

    setSelectedMedicine(null);
    setSelectedMedicines(null);
    setSelectedDosage(null);
    setSelectedDoseInterval(null);
    setSelectedDoseDuration(null);
    setinsturction('');

    toggleModal();
  };

  const submit = async () => {
    try {
      const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/addPrescription';

      const prescriptionsArray = prescriptions.map(prescription => ({
        category_id: prescription.category_id.id,
        medicine_id: prescription.medicine_id.id,
        dosage_id: prescription.dosage_id.id,
        doseInterval_id: prescription.doseInterval_id.id,
        doseDuration_id: prescription.doseDuration_id.id,
        instruction: prescription.instruction,
      }));

      const access_token = await AsyncStorage.getItem('access_token');
      const authToken = access_token;
      const formData = new FormData();
      formData.append('appointment_id', String(selectedpatien.id));
      formData.append('user_id', String(selectedpatien.user_id));
      formData.append('medicine', JSON.stringify(prescriptionsArray));
      formData.append('certificate_file', 'certificate.jpg');
      formData.append('medical_certificate', String(certificate));
      formData.append('encounter_reason', String(reason));
      formData.append('encounter_notes', String(notes));
      formData.append('summary', summary);
      formData.append('assessment', assessment);
      formData.append('instructions', Instruction)

      // formData.append('summmary',String(summary));
      // formData.append('summary', "summary");
      // formData.append('assessment',  String("hshshsh"));
      // formData.append('assessment', String(assessment));

      console.log(formData);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('doctor', responseData);
        getprescription();

        if (responseData.message == "This appointment has prescription already!") {
          console.log(responseData.message)
          getprescription();
          // Toast.show({
          //   text1: 'This appointment already includes a prescription!',
          //   type: 'error',
          // });
        } else {
          Toast.show({
            text1: 'Your prescription added successfully!',
            type: 'success',
          });
          getprescription();
          setSubmissionSuccess(true);
        }
      } else {
        console.error('Failed to fetch data. Status:', response.status);
        const errorText = await response.text();
        console.error('Error message:', errorText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };


  useEffect(() => {
    // Set the HTML content into RichEditor when the instructions prop changes
    richText.current?.setContentHTML(Instruction);
  }, [Instruction]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 50, // Adjusted height for better visibility
            backgroundColor: '#4e93e1',
          }}>
          <TouchableOpacity onPress={handleBackButtonPress}>
            <Image
              resizeMode="contain"
              style={{
                height: height * 0.03,
                width: width * 0.05,
                marginLeft: 10, // Adjusted to marginLeft for consistent spacing
                tintColor: '#FFF',
              }}
              source={require('./Assets/BackButton.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1, // Added flex: 1 to allow the text to expand
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: height * 0.023,
                fontWeight: '500',
                color: '#FFF',
              }}>
              Encounter
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={Printprescription} style={{ marginLeft: 10 }}>
              <Icon name='printer' size={20} color='white' />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteprescription} style={{ marginRight: 10, marginLeft: 10 }}>
              <Icon name='delete' size={20} color='white' />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={{ height: height * 0.05 }}>
            <Text
              style={{
                fontSize: height * 0.025,
                fontWeight: '700',
                color: 'black',
                top: 5,
                left: 12,
              }}>
              Create Prescription For
            </Text>
          </View>
          {selectedpatien && (
            <View style={styles.itemContainer}>
              <View style={{ flexDirection: 'row', }}>
                <Image
                  style={{ height: 90, width: 90 }}
                  resizeMode="contain"
                  source={require('../Src/Assets/patientimage.jpg')}
                />
                <View style={{ marginLeft: 10, flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontFamily: 'NunitoSans_7pt-Bold',
                      color: 'black',
                    }}>
                    {selectedpatien.user.fullname}
                  </Text>
                  <View style={{ flexDirection: 'row', top: 5 }}>
                    <Text style={{ fontFamily: 'Domine-Regular' }}>
                      {new Date(selectedpatien.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontFamily: 'NunitoSans_7pt-Light',
                        color: 'grey',
                        marginLeft: 10,
                      }}>
                      , {selectedpatien.user.gender === 0 ? 'Female' : 'Male'}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'NunitoSans_7pt-Light',
                      color: 'grey',
                      top: 5,
                    }}>
                    {selectedpatien.time_range}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={prescriptionData?.prescription_details || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ margin: 10, backgroundColor: '#f4f4f4' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View>
                    {item.medicine && <Text>Medicine Name: {item.medicine.name}</Text>}
                    {item.dosage && <Text>Dosage: {item.dosage}</Text>}
                    {item.dose_duration && <Text>Duration: {item.dose_duration.name} days</Text>}
                    {item.dose_interval && <Text>Dose Interval: {item.dose_interval.name} hours</Text>}
                    {item.instruction && <Text>Instruction: {item.instruction}</Text>}
                  </View>
                  <View>
                  </View>
                </View>
              </View>
            )}
          />
        )}


        {prescriptions && prescriptions.length > 0 && prescriptions.map((scription, index) => (
          <View style={{ margin: 10, backgroundColor: '#f4f4f4', }} key={index}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: 'black' }}>{scription.medicine_id.name}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>{scription.doseInterval_id.name}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>{scription.doseDuration_id.name}</Text>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>{scription.instruction}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '600' }}>{scription.dosage_id.dosage}</Text>
              </View>
            </View>
          </View>
        ))}

        {submissionSuccess ? (
          <TouchableOpacity onPress={toggleModal}
            style={{ backgroundColor: '#f4f4f4', padding: 10, alignItems: 'center', margin: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#4e93e1' }}>
              Edit Medicine
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={toggleModal}
            style={{ backgroundColor: '#f4f4f4', padding: 10, alignItems: 'center', margin: 10 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#4e93e1' }}>
              Add Medicine
            </Text>
          </TouchableOpacity>
        )}


        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView showsVerticalScrollIndicator={false}>
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
                    Add Medicine
                  </Text>
                  <TouchableOpacity
                    onPress={toggleModal}
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
                      source={require('./Assets/CloseIcon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ top: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>
                    Medicine Category
                  </Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={{
                      paddingHorizontal: 15,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    selectedTextStyle={{
                      paddingHorizontal: 10,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    data={medicines}
                    labelField="name"
                    valueField="id"
                    placeholder="Select"
                    value={selectedMedicine}
                    onChange={(value) => handleMedicineCategoryChange(value)}
                  />
                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>
                    Medicine
                  </Text>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={{
                      paddingHorizontal: 15,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    selectedTextStyle={{
                      paddingHorizontal: 10,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    data={medicine}
                    labelField="name"
                    valueField="id"
                    placeholder="Select"
                    value={selectedMedicines}
                    onChange={(value) => setSelectedMedicines(value)}
                  />

                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>
                    Dosage
                  </Text>
                  <Dropdown
                    style={styles.input}
                    placeholderStyle={{
                      paddingHorizontal: 15,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    selectedTextStyle={{
                      paddingHorizontal: 10,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    data={dosages}
                    labelField="dosage"
                    valueField="id"
                    placeholder="Select"
                    value={selectedDosage}
                    onChange={(value) => setSelectedDosage(value)}
                  />


                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>
                    Dose Interval
                  </Text>
                  <Dropdown
                    style={styles.input}
                    placeholderStyle={{
                      paddingHorizontal: 15,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    selectedTextStyle={{
                      paddingHorizontal: 10,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    data={doseIntervals}
                    labelField="name"
                    valueField="id"
                    placeholder="Select"
                    value={selectedDoseInterval}
                    onChange={(value) => setSelectedDoseInterval(value)}
                  />

                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>
                    Dose Duration
                  </Text>
                  <Dropdown
                    style={styles.input}
                    placeholderStyle={{
                      paddingHorizontal: 15,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    selectedTextStyle={{
                      paddingHorizontal: 10,
                      fontWeight: '400',
                      color: 'black',
                    }}
                    data={doseDurations}
                    labelField="name"
                    valueField="id"
                    placeholder="Select"
                    value={selectedDoseDuration}
                    onChange={(value) => setSelectedDoseDuration(value)}
                  />

                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>
                      Drug Instruction
                    </Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Drug Instruction"
                      mode="outlined"
                      outlineColor="#e4efff"
                      onChangeText={setinsturction}
                      value={insturction}
                      multiline
                      placeholderTextColor={'black'}
                      theme={{ colors: { primary: '#478ffd' } }}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.buttons} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={{ margin: 10 }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Encounter Reason:</Text>
            <TextInput
              style={styles.input}
              placeholder="Encounter Reason"
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setreason}
              value={reason}
              multiline
              placeholderTextColor={'black'}
              theme={{ colors: { primary: '#478ffd' } }}
            />
          </View>


          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Encounter Notes:</Text>
            <TextInput
              style={styles.input}
              placeholder="Encounter Notes"
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setnotes}
              value={notes}
              multiline
              placeholderTextColor={'black'}
              theme={{ colors: { primary: '#478ffd' } }}
            />
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Assessment:</Text>
            <TextInput
              style={styles.input}
              placeholder="Assessment"
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setassessment}
              value={assessment}
              multiline
              placeholderTextColor={'black'}
              theme={{ colors: { primary: '#478ffd' } }}
            />
          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.heading}>Remarks:</Text>
            <TextInput
              style={styles.input}
              placeholder="Summary"
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setsummary}
              value={summary}
              multiline
              placeholderTextColor={'black'}
              theme={{ colors: { primary: '#478ffd' } }}
            />
          </View>

          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.heading}>Instruction:</Text>

              <TouchableOpacity onPress={printinstruction} style={{ marginLeft: 10 }}>
                <Icon name='printer' size={20} color='black' />
              </TouchableOpacity>
            </View>
            <RichEditor

              ref={richText}
              // onChange={(text) => setInstruction(text)}
              placeholder="Instruction"
              initialContentHTML={Instruction}
              androidHardwareAccelerationDisabled={true}
              style={[styles.input, styles.richTextEditorStyle]}
              initialHeight={250}
            />
            {/* <TextInput
              style={styles.input}
              placeholder="Instruction"
              mode="outlined"
              outlineColor="#e4efff"
              onChangeText={setInstruction}
              value={Instruction}
              multiline
              placeholderTextColor={'black'}
              theme={{ colors: { primary: '#478ffd' } }}
            /> */}
            <RichToolbar getEditor={() => richText.current} />
          </View>

          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.heading}>Medical Certificate:</Text>
              <TouchableOpacity onPress={PrintMediacl} style={{ marginLeft: 10 }}>
                <Icon name='printer' size={20} color='black' />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Medical Certificate"
              mode="outlined"
              outlineColor="#e4efff"
              multiline
              onChangeText={setcertificate}
              value={certificate}
              placeholderTextColor={'black'}
              theme={{ colors: { primary: '#478ffd' } }}
            />
          </View>
        </View>

        <View>
          {submissionSuccess ? (
            <TouchableOpacity style={styles.buttons} onPress={handleEditPress}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttons} onPress={submit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>


      </View>
    </ScrollView>
  );
};

export default Medicalprescription;

const styles = StyleSheet.create({
  modalContainernew: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentnew: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
    margin: 10,
  },
  menuItemnew: {
    paddingVertical: 8,
  },
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
    height: height * 0.9,
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
    marginTop: 13,
    height: 50,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'NunitoSans_7pt-Bold',
    textAlign: 'center',
    fontSize: 16,
  },
  itemContainer: {
    margin: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    padding: 10,
  },
  input: {
    // marginBottom: 15,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    // borderRadius: 8,
    marginVertical: 8,
    height: 60
  },
  dropdown: {
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    // borderRadius: 8,
    marginVertical: 8,
    height: 50
  },
  input1: {
    // width: '45%',
    // marginBottom: 15,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    // borderRadius: 8,
    marginVertical: 8,
    height: 50
  },
  heading: {
    fontSize: 15,
    fontWeight: '700',
    color: 'black'
  }
});
