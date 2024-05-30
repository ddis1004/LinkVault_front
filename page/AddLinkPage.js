import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import OuterContainer from "../component/OuterContainer";
import { darkTheme } from "../component/ThemeColor";
import Header from "../component/Header";
import DropDownPicker from "react-native-dropdown-picker";

const AddLinkPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {
      label: "자동",
      value: "apple",
      containerStyle: { backgroundColor: darkTheme.level2 },
    },
    {
      label: "리액트",
      value: "banana",
      containerStyle: { backgroundColor: darkTheme.level2 },
    },
    {
      label: "네이티브",
      value: "banan2",
      containerStyle: { backgroundColor: darkTheme.level2 },
    },
  ]);

  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <Header title={"링크 저장하기"} />
        <View>
          <Text style={styles.inputLabel}>복사한 링크</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="#7E7E7E"
            placeholder="링크를 붙여넣어주세요"
          ></TextInput>
        </View>
        <View>
          <Text style={styles.inputLabel}>제목</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={darkTheme.placeholder}
            placeholder="제목을 입력해주세요"
          ></TextInput>
          <Text style={styles.inputComment}>
            * 미입력시 제목이 자동으로 생성됩니다.
          </Text>
        </View>
        <View>
          <Text style={styles.inputLabel}>저장위치</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            theme="DARK"
            placeholder="자동"
            style={styles.picker}
          ></DropDownPicker>
          <Text style={styles.inputComment}>
            * 미설정시 자동으로 분류됩니다.
          </Text>
        </View>
        <View>
          <Text style={styles.inputLabel}>메모</Text>
          <TextInput
            style={styles.memoInput}
            placeholderTextColor={darkTheme.placeholder}
            multiline={true}
            textAlignVertical="top"
            placeholder="자유롭게 메모를 작성해주세요"
          ></TextInput>
        </View>
      </View>
    </OuterContainer>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    color: darkTheme.text,
    margin: 10,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    fontFamily: "Pretendard",
  },
  inputLabel: {
    margin: 20,
    color: darkTheme.text,
    fontSize: 16,
  },
  input: {
    backgroundColor: darkTheme.level2,
    borderRadius: 10,
    fontFamily: "Pretendard",
    color: darkTheme.text,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  memoInput: {
    backgroundColor: darkTheme.level2,
    borderRadius: 10,
    fontFamily: "Pretendard",
    color: darkTheme.text,
    alignItems: "flex-start",
    marginHorizontal: 20,
    padding: 10,
    height: 180,
  },
  picker: {
    width: "90%",
    marginLeft: 20,
    backgroundColor: darkTheme.level2,
  },
  inputComment: {
    marginHorizontal: 20,
    fontFamily: "Pretendard",
    color: darkTheme.text,
    paddingLeft: 6,
    fontSize: 12,
  },
});

export default AddLinkPage;
