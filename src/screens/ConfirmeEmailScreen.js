import { StatusBar, StyleSheet, Text, View } from "react-native";
import Content from "../Components/ConfirmeEmailScreen/Content";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";
import { useEffect } from "react";

function ConfirmeEmailScreen({navigation}) {
  const email = navigation.getParam("email");
  const name = navigation.getParam("name");
  const password = navigation.getParam("password");
  const university = navigation.getParam("university");


 
    return (
        <View style={styles.Container}>
        <Content email={email} name={name} password={password} university={university} />
      </View>
    );
  }
  export default withNavigation(ConfirmeEmailScreen);
  const styles = StyleSheet.create({
    Container: {
      height:hp(100),
      width:wp(100)
    },
  });