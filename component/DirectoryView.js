import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { darkTheme } from "./ThemeColor";

const DirectoryPanel = ({ directories, handleFolderClick }) => {
  return (
    <View>
      <Text style={[styles.name, { marginBottom: 4 }]}>
        링크를 선택해주세요
      </Text>
      <DirectoryView
        directories={directories}
        handleFolderClick={handleFolderClick}
      />
    </View>
  );
};

function DirectoryView({ directories, handleFolderClick }) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {directories.nesting.map((directory, index) => (
          <View key={index}>
            <View style={styles.nameContainer}>
              <Pressable
                style={styles.nameContainer}
                onPress={() => handleFolderClick(directory.name)}
              >
                <Entypo
                  name="folder"
                  size={16}
                  color={darkTheme.highlight_low}
                />
                <Text style={styles.name}>{directory.name}</Text>
              </Pressable>
            </View>
            {directories.nesting.length > 0 && (
              <DirectoryView
                directories={directories.nesting[0]}
                handleFolderClick={handleFolderClick}
              />
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
    paddingVertical: 5,
    paddingLeft: 20,
  },
  wrapper: {
    backgroundColor: darkTheme.level2,
    borderRadius: 8,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "Pretendard",
    color: darkTheme.text,
    marginLeft: 10,
  },
});

export default DirectoryPanel;
