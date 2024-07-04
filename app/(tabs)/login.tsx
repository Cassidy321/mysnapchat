import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import CheckBox from "react-native-check-box";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    loadRememberedCredentials();
  }, []);

  const loadRememberedCredentials = async () => {
    try {
      const rememberedEmail = await AsyncStorage.getItem("rememberedEmail");
      const rememberedPassword = await AsyncStorage.getItem(
        "rememberedPassword"
      );
      if (rememberedEmail && rememberedPassword) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error("Chargemet des infos mémorisées impossible", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("https://snapchat.epidoc.eu/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (response.ok && json.data && json.data.token) {
        await AsyncStorage.setItem("token", json.data.token);
        await AsyncStorage.setItem("username", json.data.username);
        await AsyncStorage.setItem("email", json.data.email);

        if (rememberMe) {
          await AsyncStorage.setItem("rememberedEmail", email);
          await AsyncStorage.setItem("rememberedPassword", password);
        } else {
          await AsyncStorage.removeItem("rememberedEmail");
          await AsyncStorage.removeItem("rememberedPassword");
        }

        setTimeout(() => {
          navigation.navigate("(tabs)/home" as never);
        }, 100);
      } else {
        setErrorMessage(json.message || "Échec de la connexion");
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la connexion");
    }
  };

  const register = () => {
    navigation.navigate("(tabs)/register" as never);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connectez-vous</Text>
      <Text style={styles.title2}>MySnapchat !</Text>
      <Image
        source={require("../../assets/images/snapghost.png")}
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#000000"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#000000"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox
          style={styles.checkbox}
          onClick={() => setRememberMe(!rememberMe)}
          isChecked={rememberMe}
        />
        <Text style={styles.checkboxLabel}>Se souvenir de moi</Text>
      </View>
      <TouchableOpacity style={styles.yellowBox} onPress={handleLogin}>
        <Text style={styles.text}>Se connecter !</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      </TouchableOpacity>
      <Text style={styles.textlogin} onPress={register}>
        Pas encore de compte ? Inscrivez-vous !
      </Text>
    </View>
  );
};

const deviceHeight = Dimensions.get("window").height;

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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 12,
    color: "#000000",
    fontWeight: "bold",
  },
  title2: {
    fontSize: 24,
    marginBottom: 24,
    color: "#000000",
    fontWeight: "bold",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
    maxWidth: 300,
  },
  input: {
    width: "100%",
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#d3d3d3",
  },
  eyeIcon: {
    position: "absolute",
    top: 10,
    right: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000",
  },
  yellowBox: {
    width: 140,
    height: 40,
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFC00",
  },
  text: {
    fontSize: 18,
    color: "#000000",
  },
  error: {
    marginTop: 8,
    fontSize: 16,
    color: "red",
  },
  textlogin: {
    marginTop: 16,
    fontSize: 18,
    color: "#000000",
  },
});

export default Login;
