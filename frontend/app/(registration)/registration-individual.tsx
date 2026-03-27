import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";

export default function RegistrationIndividualScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [firstName, setFirstName] = useState((params.firstName as string) || "");
  const [middleName, setMiddleName] = useState((params.middleName as string) || "");
  const [lastName, setLastName] = useState((params.lastName as string) || "");

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

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Form Fields */}
          <View style={styles.form}>
            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <View style={styles.pillInputContainer}>
                <TextInput
                  style={styles.input}
                  value={firstName}
                  onChangeText={setFirstName}
                />
              </View>
            </View>

            {/* Middle Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Middle Name</Text>
              <View style={styles.pillInputContainer}>
                <TextInput
                  style={styles.input}
                  value={middleName}
                  onChangeText={setMiddleName}
                />
              </View>
            </View>

            {/* Last Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <View style={styles.pillInputContainer}>
                <TextInput
                  style={styles.input}
                  value={lastName}
                  onChangeText={setLastName}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Next Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => {
              if (!firstName.trim() || !lastName.trim()) {
                alert("First Name and Last Name are required.");
                return;
              }
              router.push({
                pathname: "/registration-birthdate",
                params: { ...params, firstName, middleName, lastName }
              });
            }}
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
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: "#666",
    paddingLeft: 4,
  },
  pillInputContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F2B705",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    color: "#333",
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
