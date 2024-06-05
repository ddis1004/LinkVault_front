import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { darkTheme } from "./ThemeColor";
import * as Progress from "react-native-progress";

const ReadStatusPanel = ({ data, total, read }) => {
  //var viewData = { total: 1, read: 0 };

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const animateProgress = () => {
      let progressValue = read / total;
      setProgress(progressValue);
    };

    animateProgress();
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{total}개의 링크를 저장했어요</Text>
      <Text style={styles.text}>{read}개를 읽었어요</Text>
      <Progress.Bar
        style={styles.progressBar}
        progress={progress}
        color={darkTheme.highlight}
        width={310}
        height={20}
        borderRadius={10}
        unfilledColor={"#AB751C"}
        animationType="timing" // Specify animation type
        animated={true}
      />
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
    marginTop: 20,
    borderWidth: 0,
  },
});

export default ReadStatusPanel;
