import { StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import AgoraUIKit from 'agora-rn-uikit';

const Vedioscreen = ({ navigation }) => {
  const [videoCall, setVideoCall] = useState(true);
  const connectionData = {appId: '2d980e896e904bb09fbb85a4760cb957', channel: 'test'};
  const rtcCallbacks = {
    EndCall: () => {
      setVideoCall(false);
      navigation.navigate('bottom');
    },
  };
  
  return videoCall ? <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} /> : null;
};

export default Vedioscreen

const styles = StyleSheet.create({})
