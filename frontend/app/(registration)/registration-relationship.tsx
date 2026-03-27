import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { supabase } from "../../lib/supabase";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
}

export default function RegistrationRelationshipScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const selfName = `${params.firstName || ""} ${params.lastName || ""}`.trim();
  
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { id: 'self', name: selfName, relationship: 'Self' }
  ]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRelationship, setNewMemberRelationship] = useState("Spouse");
  const [loading, setLoading] = useState(false);

  const relationshipOptions = ["Spouse", "Child", "Parent", "Sibling"];

  const addMember = () => {
    if (!newMemberName.trim()) {
      Alert.alert("Error", "Please enter a name");
      return;
    }
    const newMember: FamilyMember = {
      id: Math.random().toString(36).substring(7),
      name: newMemberName,
      relationship: newMemberRelationship
    };
    setFamilyMembers([...familyMembers, newMember]);
    setNewMemberName("");
    setNewMemberRelationship("Spouse");
    setIsModalVisible(false);
  };

  const removeMember = (id: string) => {
    if (id === 'self') return;
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      // 1. Prepare Metadata
      const metadata = {
        first_name: params.firstName,
        middle_name: params.middleName,
        last_name: params.lastName,
        birth_date: params.birthDate,
        gender: params.gender,
        emergency_contact_name: params.emergencyContactName,
        emergency_contact_number: params.emergencyContactNumber,
        family_members: familyMembers, // Save the list
        registration_type: 'Family',
        is_registered: true,
        qr_code_id: `DAMAYAN-FAM-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      };

      // 2. Update Supabase User Metadata
      const { data: { user }, error: authError } = await supabase.auth.updateUser({
        data: metadata
      });

      if (authError) throw authError;

      // 3. START MIRROR TABLE SYNC
      if (user) {
        console.log("Head User Found:", user.id);
        const headFullName = `${params.firstName || ""} ${params.lastName || ""}`.trim();

        // A. Clean and Insert Head into 'register_citizens'
        await supabase.from('register_citizens').delete().eq('user_id', user.id);
        const { error: headDbError } = await supabase
          .from('register_citizens')
          .insert({
            user_id: user.id,
            first_name: params.firstName || "",
            middle_name: params.middleName || "",
            last_name: params.lastName || "",
            birth_date: params.birthDate || "",
            gender: params.gender || "",
            registration_type: "Family",
            qr_code_id: metadata.qr_code_id,
            emergency_contact_name: params.emergencyContactName || "",
            emergency_contact_number: params.emergencyContactNumber || ""
          });

        if (headDbError) console.error("Head DB Error:", headDbError.message);

        // B. Insert Members into 'families' (Unique QR for each)
        const membersToSave = familyMembers.filter(m => m.id !== 'self');
        if (membersToSave.length > 0) {
          for (let i = 0; i < membersToSave.length; i++) {
            const member = membersToSave[i];
            const { error: mError } = await supabase
              .from('families')
              .insert({
                user_id: user.id,
                head_user_id: user.id,
                head_full_name: headFullName,
                family_member_name: member.name,
                relationship: member.relationship,
                // Generate unique QR ID to prevent "duplicate key" error
                qr_code_id: `${metadata.qr_code_id}-${i + 1}-${Math.random().toString(36).substring(7).toUpperCase()}`
              });
            
            if (mError) {
              console.error(`Error saving member ${member.name}:`, mError.message);
              // We'll proceed so they aren't stuck, but the console shows the error
            }
          }
        }
      }

      setLoading(false);
      // Direct navigation to success page (avoiding Alert.alert roadblocks on Web)
      router.push("/registration-success");

    } catch (error: any) {
      setLoading(false);
      console.error("Critical Exception in handleComplete:", error);
      // We'll use the browser's native alert for maximum visibility on web/mobile
      alert("Registration Error: " + (error.message || "An unexpected error occurred. Please check your data."));
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
          <View style={styles.sectionHeader}>
            <Text style={styles.label}>Family Registration</Text>
          </View>
          
          <View style={styles.membersList}>
            {familyMembers.map((member) => (
              <View key={member.id} style={styles.memberCard}>
                <View style={styles.memberInfo}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <Text style={styles.memberRelationship}>{member.relationship}</Text>
                </View>
                {member.id !== 'self' && (
                  <TouchableOpacity onPress={() => removeMember(member.id)}>
                    <Feather name="trash-2" size={20} color="#FF6B6B" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="add-circle" size={24} color="#F2B705" />
            <Text style={styles.addButtonText}>Add Family Member</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.nextButton, loading && { opacity: 0.7 }]} 
            onPress={handleComplete}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.nextButtonText}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Member Modal */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Family Member</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput 
                style={styles.textInput}
                value={newMemberName}
                onChangeText={setNewMemberName}
                placeholder="Enter name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Relationship</Text>
              <View style={styles.relOptions}>
                {relationshipOptions.map(rel => (
                  <TouchableOpacity 
                    key={rel}
                    style={[styles.relOption, newMemberRelationship === rel && styles.relOptionSelected]}
                    onPress={() => setNewMemberRelationship(rel)}
                  >
                    <Text style={[styles.relOptionText, newMemberRelationship === rel && styles.relOptionTextSelected]}>
                      {rel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={addMember}>
                <Text style={styles.confirmButtonText}>Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  sectionHeader: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  membersList: {
    gap: 12,
    marginBottom: 20,
  },
  memberCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#F2B705",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  memberRelationship: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#F2B705",
    borderRadius: 15,
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: "#F2B705",
    fontWeight: "bold",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  relOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  relOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  relOptionSelected: {
    backgroundColor: "#F2B705",
    borderColor: "#F2B705",
  },
  relOptionText: {
    color: "#666",
  },
  relOptionTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#DDD",
    alignItems: 'center',
  },
  confirmButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F2B705",
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
