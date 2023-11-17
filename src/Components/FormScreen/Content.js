import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FixedBottomView from "../FixedBottomView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Content() {
    
    const [opinion, setOpinion] = useState("");
    const [color, setColor] = useState("black");
    
    const handleSend = () => {
        const fetchData = async () => {
            try {
                if(opinion.length>0){
                    setColor("green")
                    const tokenClub = await AsyncStorage.getItem('tokenClub');
                const response = await axios.put('https://timclubapi.onrender.com/api/users/opinion', {opinion},
                    {
                        headers: {
                            'x-auth-token': tokenClub,
                        },
                    });
                    setOpinion("")
                }else{
                    setColor("red")
                }


            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={[styles.header,{color: color}]}>Give your </Text>
                <Text style={[styles.header,{color: color}]}>opinion!</Text>

            </View>
            <View style={styles.comment}>
                <View style={[styles.elevation, styles.inputContainer]}>
                    <TextInput
                        style={styles.input}
                        placeholder="opinion!"
                        value={opinion}
                        onChangeText={(text) => setOpinion(text)}
                    />
                    

                </View>
                <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handleSend} >
                            
                            <FontAwesome name="send" size={50} color="black" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
            </View>
            <View style={styles.footer}>
                <FixedBottomView />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp(100),
        width: wp(100),
        marginHorizontal: 25
    },
    title: {
        height: hp(45),
        width: wp(85),
        alignItems: "center",
        justifyContent: "center",
    },
    comment: {
        height: hp(45),
        width: wp(85)
    },
    footer: {
        height: hp(10),
        width: wp(85),
    },
    header: {
        fontSize: hp(6)
    },
    inputContainer: {
        marginTop: 5,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 40,
        width: 350,
        marginTop: 30,
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
        marginRight: 10
    },
    iconContainer: {
        marginTop: hp(5),
        alignItems: 'center', // Center horizontally
    },
});