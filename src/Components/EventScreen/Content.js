import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import Join from './Join'
import FixedBottomView from '../FixedBottomView'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withNavigation } from "react-navigation";

const Content = ({ id ,navigation}) => {
  console.log(`id:: ${id}`)
  const [event, setEvent] = useState({});
  const [statusSubscribe, setStatusSubscribe] = useState({});
  const [change, setChange] = useState(false);


  useEffect(() => {//For fetching Data
    const fetchData = async () => {
      try {
        const tokenClub = await AsyncStorage.getItem('tokenClub');
       
       // console.log("token dash", tokenClub)

        //let categorie = "All";    192.168.1.34
        const response = await axios.get('https://timclubapi.onrender.com/api/event/' + id);
        //console.log(response.data);
        const fetchedEvents = response.data;
        setEvent(fetchedEvents);


        const Subscribe = await axios.get('https://timclubapi.onrender.com/api/event/Subscribe/' + id,
          {
            headers: {
              'x-auth-token': tokenClub,
            },
          });
        const fetchedSubscribe = Subscribe.data;
        setStatusSubscribe(fetchedSubscribe.status)
        //console.log("sub", statusSubscribe)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, [id,change])


  const handlePressSubscribe = () => {
    const fetchData = async () => {

      try {
          //(true)
          setChange(true)
          
          const tokenClub = await AsyncStorage.getItem('tokenClub');// + id
          if(!statusSubscribe){
            console.log("Add")
          console.log(tokenClub)
          const Subscribe = await axios.post(
            'https://timclubapi.onrender.com/api/event/AddSubscribe/' + id,
            {},
            {
              headers: {
                'x-auth-token': tokenClub,
              },
            }
          );
          //const fetchedSubscribe = Subscribe.data;
          //console.log(fetchedSubscribe)

        }else{
          console.log("remove")
          const Subscribe = await axios.delete(
            'https://timclubapi.onrender.com/api/event/RemoveSubscribe/' + id,
            {
              headers: {
                'x-auth-token': tokenClub,
              },
            }
          );
        }
        setChange(false)

      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }



  const data = [];
  return (
    <View style={styles.container}>
      <View style={styles.TitleMain}>
        <Text style={styles.header1}>{event.title}</Text>
      </View>
      <View style={styles.ImageMain}>
        <Image
          source={{ uri: event.image }}
          style={[styles.image]} // Adjust the dimensions as needed
        />
      </View>
      <View style={styles.info}>

        <FlatList
          data={data}
          keyExtractor={"1"}
          ListEmptyComponent={() => (
            <View style={[{ alignItems: "center" }]}>
              <Text style={styles.header2}>{event.description}</Text>
              <Join background={statusSubscribe ? "red" : "green"}
                content={statusSubscribe ? "unsubscribe" : "subscribe"}
                handlePressSubscribe={handlePressSubscribe}
              />
            </View>
          )}
        />

      </View>
      <View style={[styles.footer]}>
        <FixedBottomView />
      </View>
    </View>
  )
}

export default withNavigation(Content);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 25,
    height: hp(100),
    width: wp(100)
  },
  TitleMain: {
    height: hp(15),
    width: wp(85),
    alignItems: "center",
    justifyContent: "center",
    paddingTop:hp(2)
  },
  header1: {
    fontSize: 35,

  },
  ImageMain: {
    height: hp(35),
    width: wp(85),
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    borderRadius: 20,
    height: 300,
    width: 300,
  },
  info: {
    height: hp(40),
    width: wp(85),
    alignItems: "center"

  },
  header2: {
    fontSize: 20,
  },
  join: {
    width: 100,
    height: 60,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  footer: {
    height: hp(10),
    width: wp(85),
  },
  
});
