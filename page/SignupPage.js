import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const SignupPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = () => {
    // Perform sign-up logic here
    if (id && password && name) {
      // Simulate sign-up success
      alert(`Sign-up successful! Welcome, ${name}!`);
      // Clear input fields after sign-up
      setId("");
      setPassword("");
      setName("");
    } else {
      // Show error message if any field is empty
      alert("Please fill out all fields.");
    }
  };

  return (
    <View style={styles.container}>
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
        placeholder="password"
        secureTextEntry
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="이름"
      />
      <Button title="회원가입" style={styles.button} onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  label: {
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#215cff",
  },
});

export default SignupPage;
