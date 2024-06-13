import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Button from ".././assets/icons/BackButton.png"; // Adjust the import path accordingly

const BackButton = () => {
  return (
    <View style={styles.container}>
      <Image source={Button} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 21, // Adjust width as necessary
    height: 21, // Adjust height as necessary
    resizeMode: "contain",
  },
});

export default BackButton;
