import React from "react";
import { View, Text, StyleSheet } from "react-native";

const TableModel: React.FC = () => {
  return (
    <View style={styles.centered}>
      <Text style={styles.text}>This is this is Table Model</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TableModel;
