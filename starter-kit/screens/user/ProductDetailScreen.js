import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import heartIcon from "../../assets/icons/heart.png";
import ARicon from "../../assets/icons/ArButton.png";
import BackButton from "../../components/BackButton";
import cartIcon from "../../assets/icons/cart_beg.png";
import { colors, network } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomAlert from "../../components/CustomAlert/CustomAlert";
import { products } from "../data";

const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  //method to add item to cart(redux)
  const handleAddToCat = (item) => {
    addCartItem(item);
  };

  //remove the authUser from async storage and navigate to login
  const logout = async () => {
    await AsyncStorage.removeItem("authUser");
    navigation.navigate("login");
  };

  const [onWishlist, setOnWishlist] = useState(false);
  const [avaiableQuantity, setAvaiableQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productImage, SetProductImage] = useState(" ");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState("");
  const [isDisable, setIsDisbale] = useState(true);
  const [alertType, setAlertType] = useState("error");

  //method to fetch wishlist from server using API call
  const fetchWishlist = async () => {
    const value = await AsyncStorage.getItem("authUser"); // get authUser from async storage
    let user = JSON.parse(value);
    var myHeaders = new Headers();
    myHeaders.append("x-auth-token", user.token);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${network.serverip}/wishlist`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.err === "jwt expired") {
          logout();
        }
        if (result.success) {
          setWishlistItems(result.data[0].wishlist);
          setIsDisbale(false);

          //check if the current active product is already in wishlish or not
          result.data[0].wishlist.map((item) => {
            if (item?.productId?._id === product?._id) {
              setOnWishlist(true);
            }
          });

          setError("");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log("error", error);
      });
  };

  //method to increase the product quantity
  const handleIncreaseButton = (quantity) => {
    if (avaiableQuantity > quantity) {
      setQuantity(quantity + 1);
    }
  };

  //method to decrease the product quantity
  const handleDecreaseButton = (quantity) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  //method to add or remove item from wishlist
  const handleWishlistBtn = async () => {
    setIsDisbale(true);
    const value = await AsyncStorage.getItem("authUser");
    let user = JSON.parse(value);

    if (onWishlist) {
      var myHeaders = new Headers();
      myHeaders.append("x-auth-token", user.token);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      //API call to remove a item in wishlish
      fetch(
        `${network.serverip}/remove-from-wishlist?id=${product?._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setError(result.message);
            setAlertType("success");
            setOnWishlist(false);
          } else {
            setError(result.message);
            setAlertType("error");
          }
          setOnWishlist(!onWishlist);
        })
        .catch((error) => {
          setError(result.message);
          setAlertType("error");
          console.log("error", error);
        });
      setIsDisbale(false);
    } else {
      var myHeaders2 = new Headers();
      myHeaders2.append("x-auth-token", user.token);
      myHeaders2.append("Content-Type", "application/json");

      var raw2 = JSON.stringify({
        productId: product?._id,
        quantity: 1,
      });

      var addrequestOptions = {
        method: "POST",
        headers: myHeaders2,
        body: raw2,
        redirect: "follow",
      };

      console.log(addrequestOptions);

      //API call to add a item in wishlish
      fetch(`${network.serverip}/add-to-wishlist`, addrequestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
            setError(result.message);
            setAlertType("success");
            setOnWishlist(true);
          } else {
            setError(result.message);
            setAlertType("error");
          }
          setOnWishlist(!onWishlist);
        })
        .catch((error) => {
          setError(result.message);
          setAlertType("error");
          console.log("error", error);
        });
      setIsDisbale(false);
    }
  };

  // logic for navigating to specific pages
  const productPageMapping = {
    1: "sofaModel", // Use the product ID instead of 'sofa-product-id'
    2: "chairModel", // Use the product ID instead of 'chair-product-id'
    4: "tableModel", // Use the product ID instead of 'table-product-id'
  };

  // products.forEach((product) => {
  //   if (product.title === "Modern Sofa") {
  //     productPageMapping[product._id] = "sofaModel";
  //   } else if (product.title === "Classic Chair") {
  //     productPageMapping[product._id] = "ChairModel"; // Assuming you have a page named ChairModel
  //   } else if (product.title === "Wooden Stool") {
  //     productPageMapping[product._id] = "StoolPage";
  //   } else if (product.title === "Dining Table") {
  //     productPageMapping[product._id] = "TablePage";
  //   }
  // });

  const handleNavigateToSpecificPage = () => {
    const page = productPageMapping[product.id]; // Accessing 'id' instead of '_id'
    if (page) {
      navigation.navigate(page);
    } else {
      console.log("No page associated with this product.");
    }
  };

  //set quantity, avaiableQuantity, product image and fetch wishlist on initial render
  useEffect(() => {
    setQuantity(0);
    setAvaiableQuantity(product.quantity);
    SetProductImage(`${network.serverip}/uploads/${product?.image}`);
    fetchWishlist();
  }, []);

  //render whenever the value of wishlistItems change
  useEffect(() => {}, [wishlistItems]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
        <View></View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartproduct.length > 0 && (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          )}
          <Image source={cartIcon} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: product?.image }} style={styles.productImage} />
        </View>
        <CustomAlert message={error} type={alertType} />
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoTopContainer}>
            <View style={styles.productNameContainer}>
              <Text style={styles.productNameText}>{product?.title}</Text>
            </View>
            <View style={styles.infoButtonContainer}>
              <TouchableOpacity
                disabled={isDisable}
                style={styles.iconContainer}
                onPress={handleNavigateToSpecificPage} // Add your handler for the new button here
              >
                <Image
                  source={ARicon} // Use the custom icon
                  style={styles.customIcon} // Add styles for the custom icon
                />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isDisable}
                style={styles.iconContainer}
                onPress={handleWishlistBtn}
              >
                <Image
                  source={heartIcon} // Use the custom icon
                  style={styles.customIcon} // Add styles for the custom icon
                />
              </TouchableOpacity>
            </View>
            <View style={styles.productDetailContainer}>
              <View style={styles.productPriceContainer}>
                <Text style={styles.secondaryTextSm}>Price:</Text>
                <Text style={styles.primaryTextSm}>{product?.price}$</Text>
              </View>
            </View>
            <View style={styles.productDescriptionContainer}>
              <Text style={styles.secondaryTextSm}>Description:</Text>
              <Text>{product?.description}</Text>
            </View>
          </View>
          <View style={styles.productInfoBottomContainer}>
            <View style={styles.counterContainer}>
              <View style={styles.counter}>
                <TouchableOpacity
                  style={styles.counterButtonContainer}
                  onPress={() => handleDecreaseButton(quantity)}
                >
                  <Text style={styles.counterButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counterCountText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.counterButtonContainer}
                  onPress={() => handleIncreaseButton(quantity)}
                >
                  <Text style={styles.counterButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.productButtonContainer}>
              {avaiableQuantity > 0 ? (
                <CustomButton
                  text={"Add to Cart"}
                  onPress={() => {
                    handleAddToCat(product);
                  }}
                />
              ) : (
                <CustomButton text={"Out of Stock"} disabled={true} />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
  },
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.white,
    elevation: 5,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  cartItemCountContainer: {
    position: "absolute",
    top: -10,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 22,
    width: 22,
    backgroundColor: colors.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 10,
  },
  bodyContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
  },
  productImageContainer: {
    width: "100%",
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    elevation: 10,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  productInfoContainer: {
    width: "100%",
    flex: 3,
    backgroundColor: colors.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
    elevation: 20,
    alignItems: "center",
  },
  productInfoTopContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  productNameContainer: {
    width: "100%",
    marginBottom: 10,
  },
  productNameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.dark,
  },
  infoButtonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    marginRight: 10, // Add margin to separate the buttons
  },
  customIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  productDetailContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.muted,
  },
  productPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  secondaryTextSm: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.dark,
  },
  primaryTextSm: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
    marginLeft: 5,
  },
  productDescriptionContainer: {
    width: "100%",
    marginTop: 10,
  },
  productInfoBottomContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: "center",
  },
  counterContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButtonContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.muted,
    borderRadius: 15,
    elevation: 2,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  counterCountText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.dark,
    marginHorizontal: 10,
  },
  productButtonContainer: {
    width: "100%",
    paddingTop: 10,
  },
});
