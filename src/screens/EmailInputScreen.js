import { StatusBar, StyleSheet, Text, View } from "react-native";
import Content from "../Components/EmailinputScreen/Content";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from "react-navigation";
import FixedBottomViewLog from "../Components/FixedBottomViewLog";

function EmailInputScreen({navigation}) {
  useEffect(() => {
    const getTokenClub = async () => {
      const tokenClub = await AsyncStorage.getItem('tokenClub');
      console.log("token:", tokenClub);
      // You can perform any necessary actions with tokenClub here
    };
  
    getTokenClub();
  }, []);
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
      <View>
      <View style={styles.Container}>
        <Content />
      </View>

    
      <View style={styles.ContainerFooter}>
        <FixedBottomViewLog />
      </View>
      </View>
    );
  }

  export default withNavigation(EmailInputScreen);
  const styles = StyleSheet.create({
    Container: {
      height:hp(90),
      width:wp(100)
    },
    ContainerFooter: {
      height:hp(10),
      width:wp(100)
    }
  });
  