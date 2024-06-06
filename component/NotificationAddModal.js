import { View, Text, Modal, StyleSheet, Pressable } from "react-native";
import { React, useState, useCallback } from "react";
import { darkTheme } from "./ThemeColor";
import DirectoryPanel from "./DirectoryView";
import Entypo from "@expo/vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import ConfirmCancelContainer from "./ConfirmCancelContainer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import GlobalDirectorySelectPanel from "./GlobalDirectorySelectPanel";
import { useFocusEffect } from "@react-navigation/native";

const LINK_NOTIFICATION_URL = "/reminders/links";
const FOLDER_NOTIFICATION_URL = "/reminders/directories";

export const TimeSelectPanel = ({
  initialTime = new Date(),
  initialDays = [],
  onTimeChange,
  onDayChange,
  onSubmit = null,
}) => {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [time, setTime] = useState(initialTime);
  const [activeDays, setActiveDays] = useState(initialDays);

  const daysText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

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
  const toggleDay = async (index) => {
    const newDays = [...activeDays];
    const day = days[index];
    const existingIndex = newDays.indexOf(day); // Check if the day already exists in activeDays

    if (existingIndex !== -1) {
      // If the day exists, remove it from the array
      newDays.splice(existingIndex, 1);
    } else {
      // If the day doesn't exist, add it to the array
      newDays.push(day);
    }

    await setActiveDays(newDays);
    onDayChange(newDays); // Pass newDays instead of activeDays
  };

  const int2digit = (n) => {
    if (n == 0) {
      return "00";
    } else if (n > 0 && n < 10) {
      return "0" + n;
    } else {
      return "" + n;
    }
  };

  const dateToString = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${int2digit(hour)}:${int2digit(minute)}:00:00`;
  };
  const handleTimeChange = (event, selectedDate) => {
    setPickerOpen(false);
    console.log(event);
    setTime(selectedDate);
    onTimeChange(dateToString(selectedDate));
  };
  const isDayActive = (index) => {
    const day = days[index];
    for (d of activeDays) {
      if (day == d) return true;
    }
    return false;
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
            <Text
              style={isDayActive(index) ? styles.activeDay : styles.dayText}
            >
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
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

const LinkSelectPanel = ({ onChangeLink, folder_id }) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: "Pretendard",
      fontSize: 16,
      color: darkTheme.text,
      marginLeft: 10,
      width: "85%",
    },
    container: {
      paddingLeft: -10,
    },
    nameContainer: {
      flexDirection: "row",
      marginVertical: 10,
      padding: 5,
      borderRadius: 10,
      flex: 0,
    },
    pressable: {
      flexDirection: "row",
    },
  });

  const [links, setLinks] = useState([]);
  const [selectedLink, setSelectedLink] = useState(-1);

  const axiosPrivate = useAxiosPrivate();

  const handleLinkClick = (item) => {
    setSelectedLink(item.id);
    onChangeLink(item.id);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const DIRECTORY_URL = `/directories/${folder_id}`;
          const response = await axiosPrivate.get(DIRECTORY_URL);
          setLinks(response.data.result.userLinks);
        } catch (err) {
          console.log(err);
        }
      };
      fetchData();
    }, [])
  );

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
          onPress={() => handleLinkClick(item)}
        >
          <View
            style={[
              styles.nameContainer,
              selectedLink == item.id
                ? { backgroundColor: darkTheme.level1, borderRadius: 10 }
                : null,
            ]}
          >
            <Entypo name="link" size={20} color="#BBE1FA" />
            <Text numberOfLines={1} ellipsizeMode={"tail"} style={styles.text}>
              {item.title}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const LinkSelectMode = ({ setInvisible, setMode }) => {
  const [step, setStep] = useState("folder");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [folder, setFolder] = useState(-1);
  const [days, setDays] = useState([]);
  const [time, setTime] = useState("00:00");
  const [link, setLink] = useState(-1);

  const axiosPrivate = useAxiosPrivate();
  const handleCancel = () => {
    setMode("select");
    setInvisible();
  };
  const handleSubmit = async () => {
    const message = {
      id: link,
      onoff: true,
      reminderTime: time.slice(0, 5),
      reminderDays: days,
    };
    console.log(message);
    try {
      const response = await axiosPrivate.post(
        LINK_NOTIFICATION_URL,
        JSON.stringify(message)
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleNextStep = () => {
    if (step == "folder") {
      if (folder.id > 0) {
        setStep("link");
      }
    } else if (step == "link") {
      if (link > 0) {
        setStep("time");
        setConfirmVisible(true);
      }
    }
  };
  return (
    <View>
      {step == "folder" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <GlobalDirectorySelectPanel
            value={folder}
            onValueChange={(value) => setFolder(value)}
          />
          <Pressable onPress={() => handleNextStep()}>
            <Entypo name="chevron-right" size={30} color={darkTheme.text} />
          </Pressable>
        </View>
      ) : step == "link" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinkSelectPanel
            folder_id={folder.id}
            onChangeLink={(id) => setLink(id)}
          />
          <Pressable onPress={() => handleNextStep()}>
            <Entypo name="chevron-right" size={30} color={darkTheme.text} />
          </Pressable>
        </View>
      ) : (
        <TimeSelectPanel
          onDayChange={(days) => setDays(days)}
          onTimeChange={(time) => setTime(time)}
        />
      )}
      <ConfirmCancelContainer
        cancelVisible={true}
        confirmVisible={confirmVisible}
        onCancel={() => handleCancel()}
        onConfirm={() => handleSubmit()}
      />
    </View>
  );
};

const FolderSelectMode = ({ setInvisible, setMode }) => {
  const [step, setStep] = useState("folder");
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [folder, setFolder] = useState(-1);
  const [days, setDays] = useState([]);
  const [time, setTime] = useState("00:00");

  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async () => {
    const message = {
      id: folder.id,
      onoff: true,
      reminderTime: time.slice(0, 5),
      reminderDays: days,
    };
    if (days.length > 0) {
      setMode("select");
      setInvisible();
      try {
        const response = await axiosPrivate.post(
          FOLDER_NOTIFICATION_URL,
          JSON.stringify(message)
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  const handleCancel = () => {
    setMode("select");
    setInvisible();
  };
  const handleNextStep = () => {
    if (folder.id > 0) {
      setStep("time");
      setConfirmVisible(true);
    }
  };

  return (
    <View>
      {step == "folder" ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <GlobalDirectorySelectPanel
            value={folder}
            onValueChange={(value) => setFolder(value)}
          />
          <Pressable onPress={() => handleNextStep()}>
            <Entypo name="chevron-right" size={30} color={darkTheme.text} />
          </Pressable>
        </View>
      ) : (
        <TimeSelectPanel
          onDayChange={(days) => setDays(days)}
          onTimeChange={(time) => setTime(time)}
        />
      )}
      <ConfirmCancelContainer
        cancelVisible={true}
        confirmVisible={confirmVisible}
        onCancel={() => handleCancel()}
        onConfirm={() => handleSubmit()}
      />
    </View>
  );
};

const NotificationAddModal = ({ visible, setInvisible, getLink }) => {
  const [mode, setMode] = useState("select");
  const axiosPrivate = useAxiosPrivate();

  const localStyle = StyleSheet.create({
    modeSelectContainer: {
      flexDirection: "row",
      justifyContent: "center",
    },
  });

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          {mode == "select" ? (
            <View style={localStyle.modeSelectContainer}>
              <Pressable
                onPress={() => setMode("link")}
                style={{ marginHorizontal: 20 }}
              >
                <Entypo name="link" size={50} color={"#BBE1FA"} />
                <Text style={styles.buttonText}>링크 알림</Text>
              </Pressable>
              <Pressable
                onPress={() => setMode("folder")}
                style={{ marginHorizontal: 20 }}
              >
                <Entypo
                  name="folder"
                  size={50}
                  color={darkTheme.highlight_low}
                />
                <Text style={styles.buttonText}>폴더 알림</Text>
              </Pressable>
            </View>
          ) : mode == "link" ? (
            <LinkSelectMode setInvisible={setInvisible} setMode={setMode} />
          ) : (
            <FolderSelectMode setInvisible={setInvisible} setMode={setMode} />
          )}
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
