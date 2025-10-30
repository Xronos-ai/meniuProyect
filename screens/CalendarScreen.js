import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CalendarScreen({ navigation }) {
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // 0 = Lunes

  const currentDay = days[currentDayIndex];

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goToPreviousDay}
            disabled={currentDayIndex === 0}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={32}
              color={currentDayIndex === 0 ? '#555' : 'black'}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>{currentDay}</Text>

          <TouchableOpacity
            onPress={goToNextDay}
            disabled={currentDayIndex === days.length - 1}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={32}
              color={currentDayIndex === days.length - 1 ? '#555' : 'black'}
            />
          </TouchableOpacity>
        </View>

        {/* Contenido del día actual */}
        <View style={styles.dayContainer}>
          {['Desayuno', 'Almuerzo', 'Cena'].map((meal, i) => (
            <TouchableOpacity
              key={i}
              style={styles.mealButton}
              onPress={() => navigation.navigate('Options', { meal, day: currentDay })}
            >
              <Text style={styles.mealText}>+ {meal}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dayContainer: {
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 15,
  },
  dayTitle: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  mealButton: {
    backgroundColor: '#6d6d6dff',
    borderRadius: 10,
    paddingVertical: 12,
    marginVertical: 5,
  },
  mealText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});