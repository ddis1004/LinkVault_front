import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { darkTheme } from "./ThemeColor";
import { useNavigation } from "@react-navigation/native";

const DirectoryItem = ({ name, count, route }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Directory", { directory: route })}
      style={{ flex: 1, margin: 5 }}
    >
      <View style={styles.directoryCard}>
        <Text style={styles.cardText}>{name}</Text>
        <View
          style={{ flexDirection: "row", marginTop: 4, alignItems: "center" }}
        >
          <Entypo
            style={{ paddingTop: 3 }}
            name="link"
            size={20}
            color={darkTheme.text}
          />
          <Text style={styles.cardText}>{count}</Text>
        </View>
      </View>
    </Pressable>
  );
};
const EmptyCard = () => {
  return (
    <View style={{ flex: 1, margin: 5 }}>
      <View style={styles.emptyCard}></View>
    </View>
  );
};

const MainDirectoryPanel = ({ directory }) => {
  return (
    <View style={styles.container}>
      <View style={styles.verticaList}>
        {directory.map((item, index) => {
          if (index % 2 == 0) {
            return (
              <DirectoryItem
                key={index}
                name={item.name}
                count={item.linkCount}
                route={item.id}
              />
            );
          } else {
            return null;
          }
        })}
      </View>
      <View style={styles.verticaList}>
        {directory.map((item, index) => {
          if (index % 2 == 1) {
            return (
              <DirectoryItem
                key={index}
                name={item.name}
                count={item.linkCount}
                route={item.id}
              />
            );
          } else {
            return null;
          }
        })}
        {directory.length % 2 !== 0 && <EmptyCard />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: darkTheme.level1,
    borderRadius: 10,
    margin: 0,
    padding: 20,
    flex: 1,
    flexDirection: "row",
  },
  verticaList: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",
  },
  directoryCard: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: darkTheme.level2,
    padding: 10,
    paddingLeft: 20,
    minHeight: 80,
    justifyContent: "space-between",
  },
  emptyCard: {
    flex: 1,
    margin: 10,
    padding: 10,
  },
  cardText: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
    fontSize: 22,
  },
});

export default MainDirectoryPanel;
