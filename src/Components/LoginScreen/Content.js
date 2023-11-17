import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import axios from "axios";
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FixedBottomViewLog from "../FixedBottomViewLog";

function Content({ email, navigation }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handlePress = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    const fetchData = async () => {
      try {
        let dataToSend = {
          email,
          password,
        };
        const response = await axios.post('https://timclubapi.onrender.com/api/auth', dataToSend, {
          headers: {
            'Content-type': 'application/json'
          }
        });
        const fetchedEvents = response.data;
        console.log(`Data is ${fetchedEvents.token}`);
        await AsyncStorage.setItem('tokenClub', fetchedEvents.token);
        navigation.navigate("Events")
      } catch (err) {
        setError(true)
        console.error("Axios Error:", err); // Log the error here
      }
    }
    fetchData();
  }

  const handlePressForgetPass = () => {

    const fetchData = async () => {
      navigation.navigate("ForgetPass", { email })
    }
    fetchData();
  }


  return (
    <>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Image style={styles.image} source={require("../../assets/images/logo.png")} />
        <Text>Email : {email}</Text>


        <View style={[styles.elevation, styles.inputContainer]}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          />



        </View>
        <TouchableOpacity onPress={handlePressForgetPass}>
          <Text>Forget password ?</Text>
        </TouchableOpacity>
        {error && (<Text style={{ color: 'red' }}>Your informations are incorrect </Text>)}
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handlePress}>
            <AntDesign name="rightcircle" size={50} color="black" style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ContainerFooter}>
        <FixedBottomViewLog />
      </View>
    </>
  );
}
export default withNavigation(Content);
const styles = StyleSheet.create({
  container: {
    height: hp(90),
    width: wp(100),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  inputContainer: {
    marginTop: 5,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 40,
    width: 350,
    marginTop: 30,
  },
  iconContainer: {
    marginTop: 5,
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
    height: 200,
    width: 200,
    opacity: 10
  },
  icon: {
    marginTop: 30
  },
  ContainerFooter: {
    height: hp(10),
    width: wp(100),
  },
});
