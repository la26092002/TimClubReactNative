import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import FixedBottomViewLog from "../Components/FixedBottomViewLog";

function ForgetPassScreen({navigation}) {
  const email = navigation.getParam("email");
  console.log("forget mail",email)
  const [reload, setReload] = useState(false);
  const [code, setCode] = useState(false);



  const [codeConfirmation, setCodeConfirmation] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const fetchDataa = async () => {
      try {

        setReload(true)
        const response = await axios.post('https://timclubapi.onrender.com/api/users/emailConfirme', { email });
        console.log(response.data.code);
        setCode(response.data.code)
        setReload(false)

      } catch (err) {
        setReload(false);
        navigation.navigate("Email")
        console.log(err)
      }
    }
    fetchDataa();
  }, [navigation]);

  const handlePress = async() => {
    try {
    const response = await axios.put('https://timclubapi.onrender.com/api/users/ForgetPass', { email, password,  code, codeConfirmation });
    console.log(response.data);
    if(response.data.token){
      await AsyncStorage.setItem('tokenClub', response.data.token);
        navigation.navigate("Events")
    }else{
      navigation.navigate("Email")
    }
  } catch (err) {
    navigation.navigate("Email")
    console.log(err)
  }
    //setCode(response.data.code)
  }
  return (
    reload ? (
      <View style={{ marginTop: hp(50) }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    ) : (
      <View>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.ViewImage}>
            <Image style={styles.image} source={require("./../assets/images/logo.png")} />
            <Text style={styles.txt}>Email : {email}</Text>
          </View>
          <View style={[styles.body]}>
            <View style={[styles.elevation, styles.inputContainer]}>
              <TextInput
                style={styles.input}
                placeholder="code confirmation"
                onChangeText={(text) => setCodeConfirmation(text)}
              />
            </View>
            <View style={[styles.elevation, styles.inputContainer]}>
              <TextInput
                style={styles.input}
                placeholder="New Pssword"
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handlePress}>
                <AntDesign name="rightcircle" size={50} color="black"  />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
        <View style={styles.ContainerFooter}>
        <FixedBottomViewLog />
      </View>
        </View>
      </View>
    )
  )
}

export default withNavigation(ForgetPassScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(90),
    width: wp(85),
    marginHorizontal: 25,
  },
  ViewImage: {
    height: hp(20),
    marginTop: hp(10)
  },
  inputContainer: {
    marginTop: hp(2),
    backgroundColor: "white",
    padding: 15,
    borderRadius: 40,
    width: wp(90),
    height: hp(5)
  },
  iconContainer: {
    marginTop: hp(2),
    alignItems: 'center', // Center horizontally
  },
  elevation: {
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    opacity: 10
  },
  txt: {
    alignItems: 'center'
  },
  icon: {
    marginTop: hp(1)
  },
  ContainerFooter: {
    height:hp(10),
    width:wp(100)
  }
});
