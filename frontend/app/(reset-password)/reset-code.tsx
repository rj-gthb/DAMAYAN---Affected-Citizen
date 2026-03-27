import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useRef } from "react";

export default function ResetCodeScreen() {
  const router = useRouter();
  const { method } = useLocalSearchParams();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<any>([]);

  const contactInfo = method === "sms" ? "********0975" : "********@gmail.com";

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text.slice(-1); // Only take the last character
    setCode(newCode);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

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
        <Text style={styles.subHeading}>
          Input the 6-digit code sent to{"\n"}{contactInfo}
        </Text>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <View key={index} style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(text) => handleTextChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                ref={(ref) => { inputs.current[index] = ref; }}
              />
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.resendContainer}>
          <Text style={styles.resendText}>Resend Code?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push("/new-password")}
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
    justifyContent: "center",
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
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  otpBox: {
    width: 45,
    height: 60,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F2B705",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  otpText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    width: "100%",
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  resendText: {
    fontSize: 14,
    color: "#F2B705",
    fontWeight: "bold",
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
