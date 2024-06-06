import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import OuterContainer from "../component/OuterContainer";
import { darkTheme } from "../component/ThemeColor";
import ReadStatusPanel from "../component/ReadStatusPanel";
import MainDirectoryPanel from "../component/MainDirectoryPanel";
import axios from "../api/axios";
import LinkViewPanel from "../component/LinkViewPanel";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const unreadLinkURL = "";
const DIRECTORY_URL = "/users/home";
const recommendationURL = "";

const dummyDataUnread = { total: 3, read: 1 };

const dummyDataDirectory = [
  { name: "메인", count: 3, route: "/" },
  { name: "디자인", count: 5, route: "/design" },
  { name: "스포츠", count: 6, route: "/sports" },
];
const dummyDataRecommendation = {
  id: 3,
  site: "국민일보",
  date: "2024.05.17. 오전 5:15 ",
  siteLogo:
    "https://blog.kakaocdn.net/dn/JmEua/btqFANOIdw0/K9ReBIumBHhmsAxtexSbh1/img.png",
  title: "푸바오 근황",
  summary: [
    "푸바오가 격리 생활 종료를 앞두고 단체생활 적응을 시작했다.",
    "중국판다보호연구센터는 푸바오가 냄새와 소리로 다른 판다들과 교류하며 단체생활에 점차 적응하고 있다고 밝혔다.",
    "푸바오는 오전 활동량이 많고 대나무 먹는 것을 특히 좋아하며 활동과 휴식 등 전체적인 생활이 규칙적인 편이다.",
  ],
  note: "푸바오 근황",
  image:
    "https://imgnews.pstatic.net/image/005/2024/05/17/2024051705070050467_1715890020_0020107119_20240517062303621.jpg?type=w647",
};

function MainPage() {
  const [directoryData, setDirectoryData] = useState([]);
  const [recommendation, setRecommendation] = useState({});
  const [response, setResponse] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axiosPrivate.get(DIRECTORY_URL);
          setResponse(response.data.result);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [])
  );

  return (
    <OuterContainer>
      <ScrollView style={styles.innerContainer}>
        <View style={styles.topBar}>
          <Text style={styles.title}>LinkBrary</Text>
        </View>
        <Pressable>
          <View style={styles.notificationContainer}>
            <ReadStatusPanel
              total={response.totalLinks}
              read={response.readLinks}
            />
          </View>
        </Pressable>
        {response.directories != null && (
          <View>
            <Text style={styles.directoryTitle}>내 디렉토리</Text>
            <View style={styles.directoryContainer}>
              {response.directories.length > 0 ? (
                <MainDirectoryPanel directory={response.directories} />
              ) : (
                <View>
                  <Text>디렉토리가 없습니다. 링크를 저장해보세요</Text>
                </View>
              )}
            </View>
          </View>
        )}
        {response.recommendedLink != null && (
          <View style={styles.recommendationContainer}>
            <Text style={styles.directoryTitle}>이런 링크는 어떠세요?</Text>
            {response.recommendedLink.map((item) => (
              <LinkViewPanel link={item} key={item.id} />
            ))}
          </View>
        )}
      </ScrollView>
    </OuterContainer>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontFamily: "Bebas",
    fontSize: 38,
    color: darkTheme.highlight,
  },
  topBar: {
    height: 54,
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 5,
    fontWeight: 1000,
  },
  notificationContainer: {
    borderRadius: 10,
    padding: 0,
    marginHorizontal: 10,
    marginVertical: 5,
    height: 160,
  },
  directoryTitle: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
    marginHorizontal: 10,
    marginTop: 20,
    fontSize: 20,
  },
  directoryContainer: {
    height: "auto",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  recommendationContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default MainPage;
