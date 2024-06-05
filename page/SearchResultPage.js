import { View, Text, StyleSheet, ScrollView } from "react-native";
import { React, useState } from "react";
import OuterContainer from "../component/OuterContainer";
import Header from "../component/Header";
import LinkViewPanel from "../component/LinkViewPanel";
import { darkTheme } from "../component/ThemeColor";

const SearchResultPage = ({ route }) => {
  const [result, setResult] = useState(route.params.result);

  return (
    <OuterContainer>
      <View style={styles.innerContainer}>
        <Header title={"검색결과"} />
        <Text
          style={styles.topText}
        >{`"${route.params.keyword}"에 대해서 검색한결과`}</Text>

        <ScrollView>
          {result.map((item, index) => (
            <View style={styles.resultItemContainer}>
              <LinkViewPanel key={item.id} link={item} />
            </View>
          ))}
        </ScrollView>
      </View>
    </OuterContainer>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "flex-start",
    padding: 10,
  },
  topText: {
    color: darkTheme.text,
    fontSize: 20,
    fontFamily: "Pretendard",
  },
  resultItemContainer: {
    marginVertical: 10,
  },
});

export default SearchResultPage;
