import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Animated,
  Dimensions,
} from "react-native";
import { useState } from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import { darkTheme } from "../component/ThemeColor";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const dummyData = {
  searchRecommend: [
    "설계 패턴",
    "GPT",
    "리액트 네이티브",
    "링크",
    "프로그래밍",
    "AI",
    "유린기",
  ],
};

const SearchPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [dateMode, setDateMode] = useState("all");
  const [show, setShow] = useState(false);
  const [pickerMode, setPickerMode] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchMode, setSearchMode] = useState("title+content"); //title + content, summary, memo
  const [searchButtonWidth] = useState(new Animated.Value(0));

  const PeriodButton = ({ name, text }) => {
    const styles = StyleSheet.create({
      periodButton: {
        flex: 1,
        height: 40,
        backgroundColor: darkTheme.background,
        borderWidth: 1,
        borderColor: darkTheme.outline,
        alignContent: "center",
        padding: 8,
      },
      actcivePeriodButton: {
        backgroundColor: darkTheme.highlight_low,
      },
      buttonText: {
        alignSelf: "center",
        textAlignVertical: "center",
        color: darkTheme.text,
        fontFamily: "Pretendard",
        fontSize: 16,
      },
      activeButtonText: {
        color: darkTheme.level2,
      },
    });

    return (
      <Pressable
        onPress={(e) => {
          setDateMode(name);
        }}
        style={[
          styles.periodButton,
          dateMode == name ? styles.actcivePeriodButton : null,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            dateMode == name ? styles.activeButtonText : null,
          ]}
        >
          {text}
        </Text>
      </Pressable>
    );
  };

  const SearchWordsPanel = ({ list }) => {
    const buttonMargin = 5;
    const buttonPadding = 8;
    const buttonBorder = 1;
    const buttonFontSize = 16;
    const screenWidth = Dimensions.get("window").width - 50;

    const styles = StyleSheet.create({
      keywordsRow: {
        height: 30,
        marginHorizontal: 10,
        flexDirection: "row",
        marginVertical: 8,
      },
      keywordButton: {
        backgroundColor: darkTheme.level2,
        marginHorizontal: buttonMargin,
        padding: 2,
        paddingHorizontal: buttonPadding,
        borderColor: darkTheme.highlight_low,
        borderWidth: buttonBorder,
        height: "100%",
        borderRadius: 15,
      },
      buttonText: {
        alignSelf: "center",
        textAlignVertical: "center",
        color: darkTheme.text,
        fontSize: buttonFontSize,
      },
    });

    const calculateButtonWidth = (text) => {
      // 글자의 너비를 대략적으로 계산 (한 글자당 8 픽셀로 가정)
      const estimatedWidth = text.length * buttonFontSize * 0.55;
      return estimatedWidth + buttonPadding * 2 + buttonMargin;
    };

    const buttonRows = (names) => {
      let currentRowWidth = 0;
      let rows = [[]];
      names.forEach((name) => {
        const buttonWidth = calculateButtonWidth(name) + buttonMargin * 2;
        if (currentRowWidth + buttonWidth > screenWidth) {
          rows.push([]); // 새로운 행 추가
          currentRowWidth = 0;
        }
        rows[rows.length - 1].push(name);
        currentRowWidth += buttonWidth;
      });

      return rows;
    };

    const KeywordButton = ({ value }) => {
      return (
        <Pressable style={styles.keywordButton} key={value}>
          <Text style={styles.buttonText}>{value}</Text>
        </Pressable>
      );
    };

    const rows = buttonRows(list);

    return (
      <View>
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.keywordsRow}>
            {row.map((name, index) => (
              <KeywordButton key={name} value={name} />
            ))}
          </View>
        ))}
      </View>
    );
  };

  const SearchModeButton = ({ name, text }) => {
    const styles = StyleSheet.create({
      searchModeButton: {
        flex: 1,
        height: 40,
        backgroundColor: darkTheme.background,
        borderWidth: 1,
        borderColor: darkTheme.outline,
        alignContent: "center",
        padding: 8,
      },
      buttonText: {
        alignSelf: "center",
        textAlignVertical: "center",
        color: darkTheme.text,
        fontFamily: "Pretendard",
        fontSize: 16,
      },
    });
    return (
      <Pressable
        style={[
          styles.searchModeButton,
          searchMode == name
            ? { backgroundColor: darkTheme.highlight_low }
            : null,
        ]}
        onPress={() => setSearchMode(name)}
      >
        <Text
          style={[
            styles.buttonText,
            searchMode == name ? { color: darkTheme.level1 } : null,
            name == "title+content" ? { fontSize: 14 } : null,
          ]}
        >
          {text}
        </Text>
      </Pressable>
    );
  };

  function formatDate(dateObj) {
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // getMonth() returns 0-11, so we add 1
    const day = dateObj.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate != null) {
      if (pickerMode == "from") {
        setDateFrom(selectedDate);
      } else if (pickerMode == "to") {
        setDateTo(selectedDate);
      }
    }
  };
  const showPicker = (pickerMode) => {
    setPickerMode(pickerMode);
    setShow(true);
  };
  const onChangeSearch = (inputText) => {
    setSearchText(inputText);

    if (inputText) {
      Animated.timing(searchButtonWidth, {
        toValue: 40,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(searchButtonWidth, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <Header title={"검색"}></Header>
        <View style={styles.inputPanel}>
          <TextInput
            placeholder="검색어를 입력하세요"
            style={StyleSheet.flatten([
              styles.searchInput,
              isFocused && styles.inputFocused,
            ])}
            onChangeText={onChangeSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Animated.View
            style={[styles.searchButtonWrapper, { width: searchButtonWidth }]}
          >
            <Pressable>
              <AntDesign name="search1" size={24} color={darkTheme.text} />
            </Pressable>
          </Animated.View>
        </View>

        {/* <Text style={styles.keywordLabel}>추천 검색어</Text>
        <SearchWordsPanel list={dummyData.searchRecommend} /> */}
        <Text style={styles.keywordLabel}>검색 방식</Text>
        <View style={styles.periodButtonPanel}>
          <SearchModeButton name={"title+content"} text={"제목+내용"} />
          <SearchModeButton name={"title"} text={"제목"} />
          <SearchModeButton name={"summary"} text={"요약"} />
          <SearchModeButton name={"memo"} text={"메모"} />
        </View>

        <Text style={[styles.keywordLabel, { marginTop: 30 }]}>검색 기간</Text>
        <View style={styles.periodButtonPanel}>
          <PeriodButton name={"all"} text={"전체"}></PeriodButton>
          <PeriodButton name={"week"} text={"1주일"}></PeriodButton>
          <PeriodButton name={"month"} text={"1개월"}></PeriodButton>
          <PeriodButton name={"custom"} text={"직접 설정"}></PeriodButton>
        </View>
        {dateMode == "custom" && (
          <View style={styles.datePanel}>
            <Pressable
              style={styles.dateButton}
              onPress={() => showPicker("from")}
            >
              <Text style={styles.dateButtonText}>{formatDate(dateFrom)}</Text>
            </Pressable>
            <Text style={[styles.dateButtonText, { alignSelf: "center" }]}>
              ~
            </Text>
            <Pressable
              style={styles.dateButton}
              onPress={() => showPicker("to")}
            >
              <Text style={styles.dateButtonText}>{formatDate(dateTo)}</Text>
            </Pressable>

            {show && (
              <DateTimePicker
                value={pickerMode === "from" ? dateFrom : dateTo}
                mode={"date"}
                onChange={onChange}
              />
            )}
          </View>
        )}
      </View>
    </OuterContainer>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  inputPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    backgroundColor: darkTheme.level2,
    marginVertical: 16,
    padding: 5,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: "Pretendard",
    color: darkTheme.text,
    borderRadius: 14,
    alignSelf: "center",
  },
  searchButtonWrapper: {
    marginLeft: 10,
    justifyContent: "center",
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: darkTheme.text,
  },
  keywordLabel: {
    fontFamily: "Pretendard",
    fontSize: 24,
    fontWeight: "800",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 30,
    color: darkTheme.text,
  },
  periodButtonPanel: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 10,
    height: 40,
  },
  datePanel: {
    marginHorizontal: 20,
    marginVertical: 30,
    flexDirection: "row",
  },
  dateButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: darkTheme.level2,
  },
  dateButtonText: {
    fontSize: 18,
    fontFamily: "Pretendard",
    color: darkTheme.text,
  },
});

export default SearchPage;
