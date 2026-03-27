import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Decorative Blob */}
      <View style={styles.bottomBlob} />

      {/* Top Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={require("../../assets/images/Damayan.png")}
          style={styles.logoText}
          resizeMode="contain"
        />
      </View>

      {/* Greetings */}
      <View style={styles.greetingsContainer}>
        <Text style={styles.heading}>Hello!</Text>
        <Text style={styles.subHeading}>Welcome to Damayan Citizen App</Text>
      </View>

      {/* Buttons */}
      <View style={styles.authButtonsContainer}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => router.push("/login")}>
          <Text style={[styles.buttonText, styles.loginButtonText]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => router.push("/signup")}>
          <Text style={[styles.buttonText, styles.signupButtonText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Separator */}
      <View style={styles.separatorContainer}>
        <View style={styles.line} />
        <Text style={styles.separatorText}>Or continue using</Text>
        <View style={styles.line} />
      </View>

      {/* Social Logins */}
      <View style={styles.socialContainer}>
        {/* Google */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={28} color="#DB4437" />
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877F2' }]}>
          <FontAwesome name="facebook" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EE", // Slight off-white as per screenshot
    paddingHorizontal: 24,
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
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 80,
  },
  logoText: {
    width: 300,
    height: 70,
    marginTop: 5,
  },
  greetingsContainer: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
  },
  authButtonsContainer: {
    gap: 16,
    marginBottom: 40,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#F2B705",
  },
  signupButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#F2B705",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  loginButtonText: {
    color: "white",
  },
  signupButtonText: {
    color: "#F2B705",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  separatorText: {
    marginHorizontal: 12,
    color: "#666",
    fontSize: 12,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
