import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ResetPasswordScreen() {
  const router = useRouter();

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
          Select which contact should we use to reset your password
        </Text>

        {/* Option Cards */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity 
            style={styles.optionCard} 
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: "/reset-code", params: { method: "sms" } })}
          >
            <View style={styles.iconContainer}>
              <Feather name="phone" size={32} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardLabel}>Send Code via SMS</Text>
              <Text style={styles.cardValue}>********0975</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard} 
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: "/reset-code", params: { method: "email" } })}
          >
            <View style={styles.iconContainer}>
              <Feather name="mail" size={32} color="#000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardLabel}>Send Code via Email</Text>
              <Text style={styles.cardValue}>********@gmail.com</Text>
            </View>
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
  cardsContainer: {
    gap: 20,
  },
  optionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2B705",
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
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
