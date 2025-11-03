import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { mealsData } from '../database/mealsData'; // ⬅️ Import directo de tus platillos

export default function OptionsScreen({ navigation, route }) {
  const { meal, day } = route.params || {};

  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['Favoritos', 'Precio', 'Tiempo', 'Todos'];

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
  };

  // Adaptamos mealsData al formato que se usaba en la lista
  const dishes = useMemo(() => {
    return mealsData.map((dish, index) => ({
      id: dish.id ? String(dish.id) : String(index + 1),
      name: dish.name,
      time: dish.time ? parseInt(dish.time) : 0,
      price: dish.price || 0,
      favorite: dish.favorite || false,
      image: dish.image,
      fullData: dish, // ⬅️ Guardamos toda la info original por si se necesita al navegar
    }));
  }, []);

  // Filtrado y ordenamiento
  const filteredDishes = useMemo(() => {
    let result = [...dishes];

    // Filtro de búsqueda
    if (searchQuery.trim() !== '') {
      result = result.filter((d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtros adicionales
    switch (selectedFilter) {
      case 'Favoritos':
        result = result.filter((d) => d.favorite);
        break;
      case 'Precio':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Tiempo':
        result.sort((a, b) => a.time - b.time);
        break;
      default:
        break;
    }

    return result;
  }, [dishes, selectedFilter, searchQuery]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>
          {day ? `${meal} — ${day}` : 'Seleccionar Platillo'}
        </Text>
      </View>

      {/* Búsqueda y Filtro */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Buscar platillos..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
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
        data={filteredDishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dishCard}
            onPress={() => navigation.navigate('Info', { dish: item.fullData, meal, day })}
          >
            <View style={styles.dishInfo}>
              <Image
                source={item.image}
                style={{ width: 60, height: 60, borderRadius: 8, marginRight: 10 }}
                resizeMode="cover"
              />
              <View>
                <Text style={styles.dishName}>{item.name}</Text>
                <View style={styles.timeRow}>
                  <MaterialCommunityIcons
                    name="clock-time-three-outline"
                    size={18}
                    color="#555"
                  />
                  <Text style={styles.dishTime}>{item.time} min</Text>
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

// === ESTILOS (idénticos) ===
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
