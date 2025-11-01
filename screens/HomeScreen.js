import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  const todayMeal = route?.params?.todayMeal || null; // recibe el platillo desde CalendarScreen

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>¡Bienvenido a tu planificador de comidas! 🗓️ </Text>

        {todayMeal ? (
          <View style={styles.mealContainer}>
            <Text style={styles.subtitle}>Hoy toca hacer:</Text>
            <Text style={styles.mealName}>{todayMeal}</Text>
          </View>
        ) : (
          <Text style={styles.subtitle}>
            No hay platillos asignados para hoy 😋
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Calendario Semanal')}
        >
          <Text style={styles.buttonText}>Ver calendario</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0054A6',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  mealContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mealName: {
    fontSize: 20,
    color: '#FFD200',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#0054A6',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#FFD200',
    fontSize: 18,
    fontWeight: '600',
  },
});
