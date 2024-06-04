import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { darkTheme } from "./ThemeColor";

const ConfirmCancelContainer = ({
  onCancel,
  onConfirm,
  cancelVisible = false,
}) => {
  return (
    <View style={styles.container}>
      {cancelVisible && (
        <Pressable style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>취소</Text>
        </Pressable>
      )}
      <Pressable style={styles.button} onPress={onConfirm}>
        <Text style={styles.buttonText}>확인</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  button: {
    padding: 10,
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    color: darkTheme.text,
    fontSize: 14,
  },
});

export default ConfirmCancelContainer;
