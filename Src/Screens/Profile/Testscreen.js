import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import Backbutton from '../../Component/Backbutton'

const Testscreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Backbutton/>
      <Text style={styles.title}>My tests & diagnostics</Text>
    </View>
{/* 
    <View style={{margin:15}}>
        <Text style={styles.title1}>Upcoming</Text>
       <View style={{flexDirection:'row',top:10}}>
          <View style={styles.box}></View>
          <View style={{flexDirection:'column',marginLeft:10}}>
            <Text style={{fontSize:18,fontFamily:'Domine-Bold'}}>Lumbar puncture</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{height:12,width:12}} source={require('../../Assets/clock.png')}/>
               <Text style={{fontFamily:'Domine-Regular'}}> at 4:30 pm</Text>
            </View>
          </View>
       </View>
    </View>

    <View style={{margin:10}}> 
    <View style={styles.separator}></View>
    </View> */}

    <View style={{margin:15}}>
        <Text style={styles.title1}>Past</Text>

        <View style={{flexDirection:'row',top:10,justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',marginLeft:10}}>
            <Text style={{fontSize:18,fontFamily:'Domine-Bold'}}>Lumbar puncture</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{height:12,width:12}} source={require('../../Assets/clock.png')}/>
               <Text style={{fontFamily:'Domine-Regular'}}> Jan 15, Sunday at 4:30 pm</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button1}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image  style={{height:12,width:12}}source={require('../../Assets/loader.png')}/>
            <Text style={styles.buttonText}> In Process</Text>
            </View>
        </TouchableOpacity>
       </View>
       
    </View>

    <View style={{margin:10}}> 
    <View style={styles.separator}></View>
    </View>

    <View style={{margin:15}}>
    <View style={{flexDirection:'row',top:10,justifyContent:'space-between'}}>
          <View style={{flexDirection:'column',marginLeft:10}}>
            <Text style={{fontSize:18,fontFamily:'Domine-Bold'}}>Cerebral angiography</Text>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <Image style={{height:12,width:12}} source={require('../../Assets/clock.png')}/>
               <Text style={{fontFamily:'Domine-Regular'}}> Dec 04, Sunday at 2:00 pm</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button2}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image  style={{height:12,width:12}}source={require('../../Assets/download.png')}/>
            <Text style={styles.buttonText}> Download</Text>
            </View>
        </TouchableOpacity>
       </View>
     </View>

    </View>
  )
}

export default Testscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
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
        fontFamily:'Domine-Bold',
        textAlign: 'center',
        alignSelf: 'center',
      },
      title1:{
        fontSize:20,
        fontFamily:'Domine-Bold',
      },
      box:{
        width:100,
        height:100,
        backgroundColor:'#49b2e9'
      },
      button1: {
        backgroundColor: '#49b2e9',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width: '40%', 
        marginRight:10
      },
      button2: {
        backgroundColor: '#888888',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        width: '40%', 
        marginRight:10
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#e3e1da',
        marginTop:10
      },
      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
      },
})