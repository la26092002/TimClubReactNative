import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import axios from "axios";
import { withNavigation } from "react-navigation";

function Content({ navigation }) {

  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const handlePress = () => {
    const fetchData = async () => {
      try {
        //let categorie = "All";    192.168.1.34
        const response = await axios.post('https://timclubapi.onrender.com/api/users/exist', { email });
        //console.log(response.data);
        const fetchedEvents = response.data;
        console.log(fetchedEvents)
        setError(false)
        if (fetchedEvents.status == 1) {
          //console.log(email)
          navigation.navigate("Login", { email: email })
        } else if (fetchedEvents.status == 2) {
          navigation.navigate("Signin", { email: email })
        }
      } catch (err) {
        setError(true)
        console.log(err)
      }
    }
    fetchData();
  }
  const handlePressinfo = () => {
    navigation.navigate("Propos")
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.image} source={require("../../assets/images/logo.png")} />

      <View style={[styles.elevation, styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          required
        />

      </View>
      {error && (<Text style={{ color: 'red' }}>Your informations are incorrect </Text>)}
      <View style={styles.iconContainer}>

        <View style={[styles.iconsRow]}>

          <Text>         </Text>
          <TouchableOpacity onPress={handlePress}>
            <AntDesign name="rightcircle" size={50} color="black" />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
export default withNavigation(Content);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', // Center both horizontally and vertically
    marginTop: 5,
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

  },
  icon: {
    width: wp(30),
    backgroundColor: 'transparent', // You can adjust the background color as needed
  }
});
