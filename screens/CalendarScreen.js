import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CalendarScreen({ navigation }) {
  const days = ['Lunes 😫', 'Martes 😐', 'Miércoles ☺️', 'Jueves 😄', 'Viernes 🤩', 'Sábado 🤪', 'Domingo 😔'];
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

        {/* Encabezado con día */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={goToPreviousDay}
            disabled={currentDayIndex === 0}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={36}
              color={currentDayIndex === 0 ? '#A0A0A0' : '#0071CE'}
            />
          </TouchableOpacity>

          <Text style={styles.headerText}>{currentDay}</Text>

          <TouchableOpacity
            onPress={goToNextDay}
            disabled={currentDayIndex === days.length - 1}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={36}
              color={currentDayIndex === days.length - 1 ? '#A0A0A0' : '#0071CE'}
            />
          </TouchableOpacity>
        </View>

        {/* Contenido del día actual */}
        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.subtitle}>Selecciona una comida para agregar:</Text>

          {['Desayuno', 'Almuerzo', 'Cena'].map((meal, i) => (
            <TouchableOpacity
              key={i}
              style={styles.mealButton}
              onPress={() => navigation.navigate('Options', { meal, day: currentDay })}
            >
              <Text style={styles.mealText}>+ {meal}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scroll: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    color: '#0071CE',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  subtitle: {
    color: '#003366',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'center',
  },
  mealButton: {
    backgroundColor: '#0071CE',
    borderRadius: 10,
    paddingVertical: 14,
    marginVertical: 6,
    shadowColor: '#0071CE',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  mealText: {
    color: '#FFD200',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
