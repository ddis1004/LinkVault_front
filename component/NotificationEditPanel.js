import { View, Text, Pressable } from "react-native";
import { React, useState } from "react";
import { Label, TimePanel, WeekPanel } from "./NotificationItem";
import { TimeSelectPanel } from "./NotificationAddModal";
import ConfirmCancelContainer from "./ConfirmCancelContainer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { EvilIcons } from "@expo/vector-icons";

const UPDATE_NOTIFICATION_LINK = "/reminders/links";
const UPDATE_NOTIFICATION_FOLDER = "/reminders/directories";

const NotificationEditPanel = ({ onSubmit, onCancel, data }) => {
  const [days, setDays] = useState(data.reminderDate);
  const [time, setTime] = useState(data.reminderTime);

  const axiosPrivate = useAxiosPrivate();

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

  const handleCancel = () => {
    onCancel();
  };
  const handleSubmit = async () => {
    const message = {
      id: data.id,
      onoff: data.onoff,
      reminderTime: time.slice(0, 5),
      reminderDays: days,
    };
    console.log(message);
    const URL =
      data.type == "link"
        ? UPDATE_NOTIFICATION_LINK
        : UPDATE_NOTIFICATION_FOLDER;

    try {
      const response = await axiosPrivate.put(URL, JSON.stringify(message));
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
    onSubmit();
  };

  const handleDelete = async () => {
    const URL =
      data.type == "link"
        ? `${UPDATE_NOTIFICATION_LINK}/${data.id}`
        : `${UPDATE_NOTIFICATION_FOLDER}/${data.id}`;

    try {
      const response = await axiosPrivate.delete(URL);
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
    onCancel();
  };

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Label type={"link"} data={data} />
        <Pressable onPress={() => handleDelete()} style={{ marginRight: 10 }}>
          <EvilIcons name="trash" size={30} color="#B80000" />
        </Pressable>
      </View>

      <TimeSelectPanel
        initialTime={stringToDate(data.reminderTime)}
        initialDays={data.reminderDate}
        onTimeChange={(time) => setTime(time)}
        onDayChange={(day) => setDays(day)}
      />
      <ConfirmCancelContainer
        confirmVisible={true}
        cancelVisible={true}
        onCancel={() => handleCancel()}
        onConfirm={() => handleSubmit()}
      />
    </View>
  );
};

export default NotificationEditPanel;
