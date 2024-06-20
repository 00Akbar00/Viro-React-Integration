import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../constants";
import imageSource from "../../assets/icons/user.png";

const UserProfileCard = ({ imageSource, name, email }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.avatar} />
        ) : (
          <View style={styles.defaultAvatar}>
            <Text style={styles.defaultAvatarText}>{name?.[0]}</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.usernameText}>{name}</Text>
        <Text style={styles.secondaryText}>{email}</Text>
      </View>
    </View>
  );
};

export default UserProfileCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: colors.shadow,
    borderRadius: 10,
    marginVertical: 10,
  },
  avatarContainer: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.light,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  defaultAvatar: {
    width: 85,
    height: 85,
    borderRadius: 40,
    backgroundColor: colors.muted,
    justifyContent: "center",
    alignItems: "center",
  },
  defaultAvatarText: {
    fontSize: 40,
    color: colors.primary,
    fontWeight: "bold",
  },
  infoContainer: {
    width: "60%",
    justifyContent: "center",
    paddingLeft: 10,
  },
  usernameText: {
    fontWeight: "bold",
    fontSize: 25,
    color: colors.dark,
  },
  secondaryText: {
    fontSize: 12,
    color: colors.muted,
  },
});
