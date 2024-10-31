import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from './Home'
import Profile from './Profile'
import colors from '@/constants/colors'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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

          return <Ionicons name={iconName!} size={size} color={color} />
        },
        tabBarStyle:{
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 5,
          backgroundColor: 'white',
          borderRadius: 50,
          height: 70,
          borderTopColor: "transparent",
          shadowColor: '#7F5DF0',
          shadowOpacity: 0.25,
          shadowOffset: { width: 0, height: 15 },
          shadowRadius: 3.5
        },
        headerShown: false,
        tabBarActiveTintColor: colors.PRIMARY,
        tabBarInactiveTintColor: "black",
        tabBarShowLabel: false,
        
      })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default HomeRoot