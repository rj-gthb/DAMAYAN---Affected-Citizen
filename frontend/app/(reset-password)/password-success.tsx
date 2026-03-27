import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PasswordSuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/images/Damayan.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark-circle-outline" size={120} color="#4CAF50" />
        </View>

        <Text style={styles.heading}>Password Changed!</Text>
        <Text style={styles.subHeading}>
          Your password has been changed successfully
        </Text>

        <TouchableOpacity 
          style={styles.loginButton}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.loginButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Left Blob */}
      <View style={styles.bottomBlob} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EE",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80,
  },
  logoWrapper: {
    alignItems: "center",
  },
  headerLogo: {
    width: 250,
    height: 80,
  },
  content: {
    alignItems: "center",
    flex: 1,
  },
  successIconContainer: {
    marginBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 48,
  },
  loginButton: {
    backgroundColor: "#F2B705",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomBlob: {
    position: "absolute",
    bottom: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#F2B705",
    zIndex: -1,
  },
});
