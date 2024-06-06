import React, { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View, Platform, Alert } from "react-native";
import Navigations from "./navigation/Navigations";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./navigation/PushNavigation";
import { useShareIntent } from "expo-share-intent";
import { ShareIntentProvider, useShareIntentContext } from "expo-share-intent";
import { usePushNotifications } from "./usePushNotifications";

const Stack = createStackNavigator();

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { expoPushToken, notification } = usePushNotifications();
  
  const data = JSON.stringify(notification, undefined, 2);
   
  useEffect(() => {
    loadFonts();
    return;
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        Pretendard: require("./assets/fonts/Pretendard.otf"),
        Bebas: require("./assets/fonts/Bebas.ttf"),
      });
      setIsFontLoaded(true);
      await SplashScreen.hideAsync();
    } catch (e) {
      console.warn(e);
    }
  };

  if (!isFontLoaded) {
    return null;
  }

  return (
    <ShareIntentProvider>
      <View style={styles.container}>
        <StatusBar
          style="auto"
          backgroundColor="white"
          barStyle="light-content"
          translucent={false}
        />
        <Navigations />
      </View>
    </ShareIntentProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bebasText: {
    fontFamily: "Bebas",
  },
  pretendardText: {
    fontFamily: "Pretendard",
  },
});