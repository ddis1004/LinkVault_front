import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { darkTheme } from "./ThemeColor";
import { useFonts } from "expo-font";

function OuterContainer({ children }) {
  const [fontsLoaded] = useFonts({
    ONEMobile: require("../assets/fonts/ONEMobile.ttf"),
    Pretendard: require("../assets/fonts/Pretendard.otf"),
    Jersy: require("../assets/fonts/Jersy.ttf"),
    Bebas: require("../assets/fonts/Bebas.ttf"),
    NotoSans: require("../assets/fonts/NotoSans.ttf"),
  });
  if (!fontsLoaded) return null;
  return <View style={styles.outerContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: darkTheme.background,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("window").height - 50,
    padding: 10,
  },
});

export default OuterContainer;
