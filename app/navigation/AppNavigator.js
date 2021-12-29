import React, { useState, useEffect, useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import userService from "../services/userService.js";

import ProfileNavigator from "../navigation/ProfileNavigator";
import SettingsScreen from "../screens/SettingsScreen";
import AdminNavigator from "./AdminNavigator";
import OnboardingScreen from "../screens/OnboardingScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const response = await userService.getMe();
    if (!response.ok) return;

    setIsAdmin(response.data.isAdmin);
    setIsNew(response.data.isNewAccount);

    setIsLoading(false);
  };

  if (isLoading) return null;

  if (isNew) return <OnboardingScreen setIsNew={setIsNew} />;

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
