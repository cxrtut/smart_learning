import React, { Profiler } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator()

const HomeRoot = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline'
          }

          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={22} color={color} />
        },
        tabBarStyle:{
          position: 'absolute',
          bottom: 25,
          left: 0,
          right: 0,
          elevation: 5,
          backgroundColor: 'white',
          borderRadius: 50,
          height: 70,
          borderTopColor: "transparent",
          shadowColor: '#7F5DF0',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 15 },
          shadowRadius: 3.5,
          marginHorizontal: 20,
          paddingTop: 10,
        },
        headerShown: false,
        tabBarActiveTintColor: '#5470FD',
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: true,
        
      })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default HomeRoot