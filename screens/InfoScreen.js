import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import { saveMeal } from '../utils/planStorage'; // ⬅️ NUEVO

export default function InfoScreen({ route, navigation }) {
  const { dish, meal, day } = route.params || {};
  const [activeTab, setActiveTab] = useState("ingredientes");
  const [portions, setPortions] = useState(1);

  const decreasePortion = () => {
    setPortions((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const increasePortion = () => {
    setPortions((prev) => (prev < 20 ? prev + 1 : prev));
  };

  const baseIngredients = [
    { emoji: '🥬', name: 'Lechuga', quantity: 100, unit: 'g' },
    { emoji: '🍅', name: 'Tomate', quantity: 1, unit: 'unidad' },
    { emoji: '🍗', name: 'Pollo', quantity: 150, unit: 'g' },
    { emoji: '🥚', name: 'Huevo', quantity: 2, unit: 'unidades' },
    { emoji: '🥑', name: 'Palta', quantity: 1, unit: 'unidad' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBox}>
        <Text style={styles.title}>{dish?.name || "Pastel de Choclo"}</Text>
        <MaterialCommunityIcons name="silverware-fork-knife" size={40} color="#0071CE" />
      </View>

      <View style={styles.imageBox}>
        <Image
          source={dish?.image}
          style={{ width: '100%', height: 180, borderRadius: 12}}
          resizeMode="cover"
        />
      </View>

      {/* Datos nutricionales */}
      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="food-variant" size={24} color="#0071CE" />
            <Text style={styles.statLabel}>Ingredientes</Text>
            <Text style={styles.statValue}>6</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="speedometer-slow" size={24} color="#0071CE" />
            <Text style={styles.statLabel}>Dificultad</Text>
            <Text style={styles.statValue}>Baja</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="clock-time-three-outline" size={24} color="#0071CE" />
            <Text style={styles.statLabel}>Tiempo</Text>
            <Text style={styles.statValue}>15'</Text>
          </View>
        </View>

        <View style={[styles.statsRow, { borderTopWidth: 1, borderTopColor: '#eee' }]}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="arm-flex-outline" size={24} color="#0071CE" />
            <Text style={styles.statLabel}>Proteínas</Text>
            <Text style={styles.statValue}>24g</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="#0071CE" />
            <Text style={styles.statLabel}>Calorías</Text>
            <Text style={styles.statValue}>89</Text>
          </View>
          <View style={styles.statItem}>
            <MaterialCommunityIcons name="cash" size={24} color="#0071CE" />
            <Text style={styles.statLabel}>Precio</Text>
            <Text style={styles.statValue}>$7.800</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "ingredientes" && styles.activeTab]}
          onPress={() => setActiveTab("ingredientes")}
        >
          <Text style={[styles.tabText, activeTab === "ingredientes" && styles.activeTabText]}>
            Ingredientes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "pasos" && styles.activeTab]}
          onPress={() => setActiveTab("pasos")}
        >
          <Text style={[styles.tabText, activeTab === "pasos" && styles.activeTabText]}>
            Pasos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contenido de pestañas */}
      {activeTab === "ingredientes" ? (
        <>
          <View style={styles.portionRow}>
            <TouchableOpacity style={styles.portionButton} onPress={decreasePortion}>
              <Text style={styles.portionSymbol}>−</Text>
            </TouchableOpacity>

            <Text style={styles.portionLabel}>{portions} porciones</Text>

            <TouchableOpacity style={styles.portionButton} onPress={increasePortion}>
              <Text style={styles.portionSymbol}>+</Text>
            </TouchableOpacity>
          </View>

          {baseIngredients.map((item, index) => (
            <View key={index} style={styles.ingredientCard}>
              <Text style={styles.ingredientText}>{item.emoji} {item.name}</Text>
              <Text style={styles.ingredientQty}>
                {item.quantity * portions} {item.unit}
              </Text>
            </View>
          ))}
        </>
      ) : (
        <>
          {["Lavar los ingredientes", "Cortar la lechuga y el tomate", "Cocinar el pollo y los huevos", "Mezclar todo y agregar palta"].map((step, i) => (
            <View key={i} style={styles.stepCard}>
              <Text style={styles.stepText}>{i + 1}. {step}</Text>
            </View>
          ))}
        </>
      )}

      {/* Botón agregar */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={async () => {
          try {
            await saveMeal(day, meal, dish);      // guarda en AsyncStorage
            navigation.navigate('CalendarScreen'); // vuelve al calendario correcto
          } catch (e) {
            console.warn('No se pudo guardar el platillo:', e);
          }
        }}
      >
        <Text style={styles.addButtonText}>Agregar a {meal} del {day}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f9fa',
    flex: 1,
    padding: 15,
  },
  headerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  imageBox: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 30,
    marginBottom: 15,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#444',
    fontSize: 13,
  },
  statValue: {
    color: '#0071CE',
    fontWeight: '700',
  },
  tabs: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#e9ecef',
    overflow: 'hidden',
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    backgroundColor: '#0071CE',
  },
  tabText: {
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  portionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  portionButton: {
    backgroundColor: '#0071CE',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 10,
  },
  portionSymbol: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  portionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  ingredientCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ingredientText: {
    fontSize: 16,
    color: '#333',
  },
  ingredientQty: {
    color: '#0071CE',
    fontWeight: '600',
  },
  stepCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  stepText: {
    color: '#333',
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#0071CE',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  addButtonText: {
    color: '#FFD200',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});