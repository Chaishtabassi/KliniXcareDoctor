import React, { useEffect } from 'react';
import { View, Image, StyleSheet ,Dimensions} from 'react-native';

const Splashscreen = ({ navigation }) => {
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      clearTimeout(splashTimeout);
      navigation.navigate('SignInScreen');
    }, 3000);
    return () => clearTimeout(splashTimeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../Assets/Logo.png')}   style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#3498db',
  },
  logo: {
    width: Dimensions.get('window').width * 0.8, 
    height: Dimensions.get('window').width * 0.5, 
  },

});

export default Splashscreen;
