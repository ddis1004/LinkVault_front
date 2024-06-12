import { View, Text, StyleSheet, Animated } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { darkTheme } from "./ThemeColor";
import * as Progress from "react-native-progress";
import { useFocusEffect } from "@react-navigation/native";

const ReadStatusPanel = ({ total, read }) => {
  const [progress, setProgress] = useState(0);
  const progressWidth = new Animated.Value(0);

  useFocusEffect(
    useCallback(() => {
      const animateProgress = () => {
        const readCount = read || 0;
        const totalCount = total || 1; // Avoid division by zero
        const progressValue = readCount / totalCount;

        setProgress(progressValue);
        // console.log(read, total);
        progressWidth.setValue(0);

        Animated.timing(progressWidth, {
          toValue: progressValue * 340, // Adjust multiplier based on your max width
          duration: 500,
          useNativeDriver: false,
        }).start();
      };
      animateProgress();
    })
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{total}개의 링크를 저장했어요</Text>
      <Text style={styles.text}>{read}개를 읽었어요</Text>
      <View style={styles.progressBarBack}>
        <Animated.View
          style={[styles.progressBar, { width: progressWidth }]}
        ></Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.background,
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 10,
    margin: 0,
    padding: 20,
    flex: 1,
  },
  text: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
    fontWeight: "900",
    fontSize: 20,
    marginBottom: 10,
  },
  progressBar: {
    height: 30,
    backgroundColor: darkTheme.highlight,
    borderRadius: 20,
  },
  progressBarBack: {
    backgroundColor: darkTheme.text,
    borderRadius: 20,
  },
});

export default ReadStatusPanel;
