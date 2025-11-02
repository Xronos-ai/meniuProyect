import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getPlan } from '../utils/planStorage';

export default function HomeScreen({ navigation }) {
  const [todayMeals, setTodayMeals] = useState(null);

  const loadToday = useCallback(async () => {
    const plan = await getPlan();
    const dayNames = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const today = dayNames[new Date().getDay()];
    setTodayMeals(plan[today] || null);
  }, []);

  useEffect(() => { loadToday(); }, [loadToday]);
  useFocusEffect(useCallback(() => { loadToday(); }, [loadToday]));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>¡Bienvenido a tu planificador de comidas! 🗓️</Text>

        {todayMeals ? (
          <>
            <Text style={styles.message}>Para hoy:</Text>
            {Object.entries(todayMeals).map(([meal, dish]) => (
              <Text key={meal} style={styles.mealLine}>
                {meal}: <Text style={styles.mealName}>{dish?.name}</Text>
              </Text>
            ))}
          </>
        ) : (
          <Text style={styles.message}>No hay platillos asignados para hoy 😉</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          // Importante: cambiar de Tab usando el nombre REAL del Tab.
          // Usamos el padre (TabNavigator) para evitar ambigüedad.
          onPress={() => navigation.getParent()?.navigate('Calendario Semanal')}
        >
          <Text style={styles.buttonText}>Ver calendario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f6f8', padding: 16, justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, elevation: 2 },
  title: { fontSize: 20, fontWeight: '800', color: '#0b5cab', marginBottom: 8 },
  message: { color: '#333', marginBottom: 8 },
  mealLine: { color: '#333', marginBottom: 4, fontWeight: '600' },
  mealName: { fontWeight: '400' },
  button: { backgroundColor: '#0b5cab', paddingVertical: 12, borderRadius: 12, marginTop: 12, alignItems: 'center' },
  buttonText: { color: '#ffd200', fontSize: 16, fontWeight: '700' },
});