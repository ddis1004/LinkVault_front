import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { darkTheme } from "../component/ThemeColor";
import NotificationItem from "../component/NotificationItem";
import NotificationAddModal from "../component/NotificationAddModal";
import CenterModalContainer from "../component/CenterModalContainer";
import { useFocusEffect } from "@react-navigation/native";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import NotificationEditPanel from "../component/NotificationEditPanel";
import ConfirmCancelContainer from "../component/ConfirmCancelContainer";

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
  directory: {
    name: "메인",
    nesting: [
      {
        name: "뉴스",
        nesting: [
          { name: "IT", nesting: [] },
          { name: "경제", nesting: [] },
        ],
        link: [],
      },
      {
        name: "업무",
        nesting: [{ name: "회의", nesting: [] }],
        link: [
          { title: "회의 그거.. 어떻게 잘하는 건데?" },
          { title: "직원 회의를 효율적으로 주도하는 팁" },
        ],
      },
    ],
    link: [],
  },
};

const LINK_NOTIFICATION_URL = "/reminders/links";
const FOLDER_NOTIFICATION_URL = "/reminders/directories";
const LINK_ONOFF_URL = "/reminders/links/on-off";
const FOLDER_ONOFF_URL = "/reminders/directories/on-off";

const NotificationPage = () => {
  const [changeId, setChangeId] = useState(-1);
  const [temp, setTemp] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [addLink, setAddLink] = useState(-1);
  const [addTime, setAddTime] = useState(new Date());
  const [addDays, setAddDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [links, setLinks] = useState([]);
  const [folders, setFolders] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editNoti, setEditNoti] = useState({});
  const [changedData, setChangedData] = useState({});

  const axiosPrivate = useAxiosPrivate();

  const handleToggle = async (id, type, value) => {
    let newLink = [...links];
    let val;
    for (i in links) {
      if (links[i].id == id) {
        links[i].Onoff = !links[i].Onoff;
        val = !links[i].Onoff;
        break;
      }
    }
    setLinks(newLink);

    //setChangeId(id);
    //axios server thing
    try {
      const response = await axiosPrivate.put(
        LINK_ONOFF_URL,
        JSON.stringify({
          onoff: val,
          id: id,
        })
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleChange = (id, changedData) => {
    //setChangeId(id);
    //axios server thing
  };
  const handleNotificationDelete = (id) => {
    console.log("DELETE OF" + id);
  };

  const handleEditSubmit = () => {
    console.log(changedData);
    setEditModalVisible(false);
  };

  const setLink = (id) => {
    setAddLink(id);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response1 = await axiosPrivate.get(LINK_NOTIFICATION_URL);
          setLinks(response1.data.result);
          const response2 = await axiosPrivate.get(FOLDER_NOTIFICATION_URL);
          setFolders(response2.data.result);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [editNoti])
  );

  const getLink = (directory) => {
    return [
      { title: "회의 그거.. 어떻게 잘하는 건데?" },
      { title: "직원 회의를 효율적으로 주도하는 팁" },
    ];
  };

  const handleAddButton = () => {
    setModalVisible(true);
  };

  const handleConfirmButton = () => {};

  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <View style={styles.headerContainer}>
          <Header title={"알림"} />
          <Pressable onPress={() => handleAddButton()} style={styles.addButton}>
            <AntDesign name="plus" size={30} color={darkTheme.text} />
          </Pressable>
          <NotificationAddModal
            directory={dummyData.directory}
            visible={modalVisible}
            setInvisible={() => setModalVisible(false)}
            getLink={getLink}
            setLink={setLink}
            setTime={setAddTime}
            setDays={setAddDays}
          />
        </View>
        <ScrollView style={styles.notiListContainer}>
          {links.map((item, index) => (
            <Pressable
              onPress={() => {
                setEditModalVisible(true);
                setEditNoti(item);
              }}
            >
              <NotificationItem
                key={index}
                data={item}
                onToggle={(id, type, value) => handleToggle(id, type, value)}
              />
            </Pressable>
          ))}
          {folders.map((item, index) => {
            <Pressable
              key={item.id}
              onPress={() => {
                setEditModalVisible(true);
                setEditNoti(item);
              }}
            >
              <NotificationItem
                key={index}
                data={item}
                onToggle={(id, type, value) => handleToggle(id, type, value)}
              />
            </Pressable>;
          })}
        </ScrollView>
        <CenterModalContainer visible={editModalVisible}>
          <NotificationEditPanel
            data={editNoti}
            onSubmit={() => {
              setEditModalVisible(false);
              setEditNoti(null);
            }}
            onCancel={() => {
              setEditModalVisible(false);
              setEditNoti(null);
            }}
          />
        </CenterModalContainer>
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
