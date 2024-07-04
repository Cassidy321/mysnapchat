import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Modal,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

let deviceHeight = Dimensions.get("window").height;
let deviceWidth = Dimensions.get("window").width;

type Snap = {
  _id: string;
  date: string;
  from: string;
  image: string;
  duration: number;
  fromUsername?: string;
};

export default function ReceivedSnap() {
  const [snaps, setSnaps] = useState<Snap[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSnap, setSelectedSnap] = useState<Snap | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const usernameCache: { [key: string]: string } = {};

  useEffect(() => {
    fetchSnaps();
  }, []);

  const fetchSnaps = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Erreur", "Token manquant");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("https://snapchat.epidoc.eu/snap", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        const snapsWithUsernames = await Promise.all(
          json.data.map(async (snap: Snap) => {
            const username = await fetchUsername(snap.from);
            console.log(`Snap ID: ${snap._id}, From ID: ${snap.from}, Username: ${username}`);
            return { ...snap, fromUsername: username };
          })
        );
        setSnaps(snapsWithUsernames);
      } else {
        Alert.alert("Erreur", "Récupération des snaps impossible");
      }
    } catch (error) {
      Alert.alert("Erreur", "Récupération des snaps impossible");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsername = async (id: string): Promise<string> => {
    if (usernameCache[id]) {
      return usernameCache[id];
    }

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      return "Utilisateur inconnu";
    }

    try {
      const response = await fetch(`https://snapchat.epidoc.eu/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
          Authorization: `Bearer ${token}`,
        },
      });
      const userData = await response.json();
      console.log(`rep pour user id ${id}:`, userData);
      if (response.ok) {
        const username = userData.data.username;
        console.log(`username recup pour l'id ${id}: ${username}`);
        usernameCache[id] = username;
        return username;
      } else {
        console.error(`erreur pour la recup du username de l'id ${id}`);
        return "Utilisateur inconnu";
      }
    } catch (error) {
      console.error(`erreur pour la recup du username de l'id ${id}`, error);
      return "Utilisateur inconnu";
    }
  };

  const viewSnap = async (id: string) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Erreur", "Token manquant");
      return;
    }

    try {
      const response = await fetch(`https://snapchat.epidoc.eu/snap/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      if (response.ok) {
        const username = await fetchUsername(json.data.from);
        const snapWithUsername: Snap = { ...json.data, fromUsername: username };
        setSelectedSnap(snapWithUsername);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          markSnapAsSeen(snapWithUsername._id);
          setSnaps((prevSnaps) => prevSnaps.filter((snap) => snap._id !== id));
        }, json.data.duration * 1000);
      } else {
        Alert.alert("Erreur", "Impossible d'ouvrir le snap");
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ouvrir le snap");
    }
  };

  const markSnapAsSeen = async (id: string) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert("Erreur", "Token manquant");
      return;
    }

    try {
      const response = await fetch(
        `https://snapchat.epidoc.eu/snap/seen/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNhc3NpZHkubmd1eWVuQGVwaXRlY2guZXUiLCJpYXQiOjE3MTc3NjQwNjl9.GmU6Ur8xdyKF_orG358zEEHl9eF6AC5x2IxbDmne4mc",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        Alert.alert("Erreur", "Mise à jour du snap comme vu impossible");
      }
    } catch (error) {
      Alert.alert("Erreur", "Mise à jour du snap comme vu impossible");
    }
  };

  const renderSnap = ({ item }: { item: Snap }) => (
    <TouchableOpacity
      style={styles.snapItem}
      onPress={() => viewSnap(item._id)}
    >
      <Text style={styles.snapText}>{item.fromUsername || item.from}</Text>
      <Text style={styles.snapDate}>{new Date(item.date).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={snaps}
        renderItem={renderSnap}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>Vous n'avez aucun snap.</Text>}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("(tabs)/home" as never)}
      >
        <Text style={styles.backButtonText}>Retourner à l'accueil</Text>
      </TouchableOpacity>
      {selectedSnap && (
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <Image
              source={{ uri: selectedSnap.image }}
              style={styles.snapImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  snapItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  snapText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  snapDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  backButton: {
    backgroundColor: "#00a9ff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignSelf: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  snapImage: {
    width: deviceWidth,
    height: deviceHeight,
    resizeMode: "contain",
  },
});
