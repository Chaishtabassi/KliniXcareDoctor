import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import Backbutton from '../Component/Backbutton'

const Appointment = () => {
  return (
    <View style={styles.container}>
       <View style={styles.header}>
      <Backbutton/>
      <Text style={styles.title}>My Appointment</Text>
    </View>
 
    {/* <View style={{margin:15}}>
        <Text style={styles.title1}>Upcoming</Text>
       <View style={{flexDirection:'row',top:10}}>
          <View style={styles.box}></View>
       
       <View style={{flexDirection:'column'}}>
       <View style={{flexDirection:'row',marginLeft:10}}>
            <Image style={{height:70,width:70}} source={require('../../Assets/doctorsimage.png')}/>
            <View style={{flexDirection:'column',marginLeft:10}}>
            <Text style={{fontSize:18,fontFamily:'Domine-Bold'}}>Lumbar puncture</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{height:12,width:12}} source={require('../../Assets/clock.png')}/>
               <Text style={{fontFamily:'Domine-Regular'}}> at 4:30 pm</Text>
            </View>
            </View>
          </View>

          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginLeft:20}}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Text>Confirmed</Text>
          <Image source={require('../../Assets/checks.png')}/>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:35,width:90,backgroundColor:'#888888'}}> 
          <Image source={require('../../Assets/chat.png')}/>
          <Text style={{color:'white'}}> 
          Chat</Text>
        </View>
       </View>
       </View>

       </View>

    <View style={styles.separator}></View>

    </View> */}

    
    <View style={{margin:15}}>
        <Text style={styles.title1}>Past Appointment</Text>
       
        <View style={{ flexDirection: 'row', top: 10 }}>
          <Image source={require('../Assets/doctorsimage.png')} />
          <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold' }}>Lumbar puncture</Text>
              <Text style={{ fontFamily: 'Domine-Regular' }}> Dermatologists</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text>$24</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ height: 12, width: 12 }} source={require('../Assets/clock.png')} />
              <Text style={{ fontFamily: 'Domine-Regular' }}> Jan 15, Sunday</Text>
            </View>
          <TouchableOpacity style={styles.button1}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              {/* <Image  style={{height:12,width:12}}source={require('../../Assets/loader.png')}/> */}
              <Text style={styles.buttonText}> In Process</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            {/* <Image  style={{height:12,width:12}}source={require('../../Assets/download.png')}/> */}
            <Text style={styles.buttonText}> Download</Text>
            </View>
        </TouchableOpacity>

        </View>

        <View style={{margin:10}}> 
        <View style={styles.separator}></View>
        </View>
          
        <View style={{ flexDirection: 'row', top: 10 }}>
          <Image source={require('../Assets/doctorsimage.png')} />
          <View style={{ flexDirection: 'column', marginLeft: 10, flex: 1 }}>
            <Text style={{ fontSize: 18, fontFamily: 'Domine-Bold' }}>Lumbar puncture</Text>
              <Text style={{ fontFamily: 'Domine-Regular' }}> Dermatologists</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text>$24</Text>
          </View>
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ height: 12, width: 12 }} source={require('../Assets/clock.png')} />
              <Text style={{ fontFamily: 'Domine-Regular' }}> Jan 15, Sunday</Text>
            </View>
          <TouchableOpacity style={styles.button1}>
              <View style={{flexDirection:'row',alignItems:'center'}}>
              {/* <Image  style={{height:12,width:12}}source={require('../../Assets/loader.png')}/> */}
              <Text style={styles.buttonText}> In Process</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {/* <Image  style={{height:10,width:10}}source={require('../../Assets/download.png')}/> */}
            <Text style={styles.buttonText}> Download</Text>
            </View>
        </TouchableOpacity>

        </View>

    </View>

    </View>
  )
}

export default Appointment

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
  title1:{
    fontSize:15,
    fontFamily:'Domine-Bold',
  },
  box:{
    width:100,
    height:100,
    backgroundColor:'#49b2e9'
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e1da',
    marginTop:10
  },
  button1: {
    backgroundColor: '#49b2e9',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 5,
    width: '30%', 
  },
  button2: {
    backgroundColor: '#888888',
    paddingHorizontal: 20,
    // paddingVertical: 10,
    borderRadius: 5,
    width: '30%', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
})