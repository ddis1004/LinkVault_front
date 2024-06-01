import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import { darkTheme } from "../component/ThemeColor";

const AccountPage = () => {
  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <Header title={"내 정보"}></Header>
        <View style={styles.settingContainer}>
          <Text style={styles.settingLabel}>알림 설정</Text>
          <Pressable>
            <View>
              <Text style={styles.settingLabel}>
                안 읽은 링크가 쌓였을 경우 알림받기
              </Text>
            </View>
          </Pressable>
          <Pressable>
            <View>
              <Text style={styles.settingLabel}>
                시간마다 읽지 않은 링크 알림
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </OuterContainer>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
  },
  settingContainer: {
    margin: 15,
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
