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
import useAxiosPrivate, { useVecSearchAxios } from "../hooks/useAxiosPrivate";
import { useNavigation } from "@react-navigation/native";

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

const SEARCH_URI = "/links/search";
const VEC_SEARCH_URI = "/links/linkbrary";

const SearchPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [dateMode, setDateMode] = useState(1);
  const [show, setShow] = useState(false);
  const [pickerMode, setPickerMode] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchMode, setSearchMode] = useState(4); //title + content, summary, memo
  const [searchButtonWidth] = useState(new Animated.Value(0));
  const [searchLink, setSearchLink] = useState("");
  const [searchInputType, setInputType] = useState("normal");
  const axiosPrivate = useAxiosPrivate();
  const navigation = useNavigation();

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

  const formatDateMessage = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");

    // Format the date as yyyy-MM-dd
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleSearch = async () => {
    if (searchInputType == "normal") {
      let mode_int = -1;
      const params = {
        mode: searchMode,
        dateRangeMode: dateMode,
        search: searchText,
        startDate: formatDateMessage(dateFrom),
        endDate: formatDateMessage(dateTo),
      };

      try {
        const response = await axiosPrivate.get(SEARCH_URI, {
          params: params,
        });
        console.log(response.data.result);
        navigation.navigate("SearchResult", {
          result: response.data.result,
          keyword: searchText,
        });
      } catch (error) {
        console.log(error.response);
      }
    } else {
      const params = {
        url: searchText,
      };
      try {
        const response = await axiosPrivate(VEC_SEARCH_URI, { params: params });
        //console.log(response.data.result);
        navigation.navigate("SearchResult", {
          result: response.data.result,
          keyword: "링크",
        });
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <Header title={"검색"}></Header>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <View
            style={[
              styles.inputTypeButtonWrapper,
              searchInputType == "normal" ? styles.activeInputType : null,
            ]}
          >
            <Pressable onPress={() => setInputType("normal")}>
              <Text style={styles.buttonText}>일반 검색</Text>
            </Pressable>
          </View>
          <View
            style={[
              styles.inputTypeButtonWrapper,
              searchInputType == "link" ? styles.activeInputType : null,
            ]}
          >
            <Pressable onPress={() => setInputType("link")}>
              <Text style={styles.buttonText}>링크로 검색</Text>
            </Pressable>
          </View>
        </View>
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
            <Pressable onPress={() => handleSearch()}>
              <AntDesign name="search1" size={24} color={darkTheme.text} />
            </Pressable>
          </Animated.View>
        </View>

        {searchInputType == "link" && (
          <View
            style={{
              marginTop: 230,
            }}
          >
            <Text style={styles.buttonText}>
              링크를 붙여넣으면 비슷한 링크를 찾아드려요!
            </Text>
          </View>
        )}

        {searchInputType == "normal" && (
          <View>
            <Text style={styles.keywordLabel}>검색 방식</Text>
            <View style={styles.periodButtonPanel}>
              <SearchModeButton name={4} text={"자동"} />
              <SearchModeButton name={1} text={"제목+내용"} />
              <SearchModeButton name={2} text={"요약"} />
              <SearchModeButton name={3} text={"메모"} />
            </View>

            <Text style={[styles.keywordLabel, { marginTop: 30 }]}>
              검색 기간
            </Text>
            <View style={styles.periodButtonPanel}>
              <PeriodButton name={1} text={"전체"}></PeriodButton>
              <PeriodButton name={2} text={"1주일"}></PeriodButton>
              <PeriodButton name={3} text={"1개월"}></PeriodButton>
              <PeriodButton name={4} text={"직접 설정"}></PeriodButton>
            </View>
            {dateMode == "custom" && (
              <View style={styles.datePanel}>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => showPicker("from")}
                >
                  <Text style={styles.dateButtonText}>
                    {formatDate(dateFrom)}
                  </Text>
                </Pressable>
                <Text style={[styles.dateButtonText, { alignSelf: "center" }]}>
                  ~
                </Text>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => showPicker("to")}
                >
                  <Text style={styles.dateButtonText}>
                    {formatDate(dateTo)}
                  </Text>
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
  inputTypeButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 0,
  },
  activeInputType: {
    borderRadius: 5,
    borderBottomWidth: 5,
    borderColor: darkTheme.highlight,
  },
  inputTypeButton: { backgroundColor: "red" },
  buttonText: {
    fontFamily: "Pretendard",
    fontSize: 18,
    color: darkTheme.text,

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
