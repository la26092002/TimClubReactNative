import { StyleSheet, View } from "react-native";
import Content from "../Components/EventsScreen/Content";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from "react-navigation";
import { useEffect } from "react";


function EventsScreen({navigation}) {
  
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
  }, [navigation]);
  return (
    <>
    <View style={styles.Container}>
      <Content />
    </View>
    </>
  );
}
export default withNavigation(EventsScreen);


const styles = StyleSheet.create({
  Container: {
    height:hp(100),
    width:wp(100)
  },
});