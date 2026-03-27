import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../assets/images/Damayan.png")}
          style={styles.logoText}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/auth")}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 80,
  },

  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 160,
  },
  logoText: {
    width: 300,
    height: 70,
    marginTop: 20,
  },

  button: {
    backgroundColor: "#F2B705",
    width: "80%",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});