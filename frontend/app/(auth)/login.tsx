import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { supabase } from "../../lib/supabase";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(true); // Wait, should be false
      setLoading(false);
    } else {
      router.replace("/home");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="arrow-left" size={24} color="#333" />
      </TouchableOpacity>

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
        <Text style={styles.heading}>Welcome Back!</Text>
        <Text style={styles.subHeading}>Login</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
        <View style={[styles.inputContainer, isEmailFocused && styles.inputContainerFocused]}>
          <Text style={[
            styles.floatingLabel, 
            (isEmailFocused || email.length > 0) && styles.floatingLabelActive
          ]}>
            Email
          </Text>
          <View style={styles.inputContext}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
          </View>
        </View>

        <View style={[styles.inputContainer, isPasswordFocused && styles.inputContainerFocused]}>
          <Text style={[
            styles.floatingLabel, 
            (isPasswordFocused || password.length > 0) && styles.floatingLabelActive
          ]}>
            Password
          </Text>
          <View style={styles.inputContext}>
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={18} color="#999" style={styles.inputIconRight} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Options Row */}
        <View style={styles.optionsRow}>
          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <Feather name="check" size={12} color="white" />}
            </View>
            <Text style={styles.checkboxText}>Remember Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push("/forgot-password")}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.loginButton, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>{loading ? "Signing in..." : "Login"}</Text>
      </TouchableOpacity>


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
    paddingTop: 60, // Give space for back button
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 24,
    zIndex: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: 80,
    height: 60,
  },
  logoText: {
    width: 200,
    height: 40,
    marginTop: 8,
  },
  greetingsContainer: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  formContainer: {
    marginBottom: 40,
    gap: 32, // increased gap because labels take up space now
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
  inputContainerFocused: {
    borderBottomColor: "#F2B705", // Yellow line highlight when focused
  },
  floatingLabel: {
    position: 'absolute',
    left: 0,
    top: 10,
    fontSize: 14,
    color: '#999',
  },
  floatingLabelActive: {
    top: -12,
    fontSize: 10,
    color: '#999',
  },
  inputContext: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    paddingTop: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputIconRight: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    paddingVertical: 0, 
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#F2B705",
    borderRadius: 2,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#F2B705",
  },
  checkboxText: {
    fontSize: 12,
    color: "#666",
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#F2B705",
    fontWeight: "600",
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
    fontWeight: "600",
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
