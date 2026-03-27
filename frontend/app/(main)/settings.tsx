import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SettingsScreen() {
  const router = useRouter();
  
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [shareMedical, setShareMedical] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoGroup}>
            <Image
              source={require("../../assets/images/Logo.png")}
              style={styles.logoIcon}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>AMAYAN</Text>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileIconContainer}>
              <Ionicons name="person-circle" size={40} color="#F2B705" />
              <View style={styles.notificationDot} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Settings Card */}
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.settingsCard}>
            <Text style={styles.heading}>Settings</Text>
            
            <View style={styles.divider} />

            {/* Notification Preferences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Notification Preferences</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingTexts}>
                  <Text style={styles.settingTitle}>Enable Emergency Alerts</Text>
                  <Text style={styles.settingDescription}>
                    Receive critical disaster warnings and emergency notifications near your area
                  </Text>
                </View>
                <Switch
                  value={emergencyAlerts}
                  onValueChange={setEmergencyAlerts}
                  trackColor={{ false: "#D1D1D6", true: "#C0320A" }}
                  thumbColor="white"
                />
              </View>
            </View>

            <View style={styles.divider} />

            {/* Location & Privacy */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location & Privacy</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingTexts}>
                  <Text style={styles.settingTitle}>Location Services</Text>
                  <Text style={styles.settingDescription}>
                    Allow app to access your location for area-specific alerts
                  </Text>
                </View>
                <Switch
                  value={locationServices}
                  onValueChange={setLocationServices}
                  trackColor={{ false: "#D1D1D6", true: "#C0320A" }}
                  thumbColor="white"
                />
              </View>

              <View style={styles.settingItem}>
                <View style={styles.settingTexts}>
                  <Text style={styles.settingTitle}>Share Medical Information</Text>
                  <Text style={styles.settingDescription}>
                    Allow emergency responders to access your medical profile during disasters
                  </Text>
                </View>
                <Switch
                  value={shareMedical}
                  onValueChange={setShareMedical}
                  trackColor={{ false: "#D1D1D6", true: "#C0320A" }}
                  thumbColor="white"
                />
              </View>
            </View>

            <View style={styles.divider} />

            {/* About */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>About</Text>
              
              <View style={styles.settingItem}>
                <View style={styles.settingTexts}>
                  <Text style={styles.settingTitle}>App Version</Text>
                  <Text style={styles.settingDescription}>1.0.0</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem} onPress={() => router.push("/home")}>
            <Ionicons name="home-outline" size={24} color="#F2B705" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="map-marker-outline" size={24} color="#F2B705" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="bullhorn-outline" size={24} color="#F2B705" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#F2B705" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItemActive}>
            <Ionicons name="settings" size={20} color="white" />
            <Text style={styles.navTextActive}>Settings</Text>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  logoGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 32,
    height: 32,
    marginRight: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F2B705",
    letterSpacing: 2,
  },
  profileButton: {
    padding: 4,
  },
  profileIconContainer: {
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    borderWidth: 1.5,
    borderColor: '#F8F5EE',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  settingsCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 10,
    width: "100%",
  },
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  settingTexts: {
    flex: 1,
    marginRight: 10,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: "#999",
    lineHeight: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  navItemActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2B705",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 8,
  },
  navTextActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  navItem: {
    padding: 10,
  },
});
