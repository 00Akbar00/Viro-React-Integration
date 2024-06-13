import React from "react";
import { View, Image, StyleSheet } from "react-native";
import MenuBarIcon from ".././assets/icons/menu-bar.png"; // Adjust the import path accordingly

const MenuBar = () => {
  return (
    <View style={styles.container}>
      <Image source={MenuBarIcon} style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 23, // Adjust width as necessary
    height: 23, // Adjust height as necessary
    resizeMode: "contain",
  },
});

export default MenuBar;
