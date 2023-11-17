import { Image, StatusBar, Text, View } from "react-native";
import Content from "../Components/EventScreen/Content";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from "react-navigation";
import { useEffect } from "react";

function EventScreen({navigation}) {
  const id = navigation.getParam("id");
  console.log(id)
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
      <View >
        <Content id={id}/>
        <StatusBar style="auto" />
      </View>
    );
  }
  export default withNavigation(EventScreen);