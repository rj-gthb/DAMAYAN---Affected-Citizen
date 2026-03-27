import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RegistrationSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {/* Header Title */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.heading}>Registration</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Success Messages */}
          <View style={styles.successMessages}>
            <View style={styles.messageRow}>
              <Ionicons name="checkmark-circle" size={24} color="#00B894" />
              <Text style={styles.messageText}>Registration complete</Text>
            </View>
            <View style={styles.messageRow}>
              <Ionicons name="checkmark-circle" size={24} color="#00B894" />
              <Text style={styles.messageText}>Your QR code contains all emergency information</Text>
            </View>
          </View>

          {/* QR Code Section */}
          <View style={styles.qrContainer}>
            <Image 
              source={require("../../assets/images/Logo.png")} // Using Logo as placeholder or I should use the generated one
              // Actually, I'll use a local requirement for the generated image if I copy it, 
              // but for now I'll just use a generic style for a QR code if I can't easily reference the absolute path in require.
              // I'll use the Logo but styled to look centered and large for now.
              style={styles.qrCode}
              resizeMode="contain"
            />
            {/* Since I cannot easily 'require' a fresh absolute path outside the project root in RN without copying, 
                I'll use a placeholder for the QR code for now or assume user will provide a real asset later. 
                I will make it look like a QR code box though. */}
            <View style={styles.qrPlaceholder}>
               <MaterialCommunityIcons name="qrcode" size={200} color="black" />
            </View>
          </View>
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.downloadButton}
            onPress={() => router.push("/qr-details")}
          >
            <MaterialCommunityIcons name="download-outline" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => router.replace("/home")}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 24,
  },
  headerTitleContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    marginBottom: 20,
  },
  logoWrapper: {
    width: "100%",
    alignItems: "center",
  },
  headerLogo: {
    width: 200,
    height: 60,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContent: {
    alignItems: "center",
    paddingBottom: 20,
  },
  successMessages: {
    width: "100%",
    gap: 16,
    marginBottom: 40,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    lineHeight: 22,
    fontWeight: "500",
  },
  qrContainer: {
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  qrCode: {
    width: "100%",
    height: "100%",
    display: "none", // Hide the placeholder image in favor of the icon for now
  },
  qrPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    paddingVertical: 20,
    gap: 16,
    marginBottom: 40,
  },
  downloadButton: {
    flexDirection: "row",
    backgroundColor: "#F2B705",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  doneButton: {
    backgroundColor: "#F2B705",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
