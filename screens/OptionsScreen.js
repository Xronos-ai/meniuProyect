import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const dishes = [
  { id: '1', name: 'Papas fritas', time: '15 min' },
  { id: '2', name: 'Ensalada César', time: '10 min' },
  { id: '3', name: 'Pollo al horno', time: '45 min' },
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
      <View style={styles.searchRow}>
        <TextInput
          style={styles.search}
          placeholder="Buscar..."
          placeholderTextColor="#aaa"
        />

        <View style={styles.filterContainer}>
            <TouchableOpacity
                style={styles.filterButton}
                onPress={() => setFilterVisible(!filterVisible)}
            >
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

      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.dishCard}
            onPress={() => navigation.navigate('Info', { dish: item, meal, day })}
          >
            <MaterialCommunityIcons name="image" size={45} color="black" />
            <Text style={styles.dishName}>{item.name}</Text>
            <View style={styles.filtro}>
                <MaterialCommunityIcons name="clock-time-three-outline" size={24} color="black" />
                <Text style={styles.dishTime}>{item.time}</Text>
            </View>
            
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  search: {
    flex: 1,
    backgroundColor: '#666666ff',
    color: 'white',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  filtro:{
    alignItems: 'center',
  },
  filterContainer: {
    position: 'relative',
    width: '30%',
  },
  filterButton: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  filterText: {
    color: 'white',
    textAlign: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: '#222',
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  dropdownText: {
    color: 'white',
  },
  dishCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 18,
  },
  dishTime: {
    fontSize: 14,
    color: '#555',
  },
});
