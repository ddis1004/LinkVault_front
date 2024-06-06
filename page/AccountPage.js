import { View, Text, StyleSheet, Pressable, Modal, Switch } from "react-native";
import { React, useState, useCallback } from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import { darkTheme } from "../component/ThemeColor";
import { useFocusEffect } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Provider, Menu, IconButton } from "react-native-paper";

const SETTINGS_URL = "/reminders/users";

const dummyData = {
  unreadCount: 1,
  unreadTime: 1,
  countAlertActive: false,
  timeAlertActive: false,
};

const AccountPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("");
  const [unreadCount, setUnreadCount] = useState(1);
  const [unreadTime, setUnreadTime] = useState(1);
  const [countAlertActive, setCountAlertActive] = useState(false);
  const [timeAlertActive, setTimeAlertActive] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axiosPrivate.get(SETTINGS_URL);
          console.log(response.data);
        } catch (err) {
          console.log(err.response);
        }
      };
      fetchData();
    }, [])
  );

  const handleOpenModal = (mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleMove = () => {
    // Handle move action
    closeMenu();
  };

  const handleDelete = () => {
    // Handle delete action
    closeMenu();
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSubmitChange = () => {
    const data = {
      unreadTimeAlert: timeAlertActive,
      unreadAlertTime: `${unreadTime}:00`,
      unreadFolderAlertCount: unreadCount,
      unreadFolderAlert: countAlertActive,
    };
    //console.log(data);
    setTest(1);
    try {
      const response = axiosPrivate.put(SETTINGS_URL, data);
      console.log(response);
    } catch (err) {
      //console.log(err);
    }
  };

  const handleToggle = (mode) => {
    if (mode == "count") {
      setCountAlertActive((previousState) => !previousState);
    } else {
      setTimeAlertActive((previousState) => !previousState);
    }
    handleSubmitChange();
  };

  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <Header title={"내 정보"}></Header>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingLabel}>알림 설정</Text>
          <View style={styles.settingContainer}>
            <Pressable onPress={() => handleOpenModal("count")}>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>미열람 링크 누적 알림</Text>
                <Text style={styles.settingText}>
                  {`읽지 않은 링크가 ${dummyData.unreadCount}개 쌓이면 알림`}
                </Text>
              </View>
            </Pressable>
            <Switch
              trackColor={{
                false: darkTheme.level2,
                true: "#9B6E25",
              }}
              thumbColor={countAlertActive ? darkTheme.highlight : "#f4f3f4"}
              onValueChange={() => handleToggle("count")}
              value={countAlertActive}
            />
          </View>
          <View style={styles.settingContainer}>
            <Pressable onPress={() => handleOpenModal("time")}>
              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>미열람 링크 시간 알림</Text>
                <Text style={styles.settingText}>
                  {`저장한 후 ${dummyData.unreadCount}시간이 지난 링크 알림`}
                </Text>
              </View>
            </Pressable>
            <Switch
              trackColor={{
                false: darkTheme.level2,
                true: "#9B6E25",
              }}
              thumbColor={timeAlertActive ? darkTheme.highlight : "#f4f3f4"}
              onValueChange={() => handleToggle("time")}
              value={timeAlertActive}
            />
          </View>
        </View>
        <SettingModal
          mode={modalMode}
          visible={modalOpen}
          setVisible={setModalOpen}
          currentValue={10}
          setValue={modalMode == "count" ? setUnreadCount : setUnreadTime}
          value={modalMode == "count" ? unreadCount : unreadTime}
          submit={handleSubmitChange}
        />
      </View>
    </OuterContainer>
  );
};

const SettingModal = ({
  visible,
  setVisible,
  mode,
  value,
  setValue,
  submit,
}) => {
  const styles = StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
      width: "90%",
      height: "30%",
      backgroundColor: darkTheme.level1,
      justifyContent: "space-around",
      padding: 10,
      borderRadius: 15,
    },
    description: {
      color: darkTheme.text,
      fontSize: 20,
      alignSelf: "center",
      textAlignVertical: "center",
      flex: 1,
    },
    controlButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      flex: 1,
    },
    controlButton: {
      paddingHorizontal: 15,
      marginTop: 20,
      marginRight: 5,
      marginLeft: 15,
      borderRadius: 10,
      justifyContent: "center",
    },
    sliderContainer: {
      flex: 1,
    },
    buttonText: {
      fontFamily: "Pretendard",
      color: darkTheme.text,
      fontSize: 20,
      alignSelf: "center",
    },
  });

  const handleSubmit = () => {
    setVisible(false);
    submit();
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modal}>
        <View style={styles.modalView}>
          <Text style={styles.description}>
            {mode == "count"
              ? `읽지 않은 링크가 ${value}개 쌓이면 알림`
              : `저장한 후 ${value}시간이 지난 링크 알림`}
          </Text>
          <View style={styles.sliderContainer}>
            {mode == "count" ? (
              <Slider
                style={{ marginTop: 30 }}
                minimumValue={1}
                maximumValue={50}
                step={1}
                value={value}
                onValueChange={(value) => setValue(value)}
                maximumTrackTintColor={darkTheme.text}
                minimumTrackTintColor={darkTheme.highlight_low}
                thumbTintColor={darkTheme.highlight}
              />
            ) : (
              <Slider
                style={{ marginTop: 30 }}
                minimumValue={1}
                maximumValue={24}
                step={1}
                value={value}
                onValueChange={(value) => setValue(value)}
                maximumTrackTintColor={darkTheme.text}
                minimumTrackTintColor={darkTheme.highlight_low}
                thumbTintColor={darkTheme.highlight}
              />
            )}
          </View>

          <View style={styles.controlButtonContainer}>
            <Pressable
              style={styles.controlButton}
              onPress={() => handleCancel()}
            >
              <Text style={styles.buttonText}>취소</Text>
            </Pressable>
            <Pressable
              style={[
                styles.controlButton,
                { backgroundColor: darkTheme.highlight_low },
              ]}
              onPress={() => handleSubmit()}
            >
              <Text style={[styles.buttonText, { color: darkTheme.level1 }]}>
                확인
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingTextContainer: {
    margin: 15,
  },
  settingItem: {
    marginVertical: 10,
  },
  settingLabel: {
    fontFamily: "Pretendard",
    color: darkTheme.text,
    fontSize: 20,
  },
  settingText: {
    fontFamily: "Pretendard",
    color: darkTheme.text,
    fontSize: 15,
  },
});

export default AccountPage;
