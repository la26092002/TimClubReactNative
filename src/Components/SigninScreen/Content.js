import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Content({ email,navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");
  const [university, setUniversity] = useState("");

  const [error, setError] = useState(false);
  
  const handlePress = () => {
    if(password === confirmePassword && name && university){
    console.log("name:", name);
    console.log("Password:", password);
    navigation.navigate("ConfirmeEmail",{
      email:email,
      name:name,
      password:password,
      university:university 
    })
    }else{
      setError(true)
    }
  }

  

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.ViewImage}>
        <Image style={styles.image} source={require("../../assets/images/logo.png")} />
      </View>
      <Text style={styles.txt}>Email : {email}</Text>


      <View style={[styles.elevation, styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={[styles.elevation, styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={[styles.elevation, styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="Confirme Password"
          onChangeText={(text) => setConfirmePassword(text)}

        />
      </View>


      <View style={[styles.elevation, styles.inputContainer]}>
        <TextInput
          style={styles.input}
          placeholder="University"
          onChangeText={(text) => setUniversity(text)}
        />
      </View>
      {error && (<Text style={{color:'red'}}>Your informations are incorrect </Text>)}
      <View style={styles.iconContainer}>
      <TouchableOpacity onPress={handlePress}>
        <AntDesign name="rightcircle" size={50} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withNavigation(Content);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  ViewImage: {
    height: hp(25),
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
  icon: {
    marginTop: hp(1)
  }
});
