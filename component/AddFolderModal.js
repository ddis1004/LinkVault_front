import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { darkTheme } from "./ThemeColor";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ADD_FOLDER_URL = "/directories";

const AddFolderModal = ({ visible, currentFolder, setInvisible }) => {
  const [folderName, setFolderName] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const handleConfirm = async () => {
    if (folderName != "") {
      try {
        const response = await axiosPrivate.post(
          ADD_FOLDER_URL,
          JSON.stringify({
            parentFolderId: currentFolder,
            directoryName: folderName,
          })
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }

    setInvisible();
  };
  const handleCancel = () => {
    setInvisible();
  };
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.label}>폴더 추가</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="폴더 이름"
            onChangeText={(text) => setFolderName(text)}
          ></TextInput>
          <View style={styles.controlButtonContainer}>
            <Pressable
              style={styles.controlButton}
              onPress={() => handleCancel()}
            >
              <Text style={styles.buttonText}>취소</Text>
            </Pressable>
            <Pressable
              style={styles.controlButton}
              onPress={() => handleConfirm()}
            >
              <Text style={styles.buttonText}>확인</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    padding: 20,
    backgroundColor: darkTheme.level2,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  controlButtonContainer: {
    flexDirection: "row",
    height: 50,
    marginTop: 10,
  },
  label: {
    fontFamily: "Pretendard",
    fontSize: 24,
    color: darkTheme.text,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  nameInput: {
    fontSize: 20,
    width: "95%",
    height: 50,
    backgroundColor: darkTheme.level1,
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    color: darkTheme.text,
  },
  controlButton: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Pretendard",
    fontSize: 16,
    color: darkTheme.text,
  },
});

export default AddFolderModal;
