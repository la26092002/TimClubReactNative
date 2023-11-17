import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { withNavigation } from "react-navigation";

 function Event({id,title,image,navigation}) {
    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Event",{id:id})}}>
                <View style={[styles.view,styles.container]}>
                    <View style={styles.view1}>
                        <Image source={image} style={styles.image} />
                    </View>
                    <View style={styles.view2}>
                        <Text style={styles.text}>{title}</Text>
                    </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 500,
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "black",
        shadowOpacity: 0.1,
        elevation: 3,
        marginBottom: 7,
        backgroundColor:"white"
      },
    image: {
        width: 75,
        height: 75,
        borderRadius: 400,
        marginLeft: 10,
    },
    text: {

    },
    view: {
        flexDirection: "row",
    },
    view1: {
        flex: 1,
        alignItems: "center",
    },
    view2: {
        flex: 3,
        alignItems: "center",
    },
});

export default withNavigation(Event);