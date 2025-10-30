import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
            <View style={styles.comida}>
                <Text style={styles.imageText}>Pastel de Choclo</Text>
            </View>

            <View style={styles.imagePlaceholder}>
                <MaterialCommunityIcons name="image" size={170} color="black" />
            </View>

            <View style={styles.statsBox}>
                <View style={[styles.statsRow, styles.statsRowEspecial]}>
                <View style={styles.column}>
                    <Text style={styles.infos}>Ingredientes</Text>
                    <MaterialCommunityIcons name="food-variant" size={24} color="black" />
                    <Text>6</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.infos}>Dificultad</Text>
                    <MaterialCommunityIcons name="speedometer-slow" size={24} color="black" />
                    <Text>Baja</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.infos}>Tiempo</Text>
                    <MaterialCommunityIcons name="clock-time-three-outline" size={24} color="black" />
                    <Text>15'</Text>
                </View>
                </View>
                <View style={[styles.statsRow, styles.statsRowEsp]}>
                <View style={styles.column}>
                    <Text style={styles.infos}>Proteínas</Text>
                    <MaterialCommunityIcons name="arm-flex-outline" size={24} color="black" />
                    <Text>24</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.infos}>Calorías</Text>
                    <MaterialCommunityIcons name="lightning-bolt-outline" size={24} color="black" />
                    <Text>89</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.infos}>Precio</Text>
                    <MaterialCommunityIcons name="cash" size={24} color="black" />
                    <Text>$7800</Text>
                </View>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <TouchableOpacity
                style={[styles.tab, activeTab === "ingredientes" && styles.activeTab]}
                onPress={() => setActiveTab("ingredientes")}
                >
                <Text style={styles.tabText}>Ingredientes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                style={[styles.tab, activeTab === "pasos" && styles.activeTab]}
                onPress={() => setActiveTab("pasos")}
                >
                <Text style={styles.tabText}>Pasos</Text>
                </TouchableOpacity>
            </View>

            {activeTab === "ingredientes" ? (
                <>
                <View style={styles.portionsRow}>
                    <TouchableOpacity style={styles.portionButton} onPress={decreasePortion}>
                    <Text style={styles.portionText}>−</Text>
                    </TouchableOpacity>

                    <Text style={styles.portionLabel}>{portions} porciones</Text>

                    <TouchableOpacity style={styles.portionButton} onPress={increasePortion}>
                    <Text style={styles.portionText}>+</Text>
                    </TouchableOpacity>
                </View>

                {baseIngredients.map((item, index) => (
                    <View key={index} style={[styles.ingredient, styles.statsRow]}>
                        <Text>{item.emoji} {item.name}</Text>
                        <Text style={styles.cantidades}>
                        {item.quantity * portions} {item.unit}
                        </Text>
                    </View>
                ))}

                </>
            ) : (
                <>
                <View style={styles.step}><Text>1. Lavar los ingredientes</Text></View>
                <View style={styles.step}><Text>2. Cortar la lechuga y el tomate</Text></View>
                <View style={styles.step}><Text>3. Cocinar el pollo y los huevos</Text></View>
                <View style={styles.step}><Text>4. Mezclar todo y agregar palta</Text></View>
                </>
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Calendar')}
            >
                <Text style={styles.addButtonText}>Agregar a {meal} del {day}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ff',
    padding: 10,
  },
  comida: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    alignItems: "center", 
    justifyContent: "center",
  },
  imagePlaceholder: {
    height: 180,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 18,
    color: '#333',
  },
  statsBox: {
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  infos: {
    paddingBottom: 5,
    color: '#727272ff',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsRowEspecial: {
    borderBottomWidth: 2,
    borderBottomColor: '#d3b3d1ff',
    padding: 10,
  },
  statsRowEsp: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginVertical: 10,
    height: 50,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#8585854f',
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  portionsRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  portionButton: {
    backgroundColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginHorizontal: 15,
  },
  portionText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  portionLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  ingredient: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  step: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  addButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
});