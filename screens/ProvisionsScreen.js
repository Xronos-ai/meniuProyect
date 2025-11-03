import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { products } from '../database/productsData';

export default function ProvisionsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filters = ['Precio', 'Nombre', 'Todos'];

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
  };

  // Filtrado y ordenamiento
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim() !== '') {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (selectedFilter) {
      case 'Precio':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Nombre':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [searchQuery, selectedFilter]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Banner tipo Stack.Screen */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Provisiones</Text>
      </View>

      {/* Contenido */}
      <View style={styles.container}>
        {/* Búsqueda y filtro */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.search}
            placeholder="Buscar productos..."
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

        {/* Lista de productos */}
        <FlatList
          data={filteredProducts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenLink(item.link)}>
              <View style={styles.card}>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#0071CE" />
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
    </SafeAreaView>
  );
}

// === Estilos ===
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000ff',
  },
  container: {
    flex: 1,
    padding: 15,
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
  filterContainer: { position: 'relative', marginLeft: 10 },
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '600', color: '#003366' },
  price: { fontSize: 14, color: '#444', marginTop: 4 },
});
