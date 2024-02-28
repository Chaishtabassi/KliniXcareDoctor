import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Rootnavigator from './Src/Navigation/Rootnavigator'
import firebase from '@react-native-firebase/app';
import Toast from 'react-native-toast-message';

const firebaseConfig = {
  apiKey: "AIzaSyCaLoVZkE6gv0lD6Afq08Ur69DqcQkjSAM",
  authDomain: "klinixcare.firebaseapp.com",
  // databaseURL: "https://klinixcaredoctor.firebaseio.com",
  projectId: "klinixcare",
  storageBucket: "klinixcare.appspot.com",
  messagingSenderId: "1046426294507",
  appId: "1:1046426294507:android:60ca14687ff853164546ae", 
};


export class App extends Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }
  render() {
    return (
      <View style={{flex:1}}>
      <Rootnavigator/>
      <Toast/>
    </View>
    )
  }
}

export default App

// 9927863030
// 1111
