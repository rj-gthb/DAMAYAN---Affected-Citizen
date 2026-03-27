import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RegistrationEmergencyScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!contactName || !contactNumber) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (params.registrationType === 'family') {
      router.push({
        pathname: "/registration-relationship",
        params: { 
          ...params, 
          emergencyContactName: contactName,
          emergencyContactNumber: contactNumber 
        }
      });
    } else {
      // Individual Flow: Complete Registration here
      setLoading(true);
      try {
        const metadata = {
          first_name: params.firstName,
          middle_name: params.middleName,
          last_name: params.lastName,
          birth_date: params.birthDate,
          gender: params.gender,
          emergency_contact_name: contactName,
          emergency_contact_number: contactNumber,
          relationship: "Self", // Default to Self for individual reg
          qr_code_id: `DAMAYAN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
          registration_type: 'Individual',
          is_registered: true
        };

        const { data: { user }, error: authError } = await supabase.auth.updateUser({
          data: metadata
        });

        if (authError) throw authError;

        // 2. Also insert into the 'register_citizens' table to show in the Supabase Table Editor
        if (user) {
          const { error: dbError } = await supabase.from('register_citizens').insert({
            user_id: user.id,
            first_name: params.firstName,
            middle_name: params.middleName,
            last_name: params.lastName,
            birth_date: params.birthDate,
            gender: params.gender,
            registration_type: 'Individual', // Matches your screenshot
            qr_code_id: metadata.qr_code_id,
            emergency_contact_name: contactName,
            emergency_contact_number: contactNumber
          });

          if (dbError) {
            console.error("Database Insert Error:", dbError);
            Alert.alert("Database Error", "Account updated but failed to register profile in database: " + dbError.message);
          }
        }

        router.push("/registration-success");
      } catch (error: any) {
        Alert.alert("Registration Error", error.message);
      } finally {
        setLoading(false);
      }
    }
  };

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
          {/* Form Fields */}
          <View style={styles.form}>
            {/* Emergency Contact Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Emergency Contact Name</Text>
              <View style={styles.pillInputContainer}>
                <TextInput
                  style={styles.input}
                  value={contactName}
                  onChangeText={setContactName}
                  placeholder="Full Name"
                  placeholderTextColor="#AAA"
                />
              </View>
            </View>

            {/* Emergency Contact Number */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Emergency Contact Number</Text>
              <View style={styles.pillInputContainer}>
                <TextInput
                  style={styles.input}
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  keyboardType="phone-pad"
                  placeholder="09..."
                  placeholderTextColor="#AAA"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.completeButton, loading && { opacity: 0.7 }]} 
            onPress={handleNext}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.completeButtonText}>{params.registrationType === 'family' ? 'Next' : 'Complete Registration'}</Text>
            )}
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
    gap: 24,
  },
  inputGroup: {
    gap: 8,
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
  completeButton: {
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
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
