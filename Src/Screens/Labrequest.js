import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import Icon from 'react-native-vector-icons/AntDesign';

const Labrequest = ({ navigation, route }) => {
    const selectedpatient = route.params ? route.params.selectedpatient : null;

    const [labData, setLabData] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const [otherfield, setotherfield] = useState('');
    const [labRequestId, setLabRequestId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = await AsyncStorage.getItem('access_token');
                const authToken = `Bearer ${access_token}`;

                const requestOptions = {
                    method: "POST",
                    headers: {
                        Authorization: authToken,
                    },
                    redirect: "follow"
                };

                const response = await fetch("http://teleforceglobal.com/doctor/api/v1/labRequestForm", requestOptions);
                if (response.ok) {
                    const result = await response.json();
                    setLabData(result);
                } else {
                    console.error("Failed to fetch data");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getlabrequest = async () => {
            const access_token = await AsyncStorage.getItem('access_token');
            const authToken = access_token;

            try {
                const api = 'http://teleforceglobal.com/doctor/api/v1/getLabRequest';
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ appointment_id: selectedpatient.id }),
                };

                const response = await fetch(api, requestOptions);

                if (response.ok) {
                    const responseData = await response.json();
                    console.log("Response data:", responseData.data);
                    if (responseData.status === true && responseData.data) {
                        setLabRequestId(responseData.data.id);

                        const updatedSelectedItems = {};

                        Object.entries(responseData.data).forEach(([key, value]) => {
                            if (key !== 'status' && key !== 'id' && value !== null && typeof value === 'object' && Object.keys(value).length > 0) {
                                updatedSelectedItems[key] = {}; // Initialize an empty object for the category
                                Object.keys(value).forEach(itemId => {
                                    updatedSelectedItems[key][itemId] = true; // Set the value to true for each item
                                });
                            }
                        });


                        setSelectedItems(updatedSelectedItems);
                        console.log("Updated selected items:", updatedSelectedItems);
                        setotherfield(responseData.data.other || '');
                        setIsEdit(true);
                    }
                } else {
                    console.error('Failed to fetch lab request');
                }
            } catch (error) {
                console.error('Error fetching lab request:', error);
            }
        };


        getlabrequest();
    }, []);


    const addLabRequest = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;

        try {
            const api = `http://teleforceglobal.com/doctor/api/v1/addLabRequest`;
            const authToken = bearerToken;
            const formData = new FormData();

            formData.append('appointment_id', selectedpatient.id);
            Object.entries(selectedItems).forEach(([category, items]) => {
                const selectedCategoryItems = Object.entries(items)
                    .filter(([itemId, isSelected]) => isSelected)
                    .map(([itemId]) => itemId);

                if (selectedCategoryItems.length > 0) {
                    formData.append(category, selectedCategoryItems.join(','));
                }
            });

            formData.append('other', otherfield);
            console.log(formData)

            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });

            if (response) {
                const responseData = await response.json();
                console.log(responseData)
                if (responseData.status === true) {
                    Toast.show({
                        type: 'success',
                        text1: responseData.message,
                    });
                    navigation.goBack();
                    if (isEdit) {
                        setIsEdit(false);
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: responseData.message,
                    });
                }
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    const editLabRequest = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;

        try {
            const api = `http://teleforceglobal.com/doctor/api/v1/editLabRequest`;
            const authToken = bearerToken;
            const formData = new FormData();

            formData.append('labRequest_id', labRequestId);

            Object.entries(selectedItems).forEach(([category, items]) => {
                const selectedCategoryItems = Object.entries(items)
                    .filter(([itemId, isSelected]) => isSelected)
                    .map(([itemId]) => itemId);
    
                if (selectedCategoryItems.length > 0) {
                    formData.append(category, selectedCategoryItems.join(','));
                }
            });

            formData.append('other', otherfield);

            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData)
                if (responseData.status === true) {
                    Toast.show({
                        type: 'success',
                        text1: responseData.message,
                    });
                    navigation.goBack();
                    if (isEdit) {
                        setIsEdit(false);
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: responseData.message,
                    });
                }
            } else {
                console.error("Failed to edit lab request");
            }
        } catch (error) {
            console.error('Error editing lab request:', error);
        }
    };

    const handleBackButtonPress = () => {
        navigation.goBack();
    };

    const handleCheckboxToggle = (category, itemId) => {
        setSelectedItems(prevState => {
            const updatedItems = {
                ...prevState,
                [category]: {
                    ...prevState[category],
                    [itemId]: !prevState[category]?.[itemId]
                }
            };
            console.log(updatedItems); // Log the updated state
            return updatedItems;
        });
    };
    
    

    const Printlabrequest = async () => {
        try {
            const apiUrl = 'http://teleforceglobal.com/doctor/api/v1/printLabRequest';
            const access_token = await AsyncStorage.getItem('access_token');
            console.log(access_token)
            const authToken = access_token;

            const formData = new FormData();
            formData.append('appointment_id', selectedpatient.id);

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

                const pdfUrl = responseData.pdf_url;
                const { config, fs } = RNFetchBlob;

                const dest = fs.dirs.DownloadDir + '/Lab Request.pdf';

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

    const deletelabrequest = async () => {
        const access_token = await AsyncStorage.getItem('access_token');
        const bearerToken = access_token;

        try {
            const api = `http://teleforceglobal.com/doctor/api/v1/deleteLabRequest`;
            const authToken = bearerToken;
            const formData = new FormData();

            formData.append('labRequest_id', labRequestId);

            const response = await fetch(api, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.status === true) {
                    Toast.show({
                        type: 'success',
                        text1: responseData.message,
                    });
                    navigation.goBack();
                    if (isEdit) {
                        setIsEdit(false);
                    }
                } else {
                    Toast.show({
                        type: 'error',
                        text1: responseData.message,
                    });
                }
            } else {
                console.error("Failed to edit lab request");
            }
        } catch (error) {
            console.error('Error editing lab request:', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor: '#4e93e1',
                }}>
                    <TouchableOpacity onPress={handleBackButtonPress}>
                        <Image
                            resizeMode="contain"
                            style={{
                                height: 15,
                                width: 15,
                                marginLeft: 10,
                                tintColor: '#FFF',
                            }}
                            source={require('../Assets/BackButton.png')}
                        />
                    </TouchableOpacity>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#FFF',
                        }}>
                            Lab Request
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={Printlabrequest} style={{ marginLeft: 10 }}>
                            <Icon name='printer' size={20} color='white' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={deletelabrequest} style={{ marginRight: 10, marginLeft: 10 }}>
                            <Icon name='delete' size={20} color='white' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    {labData && Object.entries(labData)
                        .filter(([key]) => key !== 'status')
                        .map(([category, items]) => (
                            <View key={category}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>{category}</Text>
                                {Object.entries(items).map(([itemId, itemName]) => (
                                    <TouchableOpacity key={itemId} onPress={() => { console.log('Checkbox pressed!'); handleCheckboxToggle(category, itemId); }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <CheckBox
                                                value={selectedItems[category]?.[itemId] ? selectedItems[category]?.[itemId] : false}
                                                onValueChange={() => handleCheckboxToggle(category, itemId)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{itemName}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Other:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Other"
                        mode="outlined"
                        outlineColor="#e4efff"
                        onChangeText={setotherfield}
                        value={otherfield}
                        multiline
                        placeholderTextColor={'black'}
                        theme={{ colors: { primary: '#478ffd' } }}
                    />

                    <View>
                        {isEdit ? (
                            <TouchableOpacity style={styles.buttons} onPress={editLabRequest}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.buttons} onPress={addLabRequest}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

export default Labrequest;

const styles = StyleSheet.create({
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
    input: {
        marginVertical: 8,
        backgroundColor: '#f5f5f5',
        marginVertical: 8,
        height: 60
    },
});
