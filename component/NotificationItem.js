import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { darkTheme } from "./ThemeColor";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

// data format
// {id: 1,
//     active: true,
//     notiType: "periodic",
//     targetType: "folder",
//     target: {
//       title: "발표 못하는 사람이 발표 잘하는 것처럼 보이는 법",
//       location: ["회의", "발표"],
//     },
//     time: {
//       period: "week",
//       every: "monday",
//       hour: 8,
//       minute: 30,
//     },
// }

const Label = ({ data }) => {
  let component;

  const styles = StyleSheet.create({
    labelContainer: {
      flexDirection: "row",
      alignItems: "center",
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

  switch (data.targetType) {
    case "folder":
      component = (
        <View style={styles.labelContainer}>
          <Entypo name="folder" size={16} color={darkTheme.highlight_low} />
          <Text style={styles.text}>{folderString(data.target.location)}</Text>
        </View>
      );
      break;
    case "link":
      component = (
        <View style={styles.labelContainer}>
          <Entypo name="link" size={16} color="#BBE1FA" />
          <Text style={styles.text}>{data.target.title}</Text>
        </View>
      );
      break;
  }
  return component;
};

const TimePanel = ({ time }) => {
  const styles = StyleSheet.create({
    text: {
      color: darkTheme.text,
      fontSize: 30,
      marginVertical: 2,
      fontFamily: "Pretendard",
      letterSpacing: 2,
    },
  });

  const to2Digit = (i) => {
    if (i == 0) {
      return "00";
    } else if (i < 10) {
      return "0" + i.toString();
    } else {
      return i.toString();
    }
  };

  const timeString = to2Digit(time.hour) + " : " + to2Digit(time.minute);

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

const ToggleButton = ({ onToggle, active }) => {
  const activeColor = darkTheme.highlight;
  const inactiveColor = "#262421";
  return (
    <Pressable onPress={onToggle}>
      <Ionicons
        name="notifications-sharp"
        size={24}
        color={active ? activeColor : inactiveColor}
      />
    </Pressable>
  );
};

const WeekPanel = ({ time }) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentDay = time.every.toUpperCase().substring(0, 3);

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

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <Text
          key={index}
          style={day === currentDay ? styles.highlight : styles.text}
        >
          {day}
        </Text>
      ))}
    </View>
  );
};

const DatePanel = ({ time, periodic }) => {
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

const NotificationItem = ({ data, onToggle, onChange }) => {
  return (
    <View style={styles.container}>
      <Label data={data} />
      <View style={styles.timeToggleContainer}>
        {data.notiType == "periodic" || data.notiType == "one-time" ? (
          <TimePanel time={data.time} />
        ) : (
          <AccumulationPanel accumulation={data.accumulation} />
        )}
        <ToggleButton onToggle={onToggle} active={data.active} />
      </View>
      <View style={styles.dayDate}>
        {data.notiType == "accumulation" ? (
          <View>
            <Text
              style={styles.text}
            >{`미확인 된 링크가 ${data.accumulation.threshold}개 쌓이면 알려드려요`}</Text>
          </View>
        ) : data.notiType == "periodic" ? (
          data.time.period == "week" ? (
            <WeekPanel time={data.time} />
          ) : (
            <DatePanel time={data.time} periodic={true} />
          )
        ) : (
          <DatePanel time={data.time} periodic={false} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: darkTheme.level2,
    height: 120,
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
