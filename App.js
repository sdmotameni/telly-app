import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import AuthContext from "./app/auth/AuthContext";
import authStorage from "./app/auth/authStorage";

import InfoContext from "./app/misc/InfoContext";
import infoService from "./app/services/infoService.js";

import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  const [token, setToken] = useState(null);
  const [links, setLinks] = useState(null);

  useEffect(() => {
    restoreUser();
    loadLinks();
  }, []);

  const restoreUser = async () => {
    const userToken = await authStorage.getToken();
    if (userToken) setToken(userToken);
  };

  const loadLinks = async () => {
    const response = await infoService.getLinks();
    if (!response.ok) return;

    setLinks(response.data);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <InfoContext.Provider value={{ links }}>
        <StatusBar style="dark" />
        <NavigationContainer>
          {token ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </InfoContext.Provider>
    </AuthContext.Provider>
  );
}
