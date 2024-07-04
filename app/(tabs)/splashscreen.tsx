import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, Text, Dimensions } from "react-native";
import WelcomeScreen from "./welcome";

let deviceHeight = Dimensions.get("window").height;

export default function SplashScreen() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomeScreen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showWelcomeScreen) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to MySnapchat</Text>
        <Image
          source={require("../../assets/images/snapghost.png")}
          style={styles.image}
        />
      </View>
    );
  }

  return <WelcomeScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFC00",
  },
  title: {
    fontSize: 24,
    position: "absolute",
    top: deviceHeight / 2.6,
    color: "#000000",
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 200,
    resizeMode: "contain",
    top: deviceHeight / 2.6,
  },
});
