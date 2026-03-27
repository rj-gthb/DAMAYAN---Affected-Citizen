import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList, Dimensions, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useMemo } from "react";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function RegistrationBirthdateScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewDate, setViewDate] = useState(new Date(2000, 0, 1)); // Default view to 2000 for easier scrolling to adult ages
  const [monthModalVisible, setMonthModalVisible] = useState(false);
  const [yearModalVisible, setYearModalVisible] = useState(false);

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const result = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      result.push(i);
    }
    return result;
  }, []);

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    
    // Previous month padding
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, currentMonth: false });
    }
    
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, currentMonth: true });
    }
    
    // Next month padding
    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      days.push({ day: i, currentMonth: false });
    }
    
    return days;
  }, [viewDate]);

  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(newDate);
  };

  const handleDateSelect = (day: number) => {
    setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day));
  };

  const selectMonth = (index: number) => {
    setViewDate(new Date(viewDate.getFullYear(), index, 1));
    setMonthModalVisible(false);
  };

  const selectYear = (year: number) => {
    setViewDate(new Date(year, viewDate.getMonth(), 1));
    setYearModalVisible(false);
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
          <Text style={styles.label}>Birthdate</Text>
          <View style={styles.selectedDateDisplay}>
            <Text style={[styles.selectedDateText, !selectedDate && styles.placeholderText]}>
              {selectedDate ? selectedDate.toLocaleDateString() : "Select Birthdate"}
            </Text>
          </View>

          {/* Calendar Card */}
          <View style={styles.calendarCard}>
            {/* Calendar Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <Feather name="chevron-left" size={20} color="#333" />
              </TouchableOpacity>
              
              <View style={styles.selectors}>
                <TouchableOpacity style={styles.selector} onPress={() => setMonthModalVisible(true)}>
                  <Text style={styles.selectorText}>{months[viewDate.getMonth()]}</Text>
                  <Feather name="chevron-down" size={14} color="#333" />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.selector} onPress={() => setYearModalVisible(true)}>
                  <Text style={styles.selectorText}>{viewDate.getFullYear()}</Text>
                  <Feather name="chevron-down" size={14} color="#333" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => changeMonth(1)}>
                <Feather name="chevron-right" size={20} color="#333" />
              </TouchableOpacity>
            </View>

            {/* Days of Week Header */}
            <View style={styles.daysOfWeekContainer}>
              {daysOfWeek.map(day => (
                <Text key={day} style={styles.dayOfWeekText}>{day}</Text>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={styles.gridContainer}>
              {calendarDays.map((dateObj, index) => {
                const isSelected = selectedDate && 
                                  dateObj.currentMonth && 
                                  selectedDate.getDate() === dateObj.day &&
                                  selectedDate.getMonth() === viewDate.getMonth() &&
                                  selectedDate.getFullYear() === viewDate.getFullYear();
                
                return (
                  <TouchableOpacity 
                    key={index} 
                    style={[
                      styles.dayCell,
                      isSelected && styles.selectedDayCell
                    ]}
                    onPress={() => dateObj.currentMonth && handleDateSelect(dateObj.day)}
                    disabled={!dateObj.currentMonth}
                  >
                    <Text style={[
                      styles.dayText,
                      !dateObj.currentMonth && styles.otherMonthDayText,
                      isSelected && styles.selectedDayText
                    ]}>
                      {dateObj.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => {
              if (!selectedDate) {
                alert("Please select your birthdate");
                return;
              }
              router.push({
                pathname: "/registration-gender",
                params: { 
                  ...params, 
                  birthDate: selectedDate.toISOString().split('T')[0] 
                }
              });
            }}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Month Selector Modal */}
      <Modal visible={monthModalVisible} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setMonthModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Month</Text>
            <View style={styles.modalGrid}>
              {months.map((month, index) => (
                <TouchableOpacity 
                  key={month} 
                  style={[styles.modalItem, viewDate.getMonth() === index && styles.modalItemSelected]}
                  onPress={() => selectMonth(index)}
                >
                  <Text style={[styles.modalItemText, viewDate.getMonth() === index && styles.modalItemTextSelected]}>
                    {month}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Year Selector Modal */}
      <Modal visible={yearModalVisible} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setYearModalVisible(false)}
        >
          <View style={[styles.modalContent, { height: SCREEN_HEIGHT * 0.6 }]}>
            <Text style={styles.modalTitle}>Select Year</Text>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[styles.modalItemLarge, viewDate.getFullYear() === item && styles.modalItemSelected]}
                  onPress={() => selectYear(item)}
                >
                  <Text style={[styles.modalItemText, viewDate.getFullYear() === item && styles.modalItemTextSelected]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
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
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    paddingLeft: 4,
  },
  selectedDateDisplay: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#F2B705",
    borderRadius: 25,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: "center",
    marginBottom: 24,
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#AAA",
  },
  calendarCard: {
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2B705",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  selectors: {
    flexDirection: "row",
    gap: 8,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F5F5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EEE",
    gap: 4,
  },
  selectorText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
  },
  daysOfWeekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dayOfWeekText: {
    width: 38,
    textAlign: "center",
    fontSize: 12,
    color: "#999",
    fontWeight: "500",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayCell: {
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  selectedDayCell: {
    backgroundColor: "#C0320A", // The deep red from the mockup
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    color: "#333",
  },
  otherMonthDayText: {
    color: "#CCC",
  },
  selectedDayText: {
    color: "white",
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
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '100%',
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalItem: {
    width: '30%',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F2B705',
  },
  modalItemLarge: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F2B705',
  },
  modalItemSelected: {
    backgroundColor: '#F2B705',
  },
  modalItemText: {
    fontSize: 14,
    color: '#333',
  },
  modalItemTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
});
