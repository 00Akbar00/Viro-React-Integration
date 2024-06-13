import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import BackButton from "../../components/BackButton";
import HomeScreen from "../../screens/user/HomeScreen";
import { colors } from "../../constants";
import UserProfileScreen from "../../screens/profile/UserProfileScreen";
import HomeIconActive from "../../assets/icons/bar_home_icon_active.png";
import HomeIcon from "../../assets/icons/bar_home_icon.png";
import userIcon from "../../assets/icons/bar_profile_icon.png";
import userIconActive from "../../assets/icons/bar_profile_icon_active.png";
import CategoriesScreen from "../../screens/user/CategoriesScreen";
import CategoriesIcon from "../../assets/icons/bar_categories_icon.png";
import CategoriesIconActive from "../../assets/icons/bar_categories_icon_active.png";
import MyOrderScreen from "../../screens/user/MyOrderScreen";
import MyOrderIcon from "../../assets/icons/bar_order_icon.png";
import MyOrderIconActive from "../../assets/icons/bar_order_icon_active.png";

const Tab = createBottomTabNavigator();

const Tabs = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary,

        tabBarIcon: ({ focused }) => {
          let routename = route.name;
          if (routename == "home") {
            return (
              <TouchableOpacity disabled>
                {focused ? (
                  <Image source={HomeIconActive} style={styles.tabIconStyle} />
                ) : (
                  <Image source={HomeIcon} style={styles.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "categories") {
            return (
              <TouchableOpacity disabled>
                {focused ? (
                  <Image
                    source={CategoriesIconActive}
                    style={styles.tabIconStyle}
                  />
                ) : (
                  <Image source={CategoriesIcon} style={styles.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "myorder") {
            return (
              <TouchableOpacity disabled>
                {focused ? (
                  <Image
                    source={MyOrderIconActive}
                    style={styles.tabIconStyle}
                  />
                ) : (
                  <Image source={MyOrderIcon} style={styles.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          } else if (routename == "user") {
            return (
              <TouchableOpacity disabled>
                {focused ? (
                  <Image source={userIconActive} style={styles.tabIconStyle} />
                ) : (
                  <Image source={userIcon} style={styles.tabIconStyle} />
                )}
              </TouchableOpacity>
            );
          }
        },
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.white,
        },
      })}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        initialParams={{ user: user }}
        tabBarOptions={{
          style: {
            position: "absolute",
          },
        }}
      />
      <Tab.Screen
        name="categories"
        component={CategoriesScreen}
        initialParams={{ user: user }}
        tabBarOptions={{
          tabBarHideOnKeyboard: true,
          style: {
            position: "absolute",
          },
        }}
      />
      {
        // Wishlist is ready yet!
        <Tab.Screen
          name="myorder"
          component={MyOrderScreen}
          initialParams={{ user: user }}
        />
      }
      <Tab.Screen
        name="user"
        component={UserProfileScreen}
        initialParams={{ user: user }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabIconStyle: {
    width: 25,
    height: 25,
  },
});
