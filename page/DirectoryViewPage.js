import { View, Text, StyleSheet, ScrollView } from "react-native";
import { React, useState, useCallback } from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { darkTheme } from "../component/ThemeColor";
import { Image } from "expo-image";
import LinkViewPanel from "../component/LinkViewPanel";
import { useFocusEffect } from "@react-navigation/native";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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

const DirectoryViewPage = ({ route }) => {
  const [response, setResponse] = useState({});
  const [links, setLinks] = useState([]);
  const [parentName, setParentName] = useState("");
  const [currentDirectory, setCurrentDirectory] = useState("");
  const directory = route.params.directory;
  const axiosPrivate = useAxiosPrivate();

  const DIRECTORY_URL = "/directories/" + route.params.directory;

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

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

  return (
    <OuterContainer>
      <ScrollView>
        <Header title={"내 저장 폴더"} />
        <Heirarchy hierarchy={[parentName, currentDirectory]} />
        {response.childFoldersName != null && (
          <View>
            <View style={styles.category}>
              <Text style={styles.categoryTitle}>폴더</Text>
            </View>
            {response.childFoldersName.length > 0 ? (
              <View>
                <View style={styles.gridContainer}>
                  <View style={styles.columnContainer}>
                    <GridColumn col={0} folders={response.childFoldersName} />
                  </View>
                  <View style={styles.columnContainer}>
                    <GridColumn col={1} folders={response.childFoldersName} />
                  </View>
                  <View style={styles.columnContainer}>
                    <GridColumn col={2} folders={response.childFoldersName} />
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

        <View style={styles.category}>
          <Text style={styles.categoryTitle}>링크</Text>
        </View>
        <View>
          {links != null &&
            links.map((item, index) => (
              <LinkViewPanel key={item.id} link={item} />
            ))}
        </View>
      </ScrollView>
    </OuterContainer>
  );
};

export default DirectoryViewPage;

const FolderItem = ({ folder }) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      margin: 5,
    },
    image: { width: 110, height: 80, borderRadius: 10, alignSelf: "center" },
    folderName: { color: darkTheme.text, alignSelf: "center" },
  });
  return (
    <View style={styles.container}>
      <Pressable>
        <Image style={styles.image} source={{ uri: folder.sampleImage }} />
        <Text style={styles.folderName}>{folder.name}</Text>
      </Pressable>
    </View>
  );
};

const GridColumn = ({ col, folders }) => {
  return (
    <View>
      {folders.map((item, index) => {
        if (index % 3 == col) {
          return <FolderItem key={item.link} folder={item} />;
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
        <View style={styles.mapContainer} key={item.path}>
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
  category: {
    height: 40,
    marginTop: 20,
    padding: 5,
    paddingLeft: 10,
  },
  categoryTitle: {
    fontSize: 20,
    color: darkTheme.text,
    fontFamily: "Pretendard",
  },
});
