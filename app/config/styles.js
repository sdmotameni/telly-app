import { Platform } from "react-native";

import colors from "./colors";

export default {
  text: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Helvetica" : "Roboto",
    color: colors.black,
  },
};
