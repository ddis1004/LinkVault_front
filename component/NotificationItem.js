import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { darkTheme } from "./ThemeColor";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const Label = ({ data, type }) => {
  let component;

  const styles = StyleSheet.create({
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingRight: 40,
    },
    text: {
      marginLeft: 3,
      color: darkTheme.text,
      fontSize: 14,
    },
  });

  const folderString = (path) => {
    let str = "";
    for (const p of path) {
      str = `${str} / ${p}`;
    }
    return str.slice(2);
  };

  switch (type) {
    case "folder":
      component = (
        <View style={styles.labelContainer}>
          <Entypo name="folder" size={16} color={darkTheme.highlight_low} />
          <Text numberOfLines={1} style={styles.text} ellipsizeMode="tail">
            {folderString(data.target.location)}
          </Text>
        </View>
      );
      break;
    case "link":
      component = (
        <View style={styles.labelContainer}>
          <Entypo name="link" size={16} color="#BBE1FA" />
          <Text numberOfLines={1} style={styles.text} ellipsizeMode="tail">
            {data.title}
          </Text>
        </View>
      );
      break;
  }
  return component;
};

export const TimePanel = ({ time }) => {
  const styles = StyleSheet.create({
    text: {
      color: darkTheme.text,
      fontSize: 30,
      marginVertical: 2,
      fontFamily: "Pretendard",
      letterSpacing: 2,
    },
  });

  const pasrseToTimeString = (time) => {
    const hour = time.slice(0, 2);
    const minute = time.slice(3, 5);
    return hour + " : " + minute;
  };

  const timeString = pasrseToTimeString(time);

  return (
    <View>
      <Text style={styles.text}>{timeString}</Text>
    </View>
  );
};

const AccumulationPanel = ({ accumulation }) => {
  const styles = StyleSheet.create({
    text: {
      color: darkTheme.text,
      fontSize: 24,
      marginVertical: 2,
      fontFamily: "Pretendard",
    },
    highlightText: {
      // color: darkTheme.level1,
    },
  });

  return (
    <View>
      <Text style={styles.text}>
        미확인 -
        <Text style={[styles.text, styles.highlightText]}>
          {" " + accumulation.threshold}
        </Text>
      </Text>
    </View>
  );
};

const ToggleButton = ({ onToggle, active, data }) => {
  const [isActive, setIsActive] = useState(active);
  const activeColor = darkTheme.highlight;
  const inactiveColor = "#262421";
  const handlePress = () => {
    setIsActive(!isActive);
    onToggle(data.id, data.type, !isActive);
  };
  return (
    <Pressable onPress={() => handlePress()}>
      <Ionicons
        name="notifications-sharp"
        size={24}
        color={isActive ? activeColor : inactiveColor}
      />
    </Pressable>
  );
};

export const WeekPanel = ({ reminderDate }) => {
  const daysText = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const daysInputFormat = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  //const currentDay = time.every.toUpperCase().substring(0, 3);

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    text: {
      color: darkTheme.text,
      marginHorizontal: 4,
      fontFamily: "Pretendard",
    },
    highlight: {
      color: darkTheme.highlight,
      marginHorizontal: 4,
      fontFamily: "Pretendard",
    },
  });

  const isActive = (day) => {
    for (d of reminderDate) {
      if (d == day) {
        return true;
      }
    }
    return false;
  };

  return (
    <View style={styles.container}>
      {daysText.map((day, index) => (
        <Text
          key={index}
          style={
            isActive(daysInputFormat[index]) ? styles.highlight : styles.text
          }
        >
          {day}
        </Text>
      ))}
    </View>
  );
};

const DatePanel = ({ time }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
    },
    text: {
      fontSize: 14,
      color: darkTheme.text,
      marginHorizontal: 4,
    },
    highlight: {
      color: darkTheme.highlight,
      marginHorizontal: 4,
    },
  });

  if (periodic) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`매 달 ${time.every} 일에 알려드려요`}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{`${
          time.date.getMonth() + 1
        } 월 ${time.date.getDate()} 일에 알려드려요`}</Text>
      </View>
    );
  }
};

const LINK_CONTENT_URL = "";
const NotificationItem = ({ data, onToggle }) => {
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");
  console.log(data);

  return (
    <View style={styles.container}>
      <Label data={data} type={data.type} />
      <View style={styles.timeToggleContainer}>
        <TimePanel time={data.reminderTime} />
        <ToggleButton onToggle={onToggle} active={data.onoff} data={data} />
      </View>
      <WeekPanel reminderDate={data.reminderDate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: darkTheme.level2,
    height: 130,
    marginVertical: 10,
    padding: 14,
    justifyContent: "space-between",
  },
  timeToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: { color: darkTheme.text, fontFamily: "Pretendard" },
  dayDate: {},
});

export default NotificationItem;
