import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../constants";
import MenuBar from "../../components/MenuButton";
import BackButton from "../../components/BackButton";

const UserProfileScreen = ({ navigation, route }) => {
  const [userInfo, setUserInfo] = useState({});
  const { user } = route.params;

  const convertToJSON = (obj) => {
    try {
      setUserInfo(JSON.parse(obj));
    } catch (e) {
      setUserInfo(obj);
    }
  };

  // Convert the user to JSON object on initial render
  useEffect(() => {
    convertToJSON(user);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity>
          <MenuBar />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <Text style={styles.screenNameText}>Profile</Text>
      </View>
      <View style={styles.UserProfileCardContainer}>
        <UserProfileCard
          Icon={Ionicons}
          name={userInfo?.name}
          email={userInfo?.email}
        />
      </View>
      <View style={styles.OptionsContainer}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("myaccount", { user: userInfo })}
        >
          <Image
            source={require("../../assets/icons/user.png")}
            style={styles.icon}
          />
          <Text style={styles.optionText}>My Account</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("mywishlist", { user: userInfo })}
        >
          <Image
            source={require("../../assets/icons/heart.png")}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Wishlist</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={async () => {
            await AsyncStorage.removeItem("authUser");
            navigation.navigate("login");
          }}
        >
          <Image
            source={require("../../assets/icons/logout.png")}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Logout</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.muted} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    flex: 1,
  },
  TopBarContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  UserProfileCardContainer: {
    width: "100%",
    height: "25%",
    marginVertical: 20,
  },
  screenNameContainer: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 20,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.muted,
  },
  OptionsContainer: {
    width: "100%",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    color: colors.dark,
    flex: 1,
  },
});
