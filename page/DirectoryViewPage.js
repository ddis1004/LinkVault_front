import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import { React, useState, useCallback, useEffect } from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { darkTheme } from "../component/ThemeColor";
import { Image } from "expo-image";
import LinkViewPanel from "../component/LinkViewPanel";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddFolderModal from "../component/AddFolderModal";
import { Entypo } from "@expo/vector-icons";
import BottomModal from "../component/BottomModal";
import ConfirmCancelContainer from "../component/ConfirmCancelContainer";
import CenterModalContainer from "../component/CenterModalContainer";
import GloablDirectorySelectPanel from "../component/GlobalDirectorySelectPanel";
import * as Linking from "expo-linking";

const dummyData = {
  hierarchy: [
    { name: "뉴스", path: "/news" },
    { name: "과학", path: "/news/science" },
  ],
  folders: [
    {
      name: "IT",
      sampleImage:
        "https://imgnews.pstatic.net/image/119/2024/05/17/0002830612_001_20240517060115869.jpeg?type=w647",
      link: "/it",
    },
    {
      name: "전자기기",
      sampleImage:
        "https://imgnews.pstatic.net/image/011/2024/05/16/0004341532_001_20240516220935121.png?type=w647",
      link: "/devices",
    },
    {
      name: "바이오",
      sampleImage:
        "https://imgnews.pstatic.net/image/023/2024/05/17/0003834686_001_20240517031410682.jpg?type=w647",
      link: "/bio",
    },
    {
      name: "우주",
      sampleImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5pmwwN7AY7U8mLaa3CMj5Xp008QBfL9B6pJ9kK_STEA&s",
      link: "/space",
    },
  ],
  links: [
    {
      id: 2,
      site: "네이버뉴스",
      date: "2024.05.16. 오후 5:50",
      siteLogo: "https://cdn.edit.or.kr/news/photo/202304/10564_10809_36.jpg",
      title: "출연연 지출한도 전년동일",
      summary: [
        "내년 R&D 지출한도가 전년과 동일하게 설정되어, 증액이 어려울 것으로 보인다.",
        "올해의 정부 예산 축소 영향이 계속될 것으로 예상된다",
        "과학기술계에서는 이번 결정이 논란이 되고 있다",
      ],
      note: "R&D 예산 삭감 관련기사",
      image:
        "https://imgnews.pstatic.net/image/018/2024/05/16/0005741076_001_20240516203401057.jpg?type=w647",
    },
    {
      id: 1,
      site: "조선일보",
      date: "2024.05.16. 오후 5:26",
      siteLogo:
        "https://play-lh.googleusercontent.com/wfUX6_I4zpw4D6k7N4SI2FNq9yiYL8y1qwCUv3oJOfIvyMxHqe6b3zBuJuTLKa43Sz6o",
      title: "유료방송 조사 이래 첫 감소",
      summary: [
        "2023년 하반기 유료방송 가입자는 3631만명으로 감소했다.",
        "IPTV는 늘었지만, 케이블과 위성 방송은 줄었다",
        "SK브로드밴드는 기술 중립 서비스로 가입자를 늘렸다.",
      ],
      note: "넷플릭스관련",
    },
  ],
};

const UPDATE_LOCATION_URL = "/links/update-location";
const FOLDER_RENAME_URL = "/directories/names";

const DirectoryViewPage = ({ route }) => {
  const [response, setResponse] = useState({});
  const [links, setLinks] = useState([]);
  const [parentName, setParentName] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("");
  const directory = route.params.directory;
  const axiosPrivate = useAxiosPrivate();
  const [addFolderModalVisible, setAddFolderModalVisible] = useState(false);
  const [linkModalVisible, setLinkModalVisible] = useState(false);
  const [folderModalVisible, setFolderModalVisible] = useState(false);
  const [controlLink, setControlLink] = useState({});
  const [controlFodler, setControlFolder] = useState({});
  const [linkMoveFolder, setLinkMoveFolder] = useState({});
  const [folderSelectModalVisible, setFolderSelectModalVisible] =
    useState(false);
  const [renameFolder, setRenameFolder] = useState("");
  const [renameFolderModalVisible, setRenameFolderModalVisible] =
    useState(false);

  const navigation = useNavigation();

  const DIRECTORY_URL = "/directories/" + route.params.directory;
  const DELETE_LINK_URL_PREFIX = "/links/users/";

  // useFocusEffect(
  //   useCallback(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axiosPrivate.get(DIRECTORY_URL);
  //         setLinks(response.data.result.userLinks);
  //         setResponse(response.data.result);
  //         setCurrentDirectory(response.data.result.directoryName);
  //       } catch (err) {
  //         console.log(err.response);
  //       }
  //     };
  //     fetchData();
  //   }, [directory, controlLink, controlFodler])
  // );

  const openLink = (link) => {
    //const url = "https://www.example.com";
    console.log(link.url);
    Linking.openURL(link.url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(DIRECTORY_URL);
        setLinks(response.data.result.userLinks);
        setResponse(response.data.result);
        setCurrentDirectory(response.data.result.directoryName);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchData();
  }, [directory, controlLink, controlFodler]);

  useFocusEffect(
    useCallback(() => {
      if (response.parentFolderId != null) {
        const PARENT_URL = "/directories/" + response.parentFolderId;
        const fetchData = async () => {
          try {
            const response = await axiosPrivate.get(PARENT_URL);
            setParentName(response.data.result.directoryName);
          } catch (err) {
            console.log(err.response);
          }
        };
        fetchData();
      }
    }, [])
  );

  const openAddFolderModal = () => {
    setAddFolderModalVisible(true);
  };

  const handleLinkLongPress = (link) => {
    setControlLink(link);
    setLinkModalVisible(true);
  };

  const handleFolderPress = (folder) => {
    console.log(folder);
    navigation.navigate("Directory", { directory: folder.directoryId });
    setControlFolder(folder);
  };

  const handleFolderLongPress = (folder) => {
    setControlFolder(folder);
    setFolderModalVisible(true);
  };

  const handleDeleteLink = async (link) => {
    try {
      const deleteURL = DELETE_LINK_URL_PREFIX + link.id;
      await axiosPrivate.delete(deleteURL);
      setLinks(links.filter((l) => l.id !== link.id));
    } catch (error) {
      console.log(error.response);
    }
    setControlLink(-1);
    setLinkModalVisible(false);
  };

  const handleLinkMove = (link) => {
    setFolderSelectModalVisible(true);
  };

  const handleLinkMoveSubmit = async () => {
    setLinkModalVisible(false);
    const message = {
      linkId: controlLink.id,
      movingDirectoryId: linkMoveFolder.id,
    };

    try {
      const response = await axiosPrivate.put(
        UPDATE_LOCATION_URL,
        JSON.stringify(message)
      );

      const updatedDirectoryResponse = await axiosPrivate.get(DIRECTORY_URL);
      setLinks(updatedDirectoryResponse.data.result.userLinks);
      setResponse(updatedDirectoryResponse.data.result);
      setCurrentDirectory(updatedDirectoryResponse.data.result.directoryName);
    } catch (error) {
      console.log(error.response);
    }
    setFolderSelectModalVisible(false);
  };

  const handleRenameFolderConfirm = async () => {
    const message = {
      id: controlFodler.directoryId,
      name: renameFolder,
    };

    try {
      const response = await axiosPrivate.patch(
        FOLDER_RENAME_URL,
        JSON.stringify(message)
      );
      const updatedDirectoryResponse = await axiosPrivate.get(DIRECTORY_URL);
      setLinks(updatedDirectoryResponse.data.result.userLinks);
      setResponse(updatedDirectoryResponse.data.result);
      setCurrentDirectory(updatedDirectoryResponse.data.result.directoryName);
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
    setRenameFolderModalVisible(false);
  };

  return (
    <OuterContainer>
      <ScrollView>
        <Header title={"내 저장 폴더"} />
        <Heirarchy hierarchy={[parentName, currentDirectory]} />
        {response.childFoldersName != null && (
          <View>
            <View style={styles.categoryLabelContainer}>
              <View style={styles.category}>
                <Text style={styles.categoryTitle}>폴더</Text>
              </View>
              <Pressable
                style={styles.addFolderButton}
                onPress={() => setAddFolderModalVisible(true)}
              >
                <AntDesign name="plus" size={24} color={darkTheme.text} />
              </Pressable>
            </View>
            <AddFolderModal
              visible={addFolderModalVisible}
              setInvisible={() => setAddFolderModalVisible(false)}
              currentFolder={route.params.directory}
            />
            {response.childFoldersName.length > 0 ? (
              <View>
                <View style={styles.gridContainer}>
                  <View style={styles.columnContainer}>
                    <GridColumn
                      col={0}
                      folders={response.childFoldersName}
                      onPressItem={handleFolderPress}
                      onLongPressItem={handleFolderLongPress}
                    />
                  </View>
                  <View style={styles.columnContainer}>
                    <GridColumn
                      col={1}
                      folders={response.childFoldersName}
                      onPressItem={handleFolderPress}
                      onLongPressItem={handleFolderLongPress}
                    />
                  </View>
                  <View style={styles.columnContainer}>
                    <GridColumn
                      col={2}
                      folders={response.childFoldersName}
                      onPressItem={handleFolderPress}
                      onLongPressItem={handleFolderLongPress}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <Text style={[styles.categoryTitle, { alignSelf: "center" }]}>
                  폴더가 없습니다
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.categoryLabelContainer}>
          <View style={styles.category}>
            <Text style={styles.categoryTitle}>링크</Text>
          </View>
        </View>

        <View>
          {links != null &&
            links.map((item, index) => (
              <LinkViewPanel
                key={item.id}
                link={item}
                onLongPress={handleLinkLongPress}
              />
            ))}
        </View>
      </ScrollView>
      <BottomModal visible={linkModalVisible}>
        <View style={styles.folderModalLabel}>
          <Entypo
            name="link"
            size={24}
            color={"#BBE1FA"}
            style={{ marginLeft: -24 }}
          />
          <Text
            style={[styles.linkButtonText, { maxWidth: 400 }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {controlLink.title}
          </Text>
        </View>
        <Pressable
          style={styles.linkControlButton}
          onPress={() => openLink(controlLink)}
        >
          <Text style={styles.linkButtonText}>링크 확인</Text>
        </Pressable>
        <Pressable
          style={styles.linkControlButton}
          onPress={() => handleLinkMove(controlLink)}
        >
          <Text style={styles.linkButtonText}>폴더 이동</Text>
        </Pressable>
        <Pressable
          style={styles.linkControlButton}
          onPress={() => handleDeleteLink(controlLink)}
        >
          <Text style={[styles.linkButtonText, { color: "#B80000" }]}>
            삭제
          </Text>
        </Pressable>
        <ConfirmCancelContainer
          cancelVisible={true}
          confirmVisible={false}
          onCancel={() => setLinkModalVisible(false)}
        />
      </BottomModal>
      <BottomModal visible={folderModalVisible}>
        <View style={styles.folderModalLabel}>
          <Entypo
            name="folder"
            size={24}
            color={darkTheme.highlight}
            style={{ marginLeft: -24 }}
          />
          <Text style={[styles.linkButtonText, { marginLeft: 5 }]}>
            {controlFodler.directoryName}
          </Text>
        </View>

        <Pressable style={styles.linkControlButton}>
          <Text
            style={styles.linkButtonText}
            onPress={() => {
              setRenameFolderModalVisible(true);
              setFolderModalVisible(false);
            }}
          >
            이름 변경
          </Text>
        </Pressable>
        <Pressable style={styles.linkControlButton}>
          <Text style={[styles.linkButtonText, { color: "#B80000" }]}>
            삭제
          </Text>
        </Pressable>
        <ConfirmCancelContainer
          cancelVisible={true}
          confirmVisible={false}
          onCancel={() => setFolderModalVisible(false)}
          onConfirm={() => setFolderModalVisible(false)}
        />
      </BottomModal>
      <CenterModalContainer visible={folderSelectModalVisible}>
        <GloablDirectorySelectPanel
          onValueChange={(folder) => setLinkMoveFolder(folder)}
        />
        <ConfirmCancelContainer
          cancelVisible={true}
          confirmVisible={true}
          onCancel={() => setFolderSelectModalVisible(false)}
          onConfirm={() => handleLinkMoveSubmit(linkMoveFolder)}
        />
      </CenterModalContainer>
      <CenterModalContainer visible={renameFolderModalVisible}>
        <Text style={[styles.linkButtonText, { marginBottom: 10 }]}>
          폴더의 새 이름을 입력해주세요
        </Text>
        <TextInput
          style={styles.folderRenameInput}
          onChangeText={(text) => setRenameFolder(text)}
        />
        <ConfirmCancelContainer
          cancelVisible={true}
          onCancel={() => setRenameFolderModalVisible(false)}
          onConfirm={() => handleRenameFolderConfirm()}
        />
      </CenterModalContainer>
    </OuterContainer>
  );
};

export default DirectoryViewPage;

const FolderItem = ({ folder, onPress, onLongPress }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      margin: 5,
    },
    image: {
      width: 110,
      height: 80,
      borderRadius: 10,
      alignSelf: "center",
      alignItems: "center",
    },
    folderName: { color: darkTheme.text, alignSelf: "center" },
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => onPress(folder)}
        onLongPress={() => onLongPress(folder)}
      >
        {folder.sampleImage ? (
          <Image style={styles.image} source={{ uri: folder.sampleImage }} />
        ) : (
          <View style={styles.image}>
            <Entypo name="folder" size={80} color={darkTheme.text} />
          </View>
        )}
        <Text style={styles.folderName}>{folder.directoryName}</Text>
      </Pressable>
    </View>
  );
};

const GridColumn = ({ col, folders, onPressItem, onLongPressItem }) => {
  return (
    <View>
      {folders.map((item, index) => {
        if (index % 3 == col) {
          return (
            <FolderItem
              key={item.id}
              folder={item}
              onPress={onPressItem}
              onLongPress={onLongPressItem}
            />
          );
        } else {
          return null;
        }
      })}
    </View>
  );
};

const Heirarchy = ({ hierarchy }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingLeft: 14,
      paddingBottom: 10,
      borderBottomColor: darkTheme.level2,
      borderBottomWidth: 2,
    },
    mapContainer: {
      flexDirection: "row",
    },
    folderText: {
      fontSize: 14,
      fontFamily: "Pretendard",
      color: darkTheme.text,
    },
  });

  return (
    <View style={styles.container}>
      {hierarchy.map((item, index) => (
        <View style={styles.mapContainer} key={item.id}>
          <MaterialCommunityIcons
            name="folder-open"
            size={20}
            color={darkTheme.text}
          />
          <Text style={styles.folderText}> {item} </Text>
          {index < hierarchy.length - 1 && (
            <Text style={styles.folderText}>{" >   "}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontFamily: "Pretendard",
    fontSize: 30,
  },
  gridContainer: {
    flexDirection: "row",
  },
  columnContainer: {
    flex: 1,
  },
  categoryLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  addFolderButton: {
    flexDirection: "column",
    justifyContent: "center",
  },
  category: {
    height: 40,
    padding: 5,
    paddingLeft: 10,
    height: "100%",
  },
  categoryTitle: {
    fontSize: 20,
    color: darkTheme.text,
    fontFamily: "Pretendard",
  },
  linkControlButton: {
    marginVertical: 10,
    alignItems: "center",
  },
  linkButtonText: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
    fontSize: 18,
    marginVertical: 2,
    alignSelf: "center",
    textAlign: "center",
  },
  folderModalLabel: {
    paddingHorizontal: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  folderRenameInput: {
    backgroundColor: darkTheme.text,
    fontSize: 20,
    color: darkTheme.background,
    textAlign: "center",
    fontFamily: "Pretendard",
    borderRadius: 5,
    height: 30,
    marginBottom: 30,
  },
});
