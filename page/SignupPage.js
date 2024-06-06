import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import OuterContainer from "../component/OuterContainer";
import { darkTheme } from "../component/ThemeColor";
import axios from "../api/axios";
import { useNavigation } from "@react-navigation/native";

const SIGNUP_URL = "/users/sign-up";

const SignupPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  // axios.interceptors.request.use((request) => {
  //   console.log("\n\n\n\n\nStarting Request", request);
  //   return request;
  // });

  const handleSignUp = async () => {
    // Perform sign-up logic here
    try {
      if (id && password && name) {
        const response = await axios.post(
          SIGNUP_URL,
          JSON.stringify({
            email: id,
            password: password,
            nickname: name,
          })
        );
        navigation.navigate("Login");
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <OuterContainer>
      <View style={styles.container}>
        <Text style={styles.title}>LinkVault</Text>
        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          value={id}
          onChangeText={setId}
          placeholder="ID"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="PASSWORD"
          secureTextEntry
        />
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="이름"
        />
        <Pressable style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>회원가입</Text>
        </Pressable>
      </View>
    </OuterContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 44,
    textAlign: "center",
    fontFamily: "Bebas",
    color: darkTheme.highlight,
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: darkTheme.highlight_low,
    fontSize: 20,
    borderRadius: 10,
    fontFamily: "Pretendard",
    backgroundColor: darkTheme.text,
  },
  button: {
    marginTop: 20,
    backgroundColor: darkTheme.highlight,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: "Pretendard",
    color: darkTheme.background,
    fontSize: 14,
  },
});

export default SignupPage;
