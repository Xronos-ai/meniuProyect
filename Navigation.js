import * as React from 'react';
import {View, Text} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//screens
import HomeScreen from "./screens/HomeScreen";
import CalendarScreen from "./screens/CalendarScreen";
import ProvisionsScreen from "./screens/ProvisionsScreen";

const Tab = createBottomTabNavigator();

function MyTabs(){
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                tabBarActiveTintColor: 'green',
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarLabel: 'Menús',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="silverware-fork-knife" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="Calendar" 
                component={CalendarScreen} 
                options={{
                    tabBarLabel: 'Calendario',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="calendar-edit" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen 
                name="Provisions" 
                component={ProvisionsScreen} 
                options={{
                    tabBarLabel: 'Víveres',
                    tabBarIcon: ({color, size}) => (
                        <MaterialCommunityIcons name="list-box-outline" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}