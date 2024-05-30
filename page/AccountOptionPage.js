import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

function AccountOptionPage() {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.middleContainer}>
        <Text>Hello</Text>
      </View>
    </View>
  );
}

export default AccountOptionPage;

const styles = StyleSheet.create({
  outerContainer: {
    display: "flex",
    flexDirection: "column",
  },
  middleContainer: {},
});
