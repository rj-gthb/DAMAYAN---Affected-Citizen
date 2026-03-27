import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function RegistrationGenderScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedGender, setSelectedGender] = useState((params.gender as string) || "Female");

  const options = ["Female", "Male", "Prefer not to say"];

  return (
    <SafeAreaView style={styles.safeArea}>
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

        {/* Heading */}
        <View style={styles.headerTitleContainer}>
          <Text style={styles.heading}>Registration</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.label}>Gender</Text>
          
          <View style={styles.optionsCard}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  index === options.length - 1 && styles.noBorder
                ]}
                onPress={() => setSelectedGender(option)}
                activeOpacity={0.7}
              >
                <Text style={styles.optionText}>{option}</Text>
                <View style={[
                  styles.radioButton,
                  selectedGender === option && styles.radioButtonSelected
                ]}>
                  {selectedGender === option && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => router.push({
              pathname: "/registration-emergency",
              params: { ...params, gender: selectedGender }
            })}
          >
            <Text style={styles.nextButtonText}>Next</Text>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 40,
    marginBottom: 10,
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
    width: 200,
    height: 60,
  },
  headerTitleContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    paddingLeft: 4,
  },
  optionsCard: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2B705",
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  radioButtonSelected: {
    borderColor: "#C0320A", // The deep red/orange from the mockup
    backgroundColor: "white",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C0320A",
  },
  footer: {
    paddingVertical: 10,
    marginBottom: 60,
  },
  nextButton: {
    backgroundColor: "#F2B705",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
