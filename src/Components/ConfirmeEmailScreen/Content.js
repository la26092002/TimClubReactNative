import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import axios from "axios";
import { withNavigation } from "react-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage';


function Content({ email, name, password, university, navigation }) {

  const [confirmeNumber, setConfirmeNumber] = useState("");
  const [code, setCode] = useState("");
  const [reload, setReload] = useState(false);


  const [error, setError] = useState(false);


  useEffect(() => {
    const fetchDataa = async () => {
      try {
        const tokenClub = await AsyncStorage.getItem('tokenClub');
                
        setReload(true)
        //let categorie = "All";    192.168.1.34
        const response = await axios.post('https://timclubapi.onrender.com/api/users/emailConfirme', { email });
        console.log(response.data.code);
        setCode(response.data.code)
        setReload(false)
      } catch (err) {

        console.log(err)
      }
    }
    fetchDataa();
  }, []);

  const handlePress = () => {
    const fetchData = async () => {
      try {
        let dataToSend = {
          email,
          name,
          password,
          university,
          code,
          confirmeNumber
        };
        const response = await axios.post('https://timclubapi.onrender.com/api/users', dataToSend, {
          headers: {
            'Content-type': 'application/json'
          }
        });
        const fetchedRegister = response.data.token;
        console.log(fetchedRegister)
        setError(false)
        if (fetchedRegister) {
          await AsyncStorage.setItem('tokenClub', fetchedRegister);
          navigation.navigate("Events")
        } else {
          console.log("errrrrrorrrrr")
          navigation.navigate("Login")
        }

      } catch (err) {
        setError(true)
        console.log(err)
      }
    }
    fetchData();
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {
        reload ? (
          <View style={{ marginTop: hp(50)}}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        ) : (
          <>
            <Image style={styles.image} source={require("../../assets/images/logo.png")} />

            <View style={[styles.elevation, styles.inputContainer]}>
              <TextInput
                style={styles.input}
                placeholder="Confirme Number"
                onChangeText={(text) => setConfirmeNumber(text)}
                required
              />

            </View>
            {error && (<Text style={{color:'red'}}>Your informations are incorrect </Text>)}
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handlePress}>
                <AntDesign name="rightcircle" size={50} color="black" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </>
        )
      }


    </View>
  );
}
export default withNavigation(Content);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 5,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 40,
    width: wp(90),
    height: hp(6),
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
    width: 200,
    height: 200,
    opacity: 10,
    marginTop: hp(20)
  },
  icon: {
    marginTop: 30
  }
});
