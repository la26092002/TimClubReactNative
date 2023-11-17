import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const Join = ({ background, content,handlePressSubscribe }) => {
  return (
    <TouchableOpacity onPress={handlePressSubscribe}>
      <View style={[styles.join, { backgroundColor: `${background}` }]}>
        <Text>{content}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  join: {
    width: 100,
    height: 60,
    borderRadius: 40,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity: 0.1,
    elevation: 3,
    marginBottom: 7,
  }
});

export default Join