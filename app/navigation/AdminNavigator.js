import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AdminScreen from "../screens/AdminScreen";
import AdminProfileScreen from "../screens/AdminProfileScreen";

const Stack = createStackNavigator();

const AdminNavigator = ({ route }) => (
  <Stack.Navigator screenOptions={{ headerShown: true }}>
    <Stack.Screen
      name="AdminScreen"
      options={{ title: "Admin" }}
      component={AdminScreen}
    />
    <Stack.Screen name="AdminProfileScreen" component={AdminProfileScreen} />
  </Stack.Navigator>
);

export default AdminNavigator;
