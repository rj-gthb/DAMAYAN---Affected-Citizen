import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

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

        {/* Main Content Area */}
        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Individual Registration Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="person-outline" size={24} color="#F2B705" />
              <Text style={styles.cardTitle}>Individual Registration</Text>
            </View>
            
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FF8C00" />
                <Text style={styles.featureText}>Living Alone</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FF8C00" />
                <Text style={styles.featureText}>Dormitory Residence</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => router.push({
                pathname: "/registration-individual",
                params: { registrationType: 'individual' }
              })}
            >
              <Text style={styles.registerButtonText}>Register as Individual</Text>
            </TouchableOpacity>
          </View>

          {/* Family Registration Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="people-outline" size={24} color="#F2B705" />
              <Text style={styles.cardTitle}>Family Registration</Text>
            </View>
            
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FF8C00" />
                <Text style={styles.featureText}>Families with Children</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FF8C00" />
                <Text style={styles.featureText}>Families with Elderly</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FF8C00" />
                <Text style={styles.featureText}>Family in need for Special Care</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.registerButton}
              onPress={() => router.push({
                pathname: "/registration-individual",
                params: { registrationType: 'family' }
              })}
            >
              <Text style={styles.registerButtonText}>Register as Family</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItemActive}>
            <Ionicons name="home" size={20} color="white" />
            <Text style={styles.navTextActive}>Home</Text>
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

          <TouchableOpacity 
            style={styles.navItem}
            onPress={() => router.push("/settings")}
          >
            <Ionicons name="settings-outline" size={24} color="#F2B705" />
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
    gap: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  featureList: {
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  featureText: {
    fontSize: 14,
    color: "#666",
  },
  registerButton: {
    backgroundColor: "black",
    borderRadius: 15,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
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
