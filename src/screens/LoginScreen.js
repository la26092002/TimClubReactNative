import { StatusBar, StyleSheet, Text, View } from "react-native";
import Content from "../Components/LoginScreen/Content";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";

function LoginScreen({navigation}) {
  
  const email = navigation.getParam("email");
  console.log(email)

  useEffect(() => {
    // Use AsyncStorage.getItem as an async function
    async function checkToken() {
      try {
        const tokenClub = await AsyncStorage.getItem('tokenClub');
        if (tokenClub !== null) {
          navigation.navigate("Events");
        }
      } catch (error) {
        // Handle errors here
        console.error("Error retrieving tokenClub:", error);
      }
    }

    checkToken();
  }, []);
    return (
        <View style={styles.Container}>
        <Content email={email}/>
      </View>
    );
  }
  export default withNavigation(LoginScreen);

  const styles = StyleSheet.create({
    Container: {
      height:hp(100),
      width:wp(100)
    },
  });