import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
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
        <Text style={styles.heading}>Forgot your{"\n"}Password?</Text>

        <View style={[styles.inputContainer, isEmailFocused && styles.inputContainerFocused]}>
          <Text style={[
            styles.floatingLabel, 
            (isEmailFocused || email.length > 0) && styles.floatingLabelActive
          ]}>
            Enter your email
          </Text>
          <View style={styles.inputContext}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push("/reset-password")}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
    justifyContent: "center", // Center wrapper
    marginBottom: 60,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 8,
    zIndex: 10,
  },
  logoWrapper: {
    width: "100%",
    alignItems: "center",
  },
  headerLogo: {
    width: 250,
    height: 80,
  },
  content: {
    marginTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    marginBottom: 40,
    lineHeight: 40,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    position: 'relative',
    marginBottom: 40,
  },
  inputContainerFocused: {
    borderBottomColor: "#F2B705",
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    top: 10,
    fontSize: 16,
    color: '#C4C4C4',
  },
  floatingLabelActive: {
    top: -12,
    fontSize: 12,
    color: '#999',
  },
  inputContext: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    paddingVertical: 0,
  },
  continueButton: {
    backgroundColor: "#F2B705",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  continueButtonText: {
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
