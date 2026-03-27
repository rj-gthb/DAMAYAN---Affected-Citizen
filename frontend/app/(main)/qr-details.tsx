import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function QRCodeDetailsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (user) {
        setUserData({
          ...user.user_metadata,
          phone: user.phone || user.user_metadata?.phone // Prioritize account phone
        });
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (birthDate: string) => {
    if (!birthDate) return "N/A";
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#F2B705" />
      </View>
    );
  }

  const fullName = userData 
    ? `${userData.first_name || ""} ${userData.middle_name ? userData.middle_name + " " : ""}${userData.last_name || ""}`.trim() 
    : "N/A";

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

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.heading}>QR Code Details</Text>

          {/* QR Code */}
          <View style={styles.qrContainer}>
            <MaterialCommunityIcons name="qrcode" size={240} color="black" />
            {userData?.qr_code_id && (
              <Text style={styles.qrRefText}>{userData.qr_code_id}</Text>
            )}
          </View>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{userData?.registration_type || "Individual"}</Text>
            </View>
          </View>

          {/* Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{fullName}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Age:</Text>
              <Text style={styles.detailValue}>
                {userData?.birth_date || userData?.birthDate 
                  ? calculateAge(userData.birth_date || userData.birthDate) 
                  : "N/A"}
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gender:</Text>
              <Text style={styles.detailValue}>{userData?.gender || "N/A"}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Contact:</Text>
              <Text style={styles.detailValue}>{userData?.phone || userData?.phone_number || "N/A"}</Text>
            </View>
          </View>

          {/* Full Width Details */}
          <View style={styles.fullWidthDetail}>
            <Text style={styles.detailLabel}>Emergency Contact Name:</Text>
            <Text style={styles.detailValue}>{userData?.emergency_contact_name || "N/A"}</Text>
          </View>
          <View style={styles.fullWidthDetail}>
            <Text style={styles.detailLabel}>Emergency Contact Number:</Text>
            <Text style={styles.detailValue}>{userData?.emergency_contact_number || "N/A"}</Text>
          </View>

          {/* Family Members Section */}
          {userData?.registration_type === 'Family' && userData?.family_members && (
            <View style={styles.familySection}>
              <Text style={styles.sectionHeading}>Family Members</Text>
              <View style={styles.membersContainer}>
                {userData.family_members
                  .filter((member: any) => member.relationship !== 'Self')
                  .map((member: any, index: number) => (
                    <View key={index} style={styles.memberRow}>
                      <Text style={styles.memberNameText}>{member.name}</Text>
                      <Text style={styles.memberRelText}>{member.relationship}</Text>
                    </View>
                  ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.downloadButton}>
            <MaterialCommunityIcons name="download-outline" size={20} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Download</Text>
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
    justifyContent: "center",
    position: "relative",
    paddingTop: 40,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 0,
    top: 40,
    padding: 8,
    zIndex: 10,
  },
  logoWrapper: {
    alignItems: "center",
  },
  headerLogo: {
    width: 200,
    height: 60,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  qrContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  qrRefText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "bold",
    marginTop: 8,
  },
  badgeContainer: {
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 14,
    color: "#2E86C1",
    fontWeight: "bold",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  detailItem: {
    width: "50%",
    marginBottom: 16,
  },
  fullWidthDetail: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  footer: {
    paddingVertical: 10,
    marginBottom: 60,
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
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  familySection: {
    marginTop: 24,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F2B705",
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  membersContainer: {
    gap: 10,
  },
  memberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  memberNameText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  memberRelText: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#F8F5EE",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
});
