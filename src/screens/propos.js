import { Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import FixedBottomViewLog from '../Components/FixedBottomViewLog';

function propos({ navigation }) {


    const handlePresslinkedin = () => {
        Linking.openURL("https://www.linkedin.com/company/the-intelligent-minds-club/");
    }
    const handlePressfacebook = () => {
        Linking.openURL("https://www.facebook.com/tim.club?mibextid=LQQJ4d");
    }
    const handlePressinsta = () => {
        Linking.openURL("https://instagram.com/tim__club?igshid=MzRlODBiNWFlZA==");
    }
    const handlePresslinkedinDev = () => {
        Linking.openURL("https://www.linkedin.com/in/elhadj-larbi-benyakhou-997b8827a/");
    }
    const handlePresslog = () => {
        navigation.navigate("Email")
    }
    return (
        <>
            <View style={styles.Container}>
                <ScrollView contentContainerStyle={styles.Scroll}>

                    <Image style={[styles.image, { marginTop: 100 }]} source={require("./../assets/images/logo.png")} />
                    <Text style={styles.Title}>TIM</Text>
                    <Text style={styles.header1}>Welcome to TIM Club Connect,
                        the official mobile app for The Intelligent Minds Club.
                        Our app is designed to foster knowledge exchange,
                        collaboration, and personal growth.
                        Join us in our mission to connect intelligent minds and expand your intellectual horizons.</Text>

                    <Text style={styles.header2}>social networks</Text>

                    <TouchableOpacity onPress={handlePresslinkedin}>
                        <Text style={{fontSize: hp(2),marginTop: hp(2)}}>
                            <Entypo name="linkedin-with-circle" size={20} color="black" />
                             TIM</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressinsta}>
                        <Text style={{fontSize: hp(2),marginTop: hp(2)}}>
                            <Entypo name="instagram-with-circle" size={20} color="black" />
                             tim__club</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePressfacebook}>
                        <Text style={{fontSize: hp(2),marginTop: hp(2)}}>
                            <Entypo name="facebook-with-circle" size={20} color="black" />
                             TIM</Text>
                    </TouchableOpacity>

                    <Text style={styles.header2}>Our App Developer</Text>

                    <Text style={styles.header1}>This mobile application was proudly created by <TouchableOpacity onPress={handlePresslinkedinDev}><Text style={{fontSize: 20,color:'blue'}}><Entypo name="linkedin-with-circle" size={20} color="blue" />Benyakhou Elhadj larbi</Text></TouchableOpacity>, the developer for The Intelligent Minds Club.</Text>


                </ScrollView>
            </View>
            <View style={styles.ContainerFooter}>
                <FixedBottomViewLog />
            </View>

        </>
    )
}

export default withNavigation(propos);

const styles = StyleSheet.create({
    Container: {
        marginTop: hp(5),
        height: hp(85),

    },
    Scroll: {
        width: wp(85),
        alignItems: 'center',
        marginHorizontal: 25
    },
    ContainerFooter: {
        height: hp(10),
        width: wp(100),
    },
    Title: {
        fontSize: 50,
    },
    header1: {
        fontSize: 20,
        textAlign: 'center'
    },
    header2: {
        fontSize: hp(4),
        marginTop: hp(5)
    },
    image: {
        width: 200,
        height: 200,
        opacity: 10,

    }
});