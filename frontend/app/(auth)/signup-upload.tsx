import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { supabase } from "../../lib/supabase";

export default function SignupUploadScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (useCamera: boolean) => {
    let result;
    if (useCamera) {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
    } else {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need roll permissions to make this work!');
        return;
      }
      result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      });
    }

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);

    try {
      console.log("Attempting signup for email:", params.email);
      if (!params.email || !params.password) {
        throw new Error("Missing email or password. Please go back to the previous screen.");
      }

      // Add a safety timeout
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timed out. Please check your internet connection.")), 15000);
      });

      // Perform signup with race against timeout
      const signUpPromise = supabase.auth.signUp({
        email: params.email as string,
        password: params.password as string,
        options: {
          data: {
            first_name: params.firstName,
            last_name: params.lastName,
            phone: params.phone,
            address: params.address,
            birth_date: params.birthDate,
            gender: params.gender,
            emergency_contact_name: params.emergencyContactName,
            emergency_contact_number: params.emergencyContactNumber,
            qr_code_id: `DAMAYAN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
            id_verified: !!image,
          }
        }
      });

      const { data, error }: any = await Promise.race([signUpPromise, timeoutPromise]);

      console.log("Result:", { data, error });

      if (error) {
        Alert.alert("Signup Failed", `${error.message}\n(Code: ${error.status || 'unknown'})`);
      } else if (data?.user) {
        // 2. Also insert into the 'register_citizens' table to show in the Supabase Table Editor
        const { error: dbError } = await supabase.from('register_citizens').insert({
          user_id: data.user.id,
          first_name: params.firstName,
          last_name: params.lastName,
          phone: params.phone,
          address: params.address,
          birth_date: params.birthDate,
          gender: params.gender,
          registration_type: 'Individual', // Matches your screenshot
          qr_code_id: data.user.user_metadata.qr_code_id,
          emergency_contact_name: params.emergencyContactName,
          emergency_contact_number: params.emergencyContactNumber
        });

        if (dbError) {
          console.error("Database Insert Error:", dbError);
          // Alert user that though the account was created, the profile record failed
          Alert.alert("Profile Error", "Account created, but failed to save profile to database: " + dbError.message);
        }

        router.replace("/signup-success");
      } else {
        Alert.alert("Empty Result", "The server returned no data and no error.");
      }
    } catch (error: any) {
      console.error("Signup exception:", error);
      Alert.alert("Process Error", error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Heading */}
      <View style={styles.headerTitleContainer}>
        <Text style={styles.heading}>SIGN UP</Text>
      </View>

      {/* Main Content Area */}
      <View style={styles.contentContainer}>
        <View style={styles.uploadLabelContainer}>
          <Text style={styles.uploadLabel}>Upload ID for Verification</Text>
          <Text style={styles.optionalText}>(Optional)</Text>
        </View>
        <Text style={styles.subText}>
          You can provide a clear picture of a valid government-issued ID to verify your citizen profile now, or skip this for later.
        </Text>

        {/* Action Buttons */}
        <View style={styles.cardsContainer}>
          {image ? (
            <View style={styles.previewContainer}>
              <Image source={{ uri: image }} style={styles.previewImage} />
              <TouchableOpacity style={styles.removeImage} onPress={() => setImage(null)}>
                <Feather name="x" size={20} color="white" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionCard}
                activeOpacity={0.7}
                onPress={() => pickImage(true)}
              >
                <View style={styles.iconCircle}>
                  <Feather name="camera" size={28} color="#F2B705" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>Take a Photo</Text>
                  <Text style={styles.cardSubtitle}>Use your camera</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                activeOpacity={0.7}
                onPress={() => pickImage(false)}
              >
                <View style={styles.iconCircle}>
                  <Feather name="image" size={28} color="#F2B705" />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.cardTitle}>Choose from Gallery</Text>
                  <Text style={styles.cardSubtitle}>Upload existing file</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>

        <Text style={styles.formatText}>
          Supported formats: JPG, PNG (Max 10MB)
        </Text>
      </View>

      {/* Sign Up Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.signUpButton, loading && { backgroundColor: "#C4C4C4" }]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.signUpButtonText}>
              {image ? "Confirm & Sign Up" : "Skip & Sign Up"}
            </Text>
          )}
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
    marginBottom: 8,
  },
  backButton: {
    padding: 8,
    marginLeft: -8, // visually align left
  },
  headerTitleContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  heading: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
  },
  contentContainer: {
    flex: 1, // Take up available space
  },
  uploadLabelContainer: {
    flexDirection: "row",
    marginBottom: 8,
    paddingLeft: 4,
  },
  uploadLabel: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
  },
  optionalText: {
    fontSize: 14,
    color: "#999",
    marginLeft: 8,
    alignSelf: "center",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    paddingLeft: 4,
    marginBottom: 32,
    lineHeight: 20,
  },
  cardsContainer: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 32,
  },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF9E6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#999",
  },
  formatText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 8,
  },
  previewContainer: {
    width: "100%",
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "#F2B705",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeImage: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "flex-end", // Push Sign Up to bottom
    marginBottom: 40,
  },
  signUpButton: {
    backgroundColor: "#F2B705",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  signUpButtonText: {
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
