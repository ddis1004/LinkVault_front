import { View, Text } from "react-native";
import { React, useState } from "react";
import { Label, TimePanel, WeekPanel } from "./NotificationItem";
import { TimeSelectPanel } from "./NotificationAddModal";

const NotificationEditPanel = ({ onChnage, onDelete, data, itemType }) => {
  const [days, setDays] = useState(data.reminderDate);
  const [time, setTime] = useState(data.reminderTime);

  const handleDayChange = (days) => {
    setDays(days);
    onChnage(time, days);
  };

  const handleTimeChange = (time) => {
    const str = dateToString(time);
    setTime(str);
    onChnage(str, days);
  };

  const stringToDate = (timestr) => {
    const hour = parseInt(timestr.slice(0, 2));
    const minute = parseInt(timestr.slice(3, 5));
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
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

  return (
    <View>
      <Label type={"link"} data={data} />
      <TimeSelectPanel
        initialTime={stringToDate(data.reminderTime)}
        setDays={setDays}
        setTime={handleTimeChange}
      />
    </View>
  );
};

export default NotificationEditPanel;
