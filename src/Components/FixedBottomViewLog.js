import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';

function FixedBottomViewLog({ navigation}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Welcome")
      }}>

        <Text style={styles.buttonText}>
        <FontAwesome5 name="home" size={24} color="black" />
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Email")
      }}>

        <Text style={styles.buttonText}>
        <Entypo name="login" size={24} color="black" />
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate("Propos")
      }}>
        <Text style={styles.buttonText}>
        <AntDesign   name="infocirlce" size={24} color="black" />
        </Text>
      </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Set the background color as needed
      paddingVertical: 20,
  
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      backgroundColor: 'white', // Set the button color as needed
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
export default withNavigation(FixedBottomViewLog);