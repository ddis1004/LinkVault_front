import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { useState } from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { darkTheme } from "../component/ThemeColor";
import NotificationItem from "../component/NotificationItem";

const dummyData = {
  list: [
    {
      id: 1,
      active: true,
      notiType: "periodic",
      targetType: "folder",
      target: {
        title: "발표 못하는 사람이 발표 잘하는 것처럼 보이는 법",
        location: ["회의", "발표"],
      },
      time: {
        period: "week",
        every: "mon",
        hour: 8,
        minute: 30,
      },
    },
    {
      id: 2,
      active: false,
      notiType: "one-time",
      targetType: "link",
      target: {
        title: "해외여행 준비하기 : 환전 팁",
        location: ["취미", "여행"],
      },
      time: {
        date: new Date(),
        hour: 9,
        minute: 0,
      },
    },
    {
      id: 3,
      active: true,
      notiType: "accumulation",
      targetType: "folder",
      target: {
        title: "",
        location: ["뉴스", "it", "ai"],
      },
      accumulation: {
        threshold: 5,
      },
    },
    {
      id: 4,
      active: true,
      notiType: "periodic",
      targetType: "folder",
      target: {
        location: ["뉴스", "건강"],
      },
      time: {
        period: "month",
        every: 13,
        hour: 18,
        minute: 0,
      },
    },
  ],
};

const NotificationPage = () => {
  const [changeId, setChangeId] = useState(-1);
  const [temp, setTemp] = useState("");

  const handleToggle = (id) => {
    setChangeId(id);
    //axios server thing
  };
  const handleChange = (id, changedData) => {
    setChangeId(id);
    setTemp(changeData.notiType);
    //axios server thing
  };
  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Header title={"알림"} />
          <Pressable style={styles.addButton}>
            <AntDesign name="plus" size={30} color={darkTheme.text} />
          </Pressable>
        </View>
        <ScrollView style={styles.notiListContainer}>
          {dummyData.list.map((item, index) => (
            <NotificationItem
              key={index}
              data={item}
              onToggle={() => handleToggle(data.id)}
              onChange={(changedData) => handleChange(data.id, changedData)}
            />
          ))}
        </ScrollView>
        <Text></Text>
      </View>
    </OuterContainer>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addButton: {
    padding: 5,
    margin: 15,
  },
  notiListContainer: {
    marginHorizontal: 15,
  },
});

export default NotificationPage;
