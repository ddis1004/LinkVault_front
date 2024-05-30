import { View, Text, StyleSheet } from "react-native";
import { darkTheme } from "./ThemeColor";

const Header = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    padding: 10,
    margin: 0,
    flexDirection: "column",
    justifyContent: "center",
  },
  titleText: {
    fontFamily: "Pretendard",
    fontWeight: "800",
    fontSize: 26,
    color: darkTheme.text,
  },
});

export default Header;
