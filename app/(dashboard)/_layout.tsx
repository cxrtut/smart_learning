import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Course from './Course'
import Homework from './Homework'
import Quiz from './Quiz'

const Tab = createBottomTabNavigator()

const Dashboard = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Course" component={Course} />
        <Tab.Screen name="Homework" component={Homework} />
        <Tab.Screen name="Quiz" component={Quiz} />
    </Tab.Navigator>
  )
}

export default Dashboard