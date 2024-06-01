import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { React, useState } from "react";
import { darkTheme } from "./ThemeColor";
import DirectoryPanel from "./DirectoryView";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

const TimeSelectPanel = ({ setTime, setDays }) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [time, setTimeView] = useState(new Date());
  const [activeDays, setActiveDays] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const daysText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      //paddingVertical: 30,
    },
    label: {
      fontFamily: "Pretendard",
      fontSize: 18,
      color: darkTheme.text,
      marginTop: 10,
      marginBottom: 20,
    },
    timeContainer: {
      marginBottom: 20,
    },
    timeText: {
      fontFamily: "Pretendard",
      fontSize: 30,
      color: darkTheme.text,
      alignSelf: "center",
    },
    dayContainer: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
    dayText: {
      fontFamily: "Pretendard",
      fontSize: 14,
      color: darkTheme.text,
      alignSelf: "center",
    },
    activeDay: {
      fontFamily: "Pretendard",
      fontSize: 14,
      color: darkTheme.highlight_low,
      alignSelf: "center",
    },
  });
  const toggleDay = (index) => {
    const newDays = [...activeDays];
    newDays[index] = !newDays[index];
    setActiveDays(newDays);
    setDays(newDays);
  };
  const timeChange = (event, selectedTime) => {
    setPickerOpen(false);
    setTimeView(selectedTime);
    setTime(selectedTime);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>시간 설정</Text>
      <Pressable
        style={styles.timeContainer}
        onPress={() => setPickerOpen(true)}
      >
        <Text
          style={styles.timeText}
        >{`${time.getHours()}  :  ${time.getMinutes()}`}</Text>
      </Pressable>
      <View style={styles.dayContainer}>
        {daysText.map((day, index) => (
          <Pressable key={index} onPress={() => toggleDay(index)}>
            <Text style={activeDays[index] ? styles.activeDay : styles.dayText}>
              {day}
            </Text>
          </Pressable>
        ))}
      </View>
      {pickerOpen && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          display="spinner"
          mode={"time"}
          is24Hour={true}
          onChange={timeChange}
        />
      )}
    </View>
  );
};

const LinkSelectPanel = ({ links, handleLinkClick }) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: "Pretendard",
      fontSize: 16,
      color: darkTheme.text,
      marginBottom: 30,
      marginLeft: 10,
    },
    container: {
      marginBottom: 20,
    },
    pressable: {
      flexDirection: "row",
    },
  });

  if (!links) {
    return (
      <View style={styles.container}>
        <Text style={[styles.text, { alignSelf: "center" }]}>
          디렉토리가 비었습니다.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {links.map((item, index) => (
        <Pressable
          style={styles.pressable}
          key={index}
          onPress={() => handleLinkClick(item.title)}
        >
          <Entypo name="link" size={20} color="#BBE1FA" />
          <Text style={styles.text}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const NotificationAddModal = ({
  directory,
  setLink,
  setTime,
  setDays,
  visible,
  setInvisible,
  getLink,
}) => {
  const [step, setStep] = useState("directory");
  const [links, setLinks] = useState([]);

  const handleCancel = () => {
    setStep("directory");
    setInvisible();
  };

  const handleDirectoryClick = (name) => {
    const linkList = getLink(name);
    setLinks(linkList);
    setStep("link");
  };

  const handleLinkClick = (id) => {
    setStep("time");
    setLink(id);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {step == "directory" ? (
            <DirectoryPanel
              directories={directory}
              handleFolderClick={handleDirectoryClick}
            />
          ) : step == "link" ? (
            <LinkSelectPanel links={links} handleLinkClick={handleLinkClick} />
          ) : (
            <TimeSelectPanel setTime={setTime} setDays={setDays} />
          )}

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.closeButton}
              onPress={() => handleCancel()}
            >
              <Text style={styles.buttonText}>취소</Text>
            </Pressable>
            {step == "time" && (
              <Pressable style={styles.closeButton}>
                <Text style={styles.buttonText}>확인</Text>
              </Pressable>
            )}
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
  buttonContainer: {
    flexDirection: "row",
  },
  closeButton: {
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
  },
});

export default NotificationAddModal;
