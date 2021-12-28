import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import LoginCodeScreen from "../screens/LoginCodeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen
      name="LoginCodeScreen"
      options={{ title: "Login Verification" }}
      component={LoginCodeScreen}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
