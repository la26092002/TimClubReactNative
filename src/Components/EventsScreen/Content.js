import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Categories from "./Categories";
import { useEffect, useState } from "react";
import Event from "./Event";
import axios from 'axios'
import FixedBottomView from "../FixedBottomView";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";



function Content() {

    const [commonCategories] = useState([
        {
            name: "All",
            icon: "star",
        },
        {
            name: "Science",
            icon: "atom",
        },
        {
            name: "Culture",
            icon: "language",
        },
        {
            name: "Sport",
            icon: "running",
        },
        {
            name: "Voluntary",
            icon: "hands-helping",
        },
    ]);
    const [term, setTerm] = useState(0);
    const [categorie, setCategorie] = useState("All");
    const [events, setEvents] = useState([]); // State to hold events data


    // GET DATA FROM DATABASE
    useEffect(() => {//For fetching Data
        const fetchData = async () => {
            try {
                const tokenClub = await AsyncStorage.getItem('tokenClub');
                console.log("token dash", tokenClub)
                //let categorie = "All";    
                const response = await axios.get('https://timclubapi.onrender.com/api/event/cat/' + categorie);
                //console.log(response.data);
                const fetchedEvents = response.data;
                setEvents(fetchedEvents);
                //console.log(categorie)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [categorie])
    return (

        <View style={styles.container}>

            <View style={styles.headers}>
                <Text style={styles.header1}>Get the most important</Text>
                <Text style={styles.header2}>activities!</Text>
            </View>

            <View style={styles.categories}>
                <FlatList
                    style={styles.listCat}
                    data={commonCategories}
                    keyExtractor={(category) => category.name}
                    renderItem={({ item, index }) => (
                        <Categories name={item.name} nameIcon={item.icon}
                            index={index}
                            active={term === index}
                            onPressCategoryItem={() => {
                                setTerm(index)
                                setCategorie(item.name)
                            }}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View style={styles.Activities}>
                <Text style={styles.header3}>Activities</Text>
                <View style={{ height: hp(50) }}>
                    <FlatList
                        data={events}
                        keyExtractor={(category) => category._id}
                        renderItem={({ item, index }) => (
                            <Event id={item._id} title={item.title} image={{ uri: `${item.image}` }} />
                        )}
                        horizontal={false}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            <View style={styles.footer}>
                <FixedBottomView />
            </View>

        </View>

    );
}

export default Content;

const styles = StyleSheet.create({
    container: {
        width: wp(100),
        height: hp(100),

    },
    headers: {
        height: hp(15),
        paddingTop: hp(6),
    },
    categories: {
        height: hp(15),
        paddingTop: hp(2)
    },
    Activities: {
        height: hp(60)
    },
    footer: {
        height: hp(10)
    },
    container: {
        marginHorizontal: 25
    },
    header1: {
        fontSize: 35,
    },
    header2: {
        fontSize: 40,
        fontWeight: "bold",
    },
    header3: {
        fontSize: hp(5),
        fontWeight: "bold",
        height:hp(10),
    paddingTop:hp(2)
    },
    listCat: {
    }
});

