import { StatusBar, StyleSheet, Text, View } from "react-native";
import Content from "../Components/SigninScreen/Content";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";
import { useEffect } from "react";

function LoginScreen({navigation}) {
  const email = navigation.getParam("email");

  
    return (
        <View style={styles.Container}>
        <Content email={email} />
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