import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function NewPasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <Text style={styles.heading}>Reset Password</Text>

        <View style={styles.form}>
          {/* New Password */}
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Enter New Password</Text>
          </View>
          <View style={styles.pillInputContainer}>
            <Feather name="lock" size={20} color="#999" style={styles.inputIconLeft} />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#C4C4C4"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Re-Enter Password */}
          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Re-Enter New Password</Text>
          </View>
          <View style={styles.pillInputContainer}>
            <Feather name="lock" size={20} color="#999" style={styles.inputIconLeft} />
            <TextInput
              style={styles.input}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="••••••••"
              placeholderTextColor="#C4C4C4"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Feather name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => router.push("/password-success")}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace("/login")}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    marginBottom: 40,
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
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    marginBottom: 32,
  },
  form: {
    marginBottom: 40,
  },
  inputLabelContainer: {
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  pillInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F2B705",
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 24,
  },
  inputIconLeft: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  buttonGroup: {
    gap: 16,
  },
  confirmButton: {
    backgroundColor: "#F2B705",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#C4C4C4",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
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
