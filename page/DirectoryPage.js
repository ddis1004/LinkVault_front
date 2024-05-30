import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DirectoryView from "../component/DirectoryView";

function DirectoryPage() {
  const directoryJSON = `[
      {
        "name": "요리",
        "inner": [
          {
            "name": "한식",
            "inner": []
          },
          {
            "name": "일식",
            "inner": []
          }
        ]
      },
      {
        "name": "개발",
        "inner": [
          {
            "name": "프론트엔드",
            "inner": []
          },
          {
            "name": "백엔드",
            "inner": []
          }
        ]
      }
    ]`;

  const directory = JSON.parse(directoryJSON);
  //   const directory = [
  //     { name: "aaag", inner: [] },
  //     { name: "hello", inner: [] },
  //   ];
  return (
    <View style={styles.outerContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>User의 디렉토리</Text>
      </View>
      <View style={styles.content}>
        <DirectoryView directories={directory} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingVertical: 10, paddingHorizontal: 10 },
  title: { fontSize: 20, paddingHorizontal: 8 },
  outerContainer: {
    backgroundColor: "white",
    flexDirection: "column",
    flex: 1,
  },
  content: { backgroundColor: "white", flex: 0 },
});

export default DirectoryPage;
