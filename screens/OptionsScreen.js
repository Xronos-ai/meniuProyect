import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const dishes = [
  { id: '1', name: 'Papas Fritas', time: '15 min' },
  { id: '2', name: 'Ensalada César', time: '10 min' },
  { id: '3', name: 'Pollo al Horno', time: '45 min' },
];

export default function OptionsScreen({ navigation, route }) {
  const { meal, day } = route.params || {};

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filters = ['Favoritos', 'Precio', 'Tiempo', 'Todos'];

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {day ? `${meal} — ${day}` : 'Seleccionar Platillo'}
        </Text>
      </View>

      {/* Fila de búsqueda y filtro */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Buscar platillos..."
          placeholderTextColor="#666"
        />

        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setFilterVisible(!filterVisible)}
          >
            <MaterialCommunityIcons name="filter-variant" size={20} color="#0071CE" />
            <Text style={styles.filterText}>{selectedFilter}</Text>
          </TouchableOpacity>

          {filterVisible && (
            <View style={styles.dropdown}>
              {filters.map((filter, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSelectFilter(filter)}
                >
                  <Text style={styles.dropdownText}>{filter}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Lista de platillos */}
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dishCard}
            onPress={() => navigation.navigate('Info', { dish: item, meal, day })}
          >
            <View style={styles.dishInfo}>
              <MaterialCommunityIcons name="silverware-fork-knife" size={36} color="#0071CE" />
              <View>
                <Text style={styles.dishName}>{item.name}</Text>
                <View style={styles.timeRow}>
                  <MaterialCommunityIcons name="clock-time-three-outline" size={20} color="#555" />
                  <Text style={styles.dishTime}>{item.time}</Text>
                </View>
              </View>
            </View>

            <MaterialCommunityIcons name="chevron-right" size={26} color="#0071CE" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0071CE',
    textAlign: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    zIndex: 5,
  },
  search: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterContainer: {
    position: 'relative',
    marginLeft: 10,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterText: {
    color: '#0071CE',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    width: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dropdownText: {
    color: '#0071CE',
    fontSize: 15,
  },
  dishCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  dishInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dishName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#003366',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  dishTime: {
    fontSize: 14,
    color: '#666',
  },
});
