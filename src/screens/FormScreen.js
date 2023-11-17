//rnf
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Content from '../Components/FormScreen/Content'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from "react-navigation";


function FormScreen({navigation}) {
  useEffect(() => {
    // Use AsyncStorage.getItem as an async function
    async function checkToken() {
      try {
        const tokenClub = await AsyncStorage.getItem('tokenClub');
        if (tokenClub === null) {
          navigation.navigate("Email");
        }
      } catch (error) {
        // Handle errors here
        console.error("Error retrieving tokenClub:", error);
      }
    }

    checkToken();
  }, []);
  return (
    <View>
      <Content></Content>
    </View>
  )
}
export default withNavigation(FormScreen);