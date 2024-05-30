import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { darkTheme } from "./ThemeColor";
import { useFonts } from "expo-font";

function OuterContainer({ children }) {
  const [fontsLoaded] = useFonts({
    ONEMobile: require("../assets/fonts/ONE Mobile Title.ttf"),
    Pretendard: require("../assets/fonts/Pretendard-Medium.otf"),
    Jersy: require("../assets/fonts/Jersey25-Regular.ttf"),
    Bebas: require("../assets/fonts/BebasNeue-Regular.ttf"),
    NotoSans: require("../assets/fonts/NotoSansKR-VariableFont_wght.ttf"),
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
