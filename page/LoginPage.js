import { View, Text, Button, TextInput, Pressable } from "react-native";
import { React, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { darkTheme } from "../component/ThemeColor";
import axios from "../api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { useShareIntent } from "expo-share-intent";
import { usePushNotifications } from "../usePushNotifications";

const LOGIN_URL = "/users/login";

function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { expoPushToken, notification } = usePushNotifications();

  const navigation = useNavigation();

  const { hasShareIntent, shareIntent, resetShareIntent, error } =
    useShareIntent();

  useEffect(() => {
    if (hasShareIntent && !shareIntent.weburl) {
      console.log(`share intent wbUrl : ${shareIntent.webUrl}`);
      navigation.navigate("Signup");
    }

    const checkToken = async () => {
      try {
        const tokens = await AsyncStorage.getItem("Tokens");
        if (tokens) {
          navigation.navigate("Main");
        }
      } catch (error) {
        console.log(error);
      }
    };
  });

  const buttonHandler = async (e) => {
    try {
      token = expoPushToken.data;
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: id, password: password, token: token}),
        {
          withCredentials: true,
        }

      );
      const tokenInfo = response.data.result.tokenInfo;
      await AsyncStorage.setItem(
        "Tokens",
        JSON.stringify({
          accessToken: tokenInfo.accessToken,
          refreshToken: tokenInfo.refreshToken,
        })
      );
      navigation.navigate("Main");
    } catch (err) {
      if (!err.response) {
        console.log("NO SERVER RESPONSE");
      } else if (err.response?.status == 401) {
        console.log("FAILED LOGIN");
      } else {
        console.log("UNEXPECTED ERROR");
      }
    }
  };

  const signupHandler = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>LinkBrary</Text>
        <TextInput
          onChangeText={(text) => setId(text)}
          style={styles.textInput}
          placeholder="ID"
        ></TextInput>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.textInput}
          placeholder="PASSWORD"
          secureTextEntry
        ></TextInput>
        <Pressable style={styles.button} onPress={buttonHandler}>
          <Text style={styles.buttonText}>로그인</Text>
        </Pressable>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginVertical: 20,
          }}
        >
          <Pressable onPress={signupHandler}>
            <Text style={styles.signupButton}>회원가입</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 44,
    textAlign: "center",
    fontFamily: "Bebas",
    color: darkTheme.highlight,
  },
  inputContainer: {
    display: "flex",
  },
  textInput: {
    borderColor: darkTheme.outline,
    backgroundColor: darkTheme.textInputBackground,
    marginVertical: 10,
    marginHorizontal: 30,
    borderRadius: 4,
    borderWidth: 2,
    margin: "auto",
    paddingHorizontal: 6,
    fontSize: 24,
    fontFamily: "Pretendard",
  },
  mainContainer: {
    display: "flex",
    margin: "auto",
  },
  button: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: darkTheme.highlight,
    width: 350,
    alignSelf: "center",
    color: darkTheme.text,
  },
  buttonText: {
    color: darkTheme.text,
    fontWeight: "800",
    fontFamily: "Pretendard",
  },
  signupButton: {
    color: darkTheme.text,
  },
  outerContainer: {
    backgroundColor: darkTheme.background,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  divider: {
    height: 2,
    marginVertical: 30,
    marginHorizontal: 30,
    backgroundColor: "#666666",
  },
});

export default LoginPage;
