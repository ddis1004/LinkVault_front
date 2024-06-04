import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View } from "react-native";
import Navigations from "./navigation/Navigations";
import * as Notifications from "expo-notifications";

export default function App() {
  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false,
  //   }),
  // });
  return (
    <View style={styles.container}>
      <StatusBar
        style="auto"
        backgroundColor="white"
        barStyle="light-content"
        translucent={false}
      />
      <Navigations />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
