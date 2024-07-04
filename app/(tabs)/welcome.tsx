import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const login = () => {
    navigation.navigate("(tabs)/login" as never);
  };

  const register = () => {
    navigation.navigate("(tabs)/register" as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MySnapchat</Text>
      <Image
        source={require("../../assets/images/snapghost.png")}
        style={styles.image}
      />
      <TouchableOpacity style={styles.redBox} onPress={login}>
        <Text style={styles.text}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.blueBox} onPress={register}>
        <Text style={styles.text}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
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
    top: deviceHeight / 7,
    color: "#000000",
    fontWeight: "bold",
  },
  text: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
    marginTop: 25,
  },
  image: {
    width: 100,
    height: 200,
    resizeMode: "contain",
    top: deviceHeight / 7,
  },
  redBox: {
    position: "absolute",
    bottom: deviceHeight / 10,
    backgroundColor: "#ff0049",
    width: "100%",
    height: deviceHeight / 10,
  },
  blueBox: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#00a9ff",
    width: "100%",
    height: deviceHeight / 10,
  },
});
