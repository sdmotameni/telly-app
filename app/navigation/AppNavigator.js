import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import userService from "../services/userService.js";

import ProfileNavigator from "../navigation/ProfileNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import AdminNavigator from "./AdminNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAdminStatus();
  }, []);

  const getAdminStatus = async () => {
    const response = await userService.getMe();
    if (!response.ok) return;

    setIsAdmin(response.data.isAdmin);
    setIsLoading(false);
  };

  if (isLoading) return null;

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
      {isAdmin && (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account-lock"
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default AppNavigator;
