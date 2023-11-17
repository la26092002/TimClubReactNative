import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

export default function Categories({name,nameIcon,index,onPressCategoryItem,active}) {
    return (
        <TouchableOpacity onPress={onPressCategoryItem}>
        <View style={[
            styles.container,{ backgroundColor: "white" },
            (index === 0 ? { marginLeft: 5 } : { marginLeft: 15 }),
            (active ? { backgroundColor: "rgb(241,186,87)" }: { backgroundColor: "white" })
            ]}>
            <View style={[styles.imageContainer]}>
            <FontAwesome5 name={nameIcon} size={24} color="black" />
            </View>
            <Text style={styles.header}>{name}</Text>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
      width: 70,
      height: 100,
      borderRadius: 500,
      alignItems: "center",
      justifyContent: "center",
      shadowOffset: { width: 5, height: 5 },
      shadowColor: "black",
      shadowOpacity: 0.1,
      elevation: 3,
      marginBottom: 7,
    },
    imageContainer: {
      width: 50,
      height: 50,
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 500,
      marginBottom: 5,
    },
    header: {
      fontWeight: "bold",
      fontSize: 10
    },
  });

