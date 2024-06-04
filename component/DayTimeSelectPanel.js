import { View, Text } from "react-native";
import { React, useState } from "react";

const DayTimeSelectPanel = ({
  initialTime,
  initialDay,
  onTimeChange,
  onDayChange,
}) => {
  const [date, setDate] = useState(initialTime);
  const [day, setDay] = useState(initialDay);

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
    onDayChange(newDays);
  };
  const timeChange = (event, selectedTime) => {
    setPickerOpen(false);
    setTimeView(selectedTime);
    setTime(selectedTime);
    onTimeChange(selectedTime);
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
            <Text style={day[index] ? styles.activeDay : styles.dayText}>
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

export default DayTimeSelectPanel;
