import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getPlan, normalizeDayLabel } from '../utils/planStorage';

export default function CalendarScreen({ navigation }) {
  const days = ['Lunes 😫','Martes 😐','Miércoles ☺️','Jueves 😄','Viernes 🤩','Sábado 🤪','Domingo 😔'];
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [plan, setPlan] = useState({});

  useEffect(() => {
    const today = new Date().getDay(); // 0=Dom,1=Lun,...6=Sab
    const map = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 };
    setCurrentDayIndex(map[today] ?? 0);
  }, []);

  const loadPlan = useCallback(async () => {
    const p = await getPlan();
    setPlan(p);
  }, []);

  useFocusEffect(useCallback(() => { loadPlan(); }, [loadPlan]));
  useEffect(() => { loadPlan(); }, [loadPlan]);

  const currentDay = days[currentDayIndex];
  const currentDayKey = normalizeDayLabel(currentDay);
  const meals = ['Desayuno', 'Almuerzo', 'Cena'];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.dayHeader}>
          <TouchableOpacity onPress={() => setCurrentDayIndex((prev) => (prev > 0 ? prev - 1 : days.length - 1))}>
            <MaterialCommunityIcons name="chevron-left" size={28} color="#0071CE" />
          </TouchableOpacity>
          <Text style={styles.dayText}>{currentDay}</Text>
          <TouchableOpacity onPress={() => setCurrentDayIndex((prev) => (prev < days.length - 1 ? prev + 1 : 0))}>
            <MaterialCommunityIcons name="chevron-right" size={28} color="#0071CE" />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Selecciona una comida para agregar:</Text>

        <ScrollView contentContainerStyle={styles.scroll}>
          {meals.map((meal) => (
            <View key={meal} style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.mealButton}
                onPress={() => navigation.navigate('Options', { meal, day: currentDay })}
              >
                <Text style={styles.mealText}>+ {meal}</Text>
              </TouchableOpacity>
              {/* <- Ya no mostramos la fila “planificada” debajo del botón */}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8f9fa' },
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 10 },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  dayText: { fontSize: 22, fontWeight: '800', color: '#0b5cab' },
  subtitle: { marginBottom: 12, color: '#333', textAlign: 'center' },
  scroll: { paddingBottom: 24 },
  mealButton: {
    backgroundColor: '#0b5cab',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  mealText: { color: '#ffd200', fontWeight: '700', fontSize: 16 },
});

