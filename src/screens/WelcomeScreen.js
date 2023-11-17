import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import FixedBottomViewLog from '../Components/FixedBottomViewLog'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WelcomeScreen() {
  return (
    <View>
      <View style={styles.Container}>
        
        <View style={styles.headers}>
          <Text style={styles.header1}>Wellcome To The </Text>
          <Text style={styles.header1}>TIM CLUB </Text>
          <Text style={styles.header2}>APP!</Text>
        </View>
        <View style={[styles.imageVew]}>
        <Image style={[styles.image]} source={require("./../assets/images/logo.png")} />
        <Text style={{fontSize: 25,color:'black'}}>The Intelligent Minds Club</Text>
        </View>
        <View style={[styles.HeaderPart]}>
        <Text style={styles.header1}>Be Parts Of Our</Text>
        <Text style={styles.header2}>Project!</Text>
        </View>
      </View>




      <View style={styles.ContainerFooter}>
        <FixedBottomViewLog />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    marginTop: hp(5),
    height: hp(85),
    width: wp(85),
    marginHorizontal: 25,
    
    
  },
  ContainerFooter: {
    height: hp(10),
    width: wp(100)
  },
  headers: {
    height: hp(25),
    paddingTop: hp(6)
  },
  imageVew:{
    height: hp(40),
    alignItems: 'center',
    justifyContent: 'center'
  },
  HeaderPart:{
    height: hp(20),
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
    opacity: 10,
    

  },
  header1: {
    fontSize: 35,
  },
  header2: {
    fontSize: 40,
    fontWeight: "bold",
  },
});