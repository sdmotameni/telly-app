import * as SecureStore from "expo-secure-store";

const key = "authToken";

const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync(key, token);
  } catch (error) {
    console.log("Error STORING token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error GETTING token", error);
  }
};

const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error DELETING token", error);
  }
};

export default { storeToken, getToken, deleteToken };
