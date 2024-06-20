import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { colors, network } from "../../constants";
import Ionicons from "react-native-vector-icons/Ionicons";
import addCartIcon from "../../assets/icons/add-to-cart.png";

const ProductCard = ({
  name,
  price,
  image,
  quantity,
  onPress,
  onPressSecondary,
  cardSize,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { width: cardSize === "large" ? "100%" : 150 }]}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.secondaryTextSm}>{`${name.substring(
            0,
            10
          )}..`}</Text>
          <Text style={styles.primaryTextSm}>{price}Rs</Text>
        </View>
        <View>
          {quantity > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onPressSecondary}
            >
              <Image
                source={addCartIcon}
                style={{ width: 20, height: 20, tintColor: "#FFFFFF" }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.iconContainerDisable} disabled>
              <Image
                source={addCartIcon}
                style={{ width: 20, height: 20, tintColor: "#FFFFFF" }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF", // Pure white background
    width: 150,
    height: 210, // Slightly taller for better spacing
    borderRadius: 12, // More rounded corners for a modern look
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 8, // Increased padding for better spacing
    elevation: 3, // Subtle shadow for a clean look
    shadowColor: "#000", // Black shadow for contrast
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    backgroundColor: "#F5F5F5", // Light gray background for image container
    width: "100%",
    height: 140,
    borderRadius: 10, // Slightly rounded corners
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centered content
    alignItems: "center",
    padding: 5,
  },
  productImage: {
    height: 120,
    width: 120,
    borderRadius: 8, // Rounded corners for the image
  },
  infoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10, // Space between image and text
    paddingHorizontal: 4,
  },
  secondaryTextSm: {
    fontSize: 16,
    fontWeight: "600", // Semi-bold for a professional look
    color: "#424242", // Dark gray text color
  },
  primaryTextSm: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006400", // Primary color for price
  },
  iconContainer: {
    backgroundColor: "#424242", // Gray color for add to cart button
    width: 35.5,
    height: 35.5,
    borderRadius: 17,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Slight shadow for the icon
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainerDisable: {
    backgroundColor: "#BDBDBD", // Muted gray for disabled state
    width: 35,
    height: 35,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2, // Slight shadow for the icon
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});
