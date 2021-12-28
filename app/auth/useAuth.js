import { useContext } from "react";

import AuthContext from "./AuthContext";
import authStorage from "./authStorage";

export default useAuth = () => {
  const { token, setToken } = useContext(AuthContext);

  const login = (authToken) => {
    setToken(authToken);
    authStorage.storeToken(authToken);
  };

  const logout = () => {
    setToken(null);
    authStorage.deleteToken();
  };

  return { token, login, logout };
};
