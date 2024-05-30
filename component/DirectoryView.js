import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function DirectoryView({ directories }) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {directories.map((directory, index) => (
          <View key={index}>
            <View style={styles.nameContainer}>
              <Ionicons name="folder-sharp" size={20} />
              <Text style={styles.name}>{directory.name}</Text>
            </View>
            {directory.inner.length > 0 && (
              <DirectoryView directories={directory.inner} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "auto",
    padding: 10,
  },
  wrapper: {
    backgroundColor: "#999999",
    padding: 10,
    borderRadius: 8,
  },
  nameContainer: {
    flexDirection: "row",
  },
  name: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default DirectoryView;
