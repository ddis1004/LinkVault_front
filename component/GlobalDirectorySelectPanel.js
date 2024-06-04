import { View, Text, StyleSheet, Pressable } from "react-native";
import { React, useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { darkTheme } from "./ThemeColor";
import { Entypo } from "@expo/vector-icons";

const DIRECTORY_URL = "/directories";

function parseDirectoryString(input) {
  const lines = input.trim().split("\n");
  const root = [];
  const stack = [{ level: -1, directory: root }];

  lines.forEach((line) => {
    const match = line.match(/(\s*)\|-- (\S+) \(ID: (\d+)\)/);
    if (match) {
      const [, indent, name, id] = match;
      const level = indent.length / 4; // Each level is 4 spaces

      const node = { name, id: parseInt(id, 10), directory: [] };

      while (stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      stack[stack.length - 1].directory.push(node);
      stack.push({ level, directory: node.directory });
    }
  });

  return root;
}

const GloablDirectorySelectPanel = ({ value, onValueChange }) => {
  const axiosPrivate = useAxiosPrivate();
  const [parsedFolder, setParsedFolder] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(value);
  const test_input = `|-- 개발 (ID: 1)
    |-- 스프링 (ID: 4)
    |-- 리액트 (ID: 5)
    |-- 알고리즘 (ID: 6)
|-- 경제 (ID: 2)
    |-- 주식 (ID: 10)
|-- 음식 (ID: 3)
|-- 정치 (ID: 8)
|-- 주식 (ID: 9)`;
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axiosPrivate.get(DIRECTORY_URL);

          await setParsedFolder(parseDirectoryString(response.data));
          //console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [])
  );

  const handleFolderClick = (directory) => {
    setSelectedFolder(directory.id);
    if (onValueChange != null) onValueChange(directory);
  };

  function DirectoryView({ directories, handleFolderClick }) {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {directories.map((directory) => (
            <View key={directory.id}>
              <View
                style={[
                  styles.nameContainer,
                  selectedFolder == directory.id
                    ? styles.selectedNameContainer
                    : null,
                ]}
              >
                <Pressable
                  style={styles.nameContainer}
                  onPress={() => handleFolderClick(directory)}
                >
                  <Entypo
                    name="folder"
                    size={16}
                    color={darkTheme.highlight_low}
                  />
                  <Text style={styles.name}>{directory.name}</Text>
                </Pressable>
              </View>
              {directory.directory.length > 0 && (
                <DirectoryView
                  directories={directory.directory}
                  handleFolderClick={handleFolderClick}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.description}>폴더를 선택해주세요</Text>
      <View style={styles.directoryViewContainer}>
        <DirectoryView
          directories={parsedFolder}
          handleFolderClick={handleFolderClick}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  description: {
    fontFamily: "Pretendard",
    color: darkTheme.text,
    fontSize: 16,
    marginBottom: 10,
  },
  container: {
    height: "auto",
    paddingVertical: 5,
    paddingLeft: 20,
  },
  wrapper: {
    borderRadius: 8,
  },
  directoryViewContainer: {
    backgroundColor: darkTheme.level1,
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 5,
    padding: 0,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    width: "98%",
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontFamily: "Pretendard",
    color: darkTheme.text,
    marginLeft: 10,
    marginRight: 0,
  },
  selectedNameContainer: {
    backgroundColor: darkTheme.level2,
  },
});

export default GloablDirectorySelectPanel;
