import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import EditLinksScreen from "../screens/EditLinksScreen";

const Stack = createStackNavigator();

const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="EditLinks" component={EditLinksScreen} />
  </Stack.Navigator>
);

export default ProfileNavigator;
