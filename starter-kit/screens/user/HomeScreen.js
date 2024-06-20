import {
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import BackButton from "../../components/BackButton";
import React, { useEffect, useState } from "react";
import cartIcon from "../../assets/icons/cart_beg.png";
import scanIcon from "../../assets/icons/scan_icons.png";
import easybuylogo from "../../assets/logo/logo.png";
import { colors } from "../../constants";
import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import { network } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import SearchableDropdown from "react-native-searchable-dropdown";
import { SliderBox } from "react-native-image-slider-box";
import SofaLine from "../../assets/icons/sofa-line.png";
import Chairs from "../../assets/icons/chair.png";
import Stools from "../../assets/icons/stool.png";
import Tables from "../../assets/icons/table.png";
import SofaBanner from "../../assets/image/banners/sofa-banner.jpeg";
import Contrast from "../../assets/image/banners/contrast.jpeg";
import ChairBanner from "../../assets/image/banners/chair.jpeg";
import MenuBar from "../../components/MenuButton";

const category = [
  {
    _id: "62fe244f58f7aa8230817f89",
    title: "Sofas",
    image: SofaLine,
  },
  {
    _id: "62fe243858f7aa8230817f86",
    title: "Chairs",
    image: Chairs,
  },
  {
    _id: "62fe241958f7aa8230817f83",
    title: "Stools",
    image: Stools,
  },
  {
    _id: "62fe246858f7aa8230817f8c",
    title: "Tables",
    image: Tables,
  },
];

const slides = [SofaBanner, Contrast, ChairBanner];

const HomeScreen = ({ navigation, route }) => {
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  const { user } = route.params;
  const [products, setProducts] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [searchItems, setSearchItems] = useState([]);

  //method to convert the authUser to json object
  const convertToJSON = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };

  //method to navigate to product detail screen of a specific product
  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product: product });
  };

  //method to add to cart (redux)
  const handleAddToCat = (product) => {
    addCartItem(product);
  };

  var headerOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchProduct = () => {
    fetch(`${network.serverip}/products`, headerOptions) //API call
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProducts(result.data);
          setError("");
          let payload = [];
          result.data.forEach((cat, index) => {
            let searchableItem = { ...cat, id: ++index, name: cat.title };
            payload.push(searchableItem);
          });
          setSearchItems(payload);
        } else {
          setError(result.message);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log("error", error);
      });
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchProduct();
    setRefreshing(false);
  };

  //convert user to json and fetch products in initial render
  useEffect(() => {
    convertToJSON(user);
    fetchProduct();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBarContainer}>
        <TouchableOpacity disabled>
          <MenuBar />
        </TouchableOpacity>
        <View style={styles.topBarLogoContainer}>
          <Text style={styles.topBarText}>AR</Text>
          <Image source={easybuylogo} style={styles.logo} />
          <Text style={styles.topBarText}>Store</Text>
        </View>
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartproduct.length > 0 ? (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          ) : null}
          <Image source={cartIcon} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.searchContainer}>
          <View style={styles.inputContainer}>
            <SearchableDropdown
              onTextChange={(text) => console.log(text)}
              onItemSelect={(item) => handleProductPress(item)}
              defaultIndex={0}
              containerStyle={styles.dropdownContainer}
              textInputStyle={styles.dropdownTextInput}
              itemStyle={styles.dropdownItem}
              itemTextStyle={styles.dropdownItemText}
              itemsContainerStyle={styles.dropdownItemsContainer}
              items={searchItems}
              placeholder="Search..."
              resetValue={false}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan</Text>
              <Image source={scanIcon} style={styles.scanIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView nestedScrollEnabled={true}>
          <View style={styles.promotionSliderContainer}>
            <SliderBox
              images={slides}
              sliderBoxHeight={142}
              dotColor={colors.primary}
              inactiveDotColor={colors.muted}
              paginationBoxVerticalPadding={7}
              autoplayInterval={6000}
            />
          </View>
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>Categories</Text>
          </View>
          <View style={styles.categoryContainer}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={styles.flatListContainer}
              horizontal={true}
              data={category}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item, index }) => (
                <View style={styles.categoryItemContainer} key={index}>
                  <CustomIconButton
                    key={index}
                    text={item.title}
                    image={item.image}
                    onPress={() =>
                      navigation.jumpTo("categories", { categoryID: item })
                    }
                  />
                </View>
              )}
            />
            <View style={styles.emptyView}></View>
          </View>
          <View style={styles.primaryTextContainer}>
            <Text style={styles.primaryText}>New Arrivals</Text>
          </View>
          {products.length === 0 ? (
            <View style={styles.productCardContainerEmpty}>
              <Text style={styles.productCardContainerEmptyText}>
                No Product
              </Text>
            </View>
          ) : (
            <View style={styles.productCardContainer}>
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refeshing}
                    onRefresh={handleOnRefresh}
                  />
                }
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                horizontal={true}
                data={products.slice(0, 4)}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                  <View key={item._id} style={styles.productCard}>
                    <ProductCard
                      name={item.title}
                      image={`${network.serverip}/uploads/${item.image}`}
                      price={item.price}
                      quantity={item.quantity}
                      onPress={() => handleProductPress(item)}
                      onPressSecondary={() => handleAddToCat(item)}
                    />
                  </View>
                )}
              />
              <View style={styles.emptyView}></View>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Light background color
  },
  topBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 1,
    paddingHorizontal: 16,
    borderBottomWidth: -3,
    borderBottomColor: "#E0E0E0", // Light gray border
    backgroundColor: "#FFF", // White background for top bar
  },
  topBarLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 60,
    width: 60,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  topBarText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#424242", // Dark gray text
  },
  cartIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  cartItemCountContainer: {
    position: "absolute",
    top: -12,
    left: 13,
    backgroundColor: "#424242", // Light black color
    borderRadius: 40,
    padding: 3,
    elevation: 3, // Add slight shadow
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 1, // Shadow radius
  },
  cartItemCountText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: "#424242", // Dark gray tint
  },
  bodyContainer: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  inputContainer: {
    flex: 1,
    marginRight: 9,
  },
  buttonContainer: {
    marginLeft: 10,
  },
  dropdownContainer: {
    borderRadius: 12, // Slightly sharper edges for a modern look
    width: "100%",
    elevation: 6, // Increased elevation for a more prominent shadow
    position: "absolute",
    zIndex: 20,
    top: -25,
    maxHeight: 300,
    backgroundColor: "#FFFFFF", // Pure white background
    shadowColor: "#000", // Black shadow for better contrast
    shadowOffset: { width: 0, height: 2 }, // Slightly larger shadow offset
    shadowOpacity: 0.1, // Reduced shadow opacity for subtlety
    shadowRadius: 4, // Larger shadow radius for a softer edge
  },
  dropdownTextInput: {
    borderRadius: 12, // Consistent with container's border radius
    padding: 12, // Slightly larger padding for better touch area
    borderWidth: 0,
    backgroundColor: "#F9F9F9", // Very light gray background for input
    fontSize: 16,
    color: "#424242", // Dark gray text for better readability
    shadowColor: "#000", // Light shadow to elevate input field
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 12, // Increased padding for better touch area
    marginTop: 2,
    backgroundColor: "#FFFFFF", // Consistent white background
    borderColor: "#E0E0E0", // Light gray border
    borderWidth: 1, // Adding border width for better distinction
    borderRadius: 10, // Rounded corners for elegance
    marginHorizontal: 10, // Horizontal margin for better spacing
  },
  dropdownItemText: {
    color: "#424242", // Dark gray text for consistency
    fontSize: 14, // Slightly smaller font for a clean look
    fontWeight: "500", // Medium weight for better readability
  },
  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#424242", // Light black color for scan button
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 5,
    shadowColor: "#000", // Add shadow for better contrast
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanButtonText: {
    color: "#FFF",
    fontSize: 16,
    marginRight: 10,
  },
  scanIcon: {
    width: 20,
    height: 20,
  },
  promotionSliderContainer: {
    marginVertical: 15,
    backgroundColor: "#FFF", // White background for slider
    borderRadius: 13, // Added rounded edges
    overflow: "hidden", // Ensures content respects border radius
    elevation: 4, // Adds subtle shadow for better visual appearance
  },
  primaryTextContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  primaryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#424242", // Dark gray text
  },
  categoryContainer: {
    flexDirection: "row",
    marginRight: 10,
  },
  flatListContainer: {
    paddingHorizontal: -1,
  },
  categoryItemContainer: {
    marginBottom: 9,
  },
  emptyView: {
    height: 20,
  },
  productCardContainerEmpty: {
    padding: 20,
    alignItems: "center",
  },
  productCardContainerEmptyText: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#9E9E9E", // Muted gray text
    fontWeight: "600",
    textAlign: "center",
  },
  productCardContainer: {
    paddingHorizontal: -1,
  },
  productCard: {
    marginLeft: 5,
    marginBottom: 10,
    marginRight: 5,
  },
});
