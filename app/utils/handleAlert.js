import { Alert } from "react-native";

export default function handleAlert(title = "Alert", message) {
  Alert.alert(title, message);
}
