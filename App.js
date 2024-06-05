import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, View, Platform, Alert } from "react-native";
import Navigations from "./navigation/Navigations";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';
import * as Notifications from "expo-notifications";
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './navigation/PushNavigation';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (typeof Constants.isDevice === 'undefined') {
    Constants.isDevice = Platform.OS !== 'web';
  }

  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const Stack = createStackNavigator();

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    loadFonts();
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
      }
    }).catch(err => console.log('Error in getting push token:', err));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      console.log(data);
      if (data && data.directory) {
        navigationRef.current?.navigate('DirectoryView', { directory: data.directory });
      }
    });
    return
  }, []);

  const loadFonts = async () => {
    try {
      await Font.loadAsync({
        'Pretendard': require('./assets/fonts/Pretendard.otf'),
        'Bebas': require('./assets/fonts/Bebas.ttf'),
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
  bebasText: {
    fontFamily: 'Bebas', 
  },
  pretendardText: {
    fontFamily: 'Pretendard',
  }
});
