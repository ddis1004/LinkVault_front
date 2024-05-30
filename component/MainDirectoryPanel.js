import { View, Text, StyleSheet, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { darkTheme } from "./ThemeColor";
import { useNavigation } from "@react-navigation/native";

const DirectoryItem = ({ name, count, route }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Directory", { directory: "hi" })}
      style={{ flex: 1, margin: 5 }}
    >
      <View style={styles.directoryCard}>
        <Text style={styles.cardText}>{name}</Text>
        <View style={{ flexDirection: "row", marginTop: 4 }}>
          <Entypo
            style={{ paddingTop: 3 }}
            name="link"
            size={24}
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
                count={item.count}
                route={item.route}
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
              <DirectoryItem key={index} name={item.name} count={item.count} />
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
  },
  directoryCard: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: darkTheme.level2,
    padding: 20,
    justifyContent: "space-between",
  },
  emptyCard: {
    flex: 1,
    margin: 10,
    padding: 20,
  },
  cardText: {
    color: darkTheme.text,
    fontFamily: "Pretendard",
    fontSize: 22,
  },
});

export default MainDirectoryPanel;
