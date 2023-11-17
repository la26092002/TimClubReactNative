import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FixedBottomView from '../FixedBottomView';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { withNavigation } from "react-navigation";


const Content = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [univ, setUniv] = useState("");
    const [password, setPassword] = useState("");
    const [passwordnew, setPasswordnew] = useState("");


    const [updateName, setUpdateName] = useState(false);
    const [updatePassword, setUpdatePassword] = useState(false);
    const [updateUniv, setUpdateUniv] = useState(false);

    const [change, setChange] = useState(false);

    const [errorName, setErrorName] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorUniv, setErrorUniv] = useState(false);

    

    const handlePressName = () => {
        const fetchData = async () => {
            
            try {
                if (updateName) {
                    console.log("update")
                    //http://localhost:5000/api/users/updateName
                    const tokenClub = await AsyncStorage.getItem('tokenClub');
                    const response = await axios.put('https://timclubapi.onrender.com/api/users/updateName', { name },
                        {
                            headers: {
                                'x-auth-token': tokenClub,
                            },
                        });
                    setName("")
                    setChange(!change)
    
                }
                setUpdateName(!updateName)

                console.log(updateName)
                setErrorName(false)
            } catch (err) {
                setErrorName(true)
                console.log(err)
            }
        }
        fetchData();
    }
    const handlePressPassword = () => {
        const fetchData = async () => {
            try {
                if (updatePassword) {
                    //http://localhost:5000/api/users/updateName
                    
                    const tokenClub = await AsyncStorage.getItem('tokenClub');
                    const response = await axios.put('https://timclubapi.onrender.com/api/users/updatePassword', {password,passwordnew},
                    {
                        headers: {
                            'x-auth-token': tokenClub,
                        },
                      });
                    
                    setPassword("")
                    setChange(!change)

                }
                setUpdatePassword(!updatePassword)
                setErrorPass(false)
            } catch (err) {
                setErrorPass(true)
                console.log(err)
            }
        }
        fetchData();
    }
    const handlePressPasswordCancel =()=>{
        const fetchData = async () => {
            
                    
                    setPassword("")
                    setChange(!change)
                setUpdatePassword(!updatePassword)
        }
        fetchData();
    }
    const handlePressUniv = () => {
        const fetchData = async () => {
            try {
                if (updateUniv) {
                    console.log("univ")
                    const tokenClub = await AsyncStorage.getItem('tokenClub');
                    const university = univ;
                    const response = await axios.put('https://timclubapi.onrender.com/api/users/updateuniversity', { university },
                        {
                            headers: {
                                'x-auth-token': tokenClub,
                            },
                        });
                    console.log(response.data)
                    setUniv("")
                    setChange(!change)

                }
                setUpdateUniv(!updateUniv)
                setErrorUniv(false)

            } catch (err) {
                setErrorUniv(true)
                console.log(err)
            }
        }
        fetchData();
    }

    useEffect(() => {//For fetching Data
        const fetchData = async () => {
            try {
                const tokenClub = await AsyncStorage.getItem('tokenClub');
                
                const response = await axios.get('https://timclubapi.onrender.com/api/auth', {
                    headers: {
                        'x-auth-token': tokenClub,
                    },
                });
                // Handle the response data
                //setUser(response.data)
                const { name } = response.data;
                setName(name);

                const { email } = response.data;
                setEmail(email);

                const { university } = response.data; setUniv(university)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, [change])
    return (
        <View style={styles.container}>
            <View style={styles.headercontainer}>
                <Text style={styles.header2} >
                    Account
                </Text>
                <Text style={styles.header1} >
                    informations
                </Text>
            </View>
            <View style={styles.bodycontainer}>
                <View style={styles.inputView}>
                    <View style={[styles.elevation, styles.inputContainer]}>
                        <TextInput
                            placeholder={email}
                            style={styles.input}
                            editable={false}
                        />
                    </View>
                </View>
                <View style={styles.inputView}>
                    <View style={[styles.elevation, styles.inputContainer]}>
                        <TextInput
                            placeholder={name}
                            style={styles.input}
                            editable={updateName ? true : false}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={handlePressName}>
                        <Text style={styles.update}
                        > {updateName ? "Save Name" : "Update Name"}</Text>
                    </TouchableOpacity>
                </View>
                {errorName && (<Text style={{color:'red'}}>Your informations are incorrect </Text>)}
                <View style={styles.inputView}>
                    <View style={[styles.elevation, styles.inputContainer]}>
                        <TextInput
                            placeholder={updatePassword ? "Your Password":("********")}
                            style={styles.input}
                            secureTextEntry={true}
                            editable={updatePassword ? true : false}
                            onChangeText={(text) => setPassword(text)}
                        />
                    </View>

                    <TouchableOpacity onPress={updatePassword?handlePressPasswordCancel:handlePressPassword}>
                        <Text style={[styles.update, { color: updatePassword ? "red" : "black"}]}
                        >{updatePassword ? "Cancel" : "Update Password"}</Text>
                    </TouchableOpacity>
                </View>
                {updatePassword && (
                    <View style={styles.inputView}>
                        <View style={[styles.elevation, styles.inputContainer]}>
                            <TextInput
                                placeholder="New Password"
                                secureTextEntry={true}
                                style={styles.input}
                                editable={updatePassword ? true : false}
                                onChangeText={(text) => setPasswordnew(text)}
                            />
                        </View>
                        <TouchableOpacity onPress={handlePressPassword}>
                            <Text style={styles.update}>{updatePassword ? "Save Password" : "Update Password"}</Text>
                        </TouchableOpacity>
                    </View>
                )}

{errorPass && (<Text style={{color:'red'}}>Your informations are incorrect </Text>)}
                <View style={styles.inputView}>
                    <View style={[styles.elevation, styles.inputContainer]}>
                        <TextInput
                            placeholder={univ}
                            style={styles.input}
                            editable={updateUniv ? true : false}
                            onChangeText={(text) => setUniv(text)}
                        />
                    </View>
                    <TouchableOpacity onPress={handlePressUniv}>
                        <Text style={styles.update}>{updateUniv ? "Save university" : "Update university"}</Text>


                    </TouchableOpacity>
                </View>

                {errorUniv && (<Text style={{color:'red'}}>Your informations are incorrect </Text>)}
            </View>
            <View style={styles.footercontainer}>
                <FixedBottomView change={change} setChange={setChange} />
            </View>

        </View>
    )
}

export default withNavigation(Content);




const styles = StyleSheet.create({
    container: {
        height: hp(100),
        width: wp(100),
        marginHorizontal: 25
    },
    headercontainer: {
        height: hp(20),
        width: wp(85),
        justifyContent: 'center'
    }, bodycontainer: {
        height: hp(70),
        width: wp(85)
    }, footercontainer: {
        height: hp(10),
        width: wp(85)
    }, header1: {
        fontSize: 40,
        fontWeight: "bold",
    }, header2: {
        fontSize: 35,
        fontWeight: "bold",
    }, inputContainer: {
        
        backgroundColor: "white",
        padding: 15,
        borderRadius: 40,
        width: wp(75),
        height: hp(5)
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
        alignItems: 'center'
    },
    update: {

        paddingTop: hp(1),
        paddingLeft: 15,
        paddingRight: 15,
        width: wp(25),
        justifyContent: 'center', // Center vertically
        alignItems: 'center'
    },
    inputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:hp(2)
    }
});
