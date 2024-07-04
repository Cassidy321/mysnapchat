import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function Home() {
  const navigation = useNavigation();

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    navigation.navigate("(tabs)/login" as never);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.whiteBox, { bottom: 0 }]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("(tabs)/profile" as never)}
        >
          <Icon name="user" size={35} color="#000" style={styles.iconprofile} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("(tabs)/sendsnap" as never)}
        >
          <Icon
            name="camera"
            size={35}
            color="#000"
            style={styles.iconcamera}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("(tabs)/receivedsnap" as never)}
        >
          <Icon
            name="comment"
            size={35}
            color="#000"
            style={styles.iconcomment}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFC00",
  },
  iconprofile: {
    position: "absolute",
    bottom: deviceHeight / -15,
    right: deviceWidth / 8,
  },
  iconcamera: {
    position: "absolute",
    bottom: deviceHeight / -15,
    right: deviceWidth / 2.3,
  },
  iconcomment: {
    position: "absolute",
    bottom: deviceHeight / -15,
    left: deviceWidth / 8,
  },
  whiteBox: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: deviceHeight / 12,
  },
});
