import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

let deviceHeight = Dimensions.get("window").height;

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await fetch("https://snapchat.epidoc.eu/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          profilePicture: "",
        }),
      });
      let json = await response.json();
      console.log(json);
      if (response.ok) {
        setSuccessMessage("Inscription réussie !");
        console.log("Inscription réussie !");
        setTimeout(() => {
          setSuccessMessage("");
          navigation.navigate("(tabs)/login" as never);
        }, 1000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Échec de l'inscription");
        console.error("Échec de l'inscription");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'inscription");
      console.error("Erreur lors de l'inscription", error);
    }
  };

  const navigation = useNavigation();

  const login = () => {
    navigation.navigate("(tabs)/login" as never);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscrivez-vous à My Snapchat !</Text>
      <Image
        source={require("../../assets/images/snapghost.png")}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#000000"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#000000"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, styles.input]}
          placeholder="Mot de passe"
          placeholderTextColor="#000000"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.toggleEye} onPress={toggleShowPassword}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.yellowBox} onPress={handleRegister}>
        <Text style={styles.text}>S'inscrire !</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
        {successMessage ? (
          <Text style={styles.success}>{successMessage}</Text>
        ) : null}
      </TouchableOpacity>
      <Text style={styles.textlogin} onPress={login}>
        Déjà inscrit ? Connectez-vous !
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 200,
    resizeMode: "contain",
    bottom: deviceHeight / 10,
    marginBottom: -80,
  },
  text: {
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 25,
  },
  textlogin: {
    position: "absolute",
    fontSize: 18,
    color: "#000000",
    textAlign: "center",
    textAlignVertical: "center",
    bottom: deviceHeight / 10,
  },
  yellowBox: {
    position: "absolute",
    bottom: deviceHeight / 5.6,
    backgroundColor: "#FFFC00",
    height: deviceHeight / 12,
    borderRadius: 20,
    width: 120,
  },
  title: {
    fontSize: 24,
    position: "absolute",
    top: deviceHeight / 6,
    color: "#000000",
    fontWeight: "bold",
  },
  input: {
    borderRadius: 20,
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: "#d3d3d3",
  },
  error: {
    position: "absolute",
    color: "red",
    marginTop: -220,
    textAlign: "center",
  },
  success: {
    position: "absolute",
    color: "green",
    marginTop: -220,
    textAlign: "center",
  },
  passwordContainer: {
    flexDirection: "row",
    position: "relative",
    width: 300,
  },
  passwordInput: {
    flex: 1,
  },
  toggleEye: {
    position: "absolute",
    right: 10,
    top: 5,
  },
});

export default Register;
