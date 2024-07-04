import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function Profile() {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");
      const response = await fetch(
        `https://snapchat.epidoc.eu/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setUsername(data.data.username);
      setEmail(data.data.email);
      setProfilePicture(data.data.profilePicture);
    } catch (error) {
      console.error(
        "Récupération des informations utilisateur impossible",
        error
      );
    }
  };

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("username");
    AsyncStorage.removeItem("email");
    navigation.navigate("(tabs)/login" as never);
  };

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Confirmation",
      "Êtes-vous sûr de vouloir supprimer votre compte ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: handleDeleteAccount,
          style: "destructive",
        },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch("https://snapchat.epidoc.eu/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("email");
        Alert.alert("Succès", "Votre compte a été supprimé.");
        navigation.navigate("(tabs)/login" as never);
      } else {
        Alert.alert("Erreur", "Échec de la suppression du compte.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du compte", error);
      Alert.alert("Erreur", "Erreur lors de la suppression du compte.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("(tabs)/home" as never)}
      >
        <Icon name="arrow-left" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
      <View style={styles.roundBackground}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.image} />
        ) : (
          <Image
            source={require("../../assets/images/default.png")}
            style={styles.image}
          />
        )}
      </View>
      <TouchableOpacity style={styles.redBox} onPress={handleLogout}>
        <Text style={styles.text}>Se déconnecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.blueBox}
        onPress={() => navigation.navigate("(tabs)/editprofile" as never)}
      >
        <Text style={styles.text}>Modifier mon profil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBox} onPress={confirmDeleteAccount}>
        <Text style={styles.text}>Supprimer mon compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    backgroundColor: "#00a9ff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignSelf: "center",
    top: deviceHeight / 28,
    left: deviceWidth / -3.3,
    flexDirection: "row",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
    marginTop: 1,
  },
  title: {
    fontSize: 24,
    position: "absolute",
    top: deviceHeight / 3.5,
    color: "#000000",
    fontWeight: "bold",
  },
  email: {
    fontSize: 18,
    position: "absolute",
    top: deviceHeight / 3,
    color: "#000000",
  },
  text: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 22,
  },
  roundBackground: {
    position: "absolute",
    top: 105,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  redBox: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "red",
    width: "75%",
    height: deviceHeight / 12,
    borderRadius: 20,
  },
  blueBox: {
    position: "absolute",
    bottom: deviceHeight / 10,
    backgroundColor: "blue",
    width: "75%",
    height: deviceHeight / 12,
    borderRadius: 20,
  },
  deleteBox: {
    position: "absolute",
    bottom: deviceHeight / 5,
    backgroundColor: "black",
    width: "75%",
    height: deviceHeight / 12,
    borderRadius: 20,
  },
});
