import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SignupSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo at the top */}
        <View style={styles.header}>
            <Image
                source={require("../../assets/images/Logo.png")}
                style={styles.logoIcon}
                resizeMode="contain"
            />
            <Text style={styles.logoText}>DAMAYAN</Text>
        </View>

        {/* Success Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.checkCircle}>
              <Ionicons name="checkmark" size={60} color="white" />
            </View>
            <Text style={styles.successHeading}>SUCCESS</Text>
          </View>
          
          <View style={styles.cardBody}>
            <Text style={styles.cardText}>
              Your account has been{"\n"}successfully created.
            </Text>
            
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.replace("/login")}
            >
              <Text style={styles.buttonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Decorative Blob */}
        <View style={styles.bottomBlob} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F5EE",
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
    position: "relative",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: -40, // Adjust position
  },
  logoIcon: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F2B705",
    letterSpacing: 4,
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 40,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    backgroundColor: "#91D164", // Green color from mockup
    alignItems: "center",
    paddingVertical: 40,
  },
  checkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  successHeading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  cardBody: {
    padding: 40,
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#91D164",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomBlob: {
    position: 'absolute',
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#F2B705',
    zIndex: -1,
  },
});
