import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "grey",
        tabBarStyle: {
          backgroundColor: colors.bg_primary,
          height: 60,
          borderColor: colors.bg_primary,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="library-add" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="charts"
        options={{
          title: "Charts",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="line-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "User",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={25} name="user-circle-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
