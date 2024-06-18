// CategoriesScreen.js
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as actionCreaters from "../../states/actionCreaters/actionCreaters";
import CustomIconButton from "../../components/CustomIconButton/CustomIconButton";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomInput from "../../components/CustomInput";
import BackButton from "../../components/BackButton";
import { colors, network } from "../../constants";
import cartIcon from "../../assets/icons/cart_beg.png";
import emptyBox from "../../assets/image/emptybox.png";
import SofaLine from "../../assets/icons/sofa-line.png";
import Chairs from "../../assets/icons/chair.png";
import Stools from "../../assets/icons/stool.png";
import Tables from "../../assets/icons/table.png";
import { products } from "../data";

const CategoriesScreen = ({ navigation, route }) => {
  const { categoryID } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [label, setLabel] = useState("Loading...");
  const [error, setError] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState("");
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );
  const windowHeight = Dimensions.get("window").height;
  const cartproduct = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);
  const category = [
    { _id: "62fe244f58f7aa8230817f89", title: "Sofas", image: SofaLine },
    { _id: "62fe243858f7aa8230817f86", title: "Chairs", image: Chairs },
    { _id: "62fe241958f7aa8230817f83", title: "Stools", image: Stools },
    { _id: "62fe246858f7aa8230817f8c", title: "Tables", image: Tables },
  ];

  const [selectedTab, setSelectedTab] = useState(category[0]);

  useEffect(() => {
    if (categoryID) setSelectedTab(category.find((c) => c._id === categoryID));
  }, [categoryID]);

  useEffect(() => {
    filter();
  }, [filterItem]);

  const handleProductPress = (product) => {
    navigation.navigate("productdetail", { product });
  };

  const handleAddToCat = (product) => {
    addCartItem(product);
  };

  const handleOnRefresh = () => {
    setRefreshing(true);
    // fetchProduct();
    setRefreshing(false);
  };

  const filter = () => {
    const keyword = filterItem.toLowerCase();
    if (keyword) {
      setFoundItems(
        products.filter((product) =>
          product.title.toLowerCase().includes(keyword)
        )
      );
    } else {
      setFoundItems(products);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBarContainer}>
        <TouchableOpacity onPress={() => navigation.jumpTo("home")}>
          <BackButton />
        </TouchableOpacity>
        <View />
        <TouchableOpacity
          style={styles.cartIconContainer}
          onPress={() => navigation.navigate("cart")}
        >
          {cartproduct.length > 0 && (
            <View style={styles.cartItemCountContainer}>
              <Text style={styles.cartItemCountText}>{cartproduct.length}</Text>
            </View>
          )}
          <Image source={cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.searchContainer}>
          <CustomInput
            radius={5}
            placeholder="Search..."
            value={filterItem}
            setValue={setFilterItem}
          />
        </View>
        <FlatList
          data={category}
          keyExtractor={(item) => item._id}
          horizontal
          style={styles.categoryList}
          contentContainerStyle={styles.categoryListContent}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: tab }) => (
            <CustomIconButton
              key={tab._id}
              text={tab.title}
              image={tab.image}
              active={selectedTab?._id === tab._id}
              onPress={() => setSelectedTab(tab)}
            />
          )}
        />
        {foundItems.filter((product) => product.category === selectedTab?._id)
          .length === 0 ? (
          <View style={styles.noItemContainer}>
            <View style={styles.emptyBox}>
              <Image source={emptyBox} style={styles.emptyBoxImage} />
              <Text style={styles.emptyBoxText}>
                There no product in this category
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={foundItems.filter(
              (product) => product.category === selectedTab?._id
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleOnRefresh}
              />
            }
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productListContent}
            numColumns={2}
            renderItem={({ item: product }) => (
              <View
                style={[
                  styles.productCartContainer,
                  { width: (windowWidth - windowWidth * 0.1) / 2 },
                ]}
              >
                <ProductCard
                  cardSize="large"
                  name={product.title}
                  image={`${network.serverip}/uploads/${product.image}`}
                  price={product.price}
                  quantity={product.quantity}
                  onPress={() => handleProductPress(product)}
                  onPressSecondary={() => handleAddToCat(product)}
                />
                <View style={styles.emptyView} />
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light,
    alignItems: "center",
    flex: 1,
  },
  topBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  cartIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemCountContainer: {
    position: "absolute",
    zIndex: 10,
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
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
  searchContainer: {
    padding: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  categoryList: {
    marginVertical: 20,
  },
  categoryListContent: {
    paddingHorizontal: 10,
  },
  productListContent: {
    paddingHorizontal: 10,
  },
  noItemContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBox: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyBoxImage: {
    resizeMode: "contain",
    width: "100%",
  },
  emptyBoxText: {
    color: colors.darkGray,
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  productCartContainer: {
    marginBottom: 10,
  },
  emptyView: {
    margin: 3,
  },
});

export default CategoriesScreen;
