import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Animated } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Reusable input component for floating labels
const FloatingInput = ({ 
  label, value, onChangeText, secureTextEntry = false, 
  keyboardType = "default", autoCapitalize = "sentences", hasEyeToggle = null 
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.staticLabel}>{label}</Text>
      <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={label} // using standard placeholder structure to match their simple design
          placeholderTextColor="#C4C4C4"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {hasEyeToggle && (
          <TouchableOpacity onPress={hasEyeToggle.onToggle}>
            <Feather 
              name={hasEyeToggle.show ? "eye" : "eye-off"} 
              size={18} 
              color="#C4C4C4" 
              style={styles.inputIconRight} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default function SignupScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactNumber, setEmergencyContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const handleContinue = () => {
    if (!firstName || !lastName || !email || !password || !reEnterPassword) {
      alert("Please fill in all required fields");
      return;
    }

    if (password !== reEnterPassword) {
      alert("Passwords do not match");
      return;
    }

    router.push({
      pathname: "/signup-upload",
      params: {
        firstName,
        lastName,
        email,
        phone,
        address,
        birthDate,
        gender,
        emergencyContactName,
        emergencyContactNumber,
        password
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Scrollable Form */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.heading}>SIGN UP</Text>
          <Text style={styles.subHeading}>Create your Damayan{"\n"}Citizen Profile</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.formContainer}>
          <FloatingInput label="First Name" value={firstName} onChangeText={setFirstName} autoCapitalize="words" />
          <FloatingInput label="Last Name" value={lastName} onChangeText={setLastName} autoCapitalize="words" />
          <FloatingInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
          <FloatingInput label="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <FloatingInput label="Address" value={address} onChangeText={setAddress} autoCapitalize="words" />
          <FloatingInput label="Birth Date (MM/DD/YYYY)" value={birthDate} onChangeText={setBirthDate} />
          <FloatingInput label="Gender" value={gender} onChangeText={setGender} autoCapitalize="words" />
          <FloatingInput label="Emergency Contact Name" value={emergencyContactName} onChangeText={setEmergencyContactName} autoCapitalize="words" />
          <FloatingInput label="Emergency Contact Number" value={emergencyContactNumber} onChangeText={setEmergencyContactNumber} keyboardType="phone-pad" />
          
          <FloatingInput 
            label="Password" 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={!showPassword} 
            hasEyeToggle={{ show: showPassword, onToggle: () => setShowPassword(!showPassword) }}
          />
          
          <FloatingInput 
            label="Re-Enter Password" 
            value={reEnterPassword} 
            onChangeText={setReEnterPassword} 
            secureTextEntry={!showReEnterPassword}
            hasEyeToggle={{ show: showReEnterPassword, onToggle: () => setShowReEnterPassword(!showReEnterPassword) }}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Bottom Left Blob */}
      <View style={styles.bottomBlob} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F5EE",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 30, // Reduced from 60
    paddingBottom: 40,
    flexGrow: 1, 
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButton: {
    padding: 8, 
    marginLeft: -8, // visually align left
  },
  headerTitleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  heading: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    gap: 16, 
    marginBottom: 40,
  },
  inputWrapper: {
    gap: 6,
  },
  staticLabel: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F2B705", 
    borderRadius: 24, 
    paddingHorizontal: 16,
    height: 48,
  },
  inputContainerFocused: {
    borderWidth: 2, // Thicker border on focus for feedback
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    height: "100%",
  },
  inputIconRight: {
    marginLeft: 10,
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
