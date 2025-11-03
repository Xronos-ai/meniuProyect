import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from './CalendarScreen';
import OptionsScreen from './OptionsScreen';
import InfoScreen from './InfoScreen';

const Stack = createStackNavigator();

export default function CalendarStack() {
  return (
    <Stack.Navigator
      initialRouteName="CalendarScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#E0E0E0',
          elevation: 0, // sin sombra en Android
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: '#000000ff',
        },
        headerTitleAlign: 'center', 
      }}
    >
      <Stack.Screen
        name="CalendarScreen"
        component={CalendarScreen}
        options={{ title: 'Calendario Semanal' }}
      />
      <Stack.Screen
        name="Options"
        component={OptionsScreen}
        options={{ title: 'Elegir Platillo' }}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
        options={{ title: 'Información del Platillo' }}
      />
    </Stack.Navigator>
  );
}
