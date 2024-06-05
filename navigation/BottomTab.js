import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { darkTheme } from "../component/ThemeColor";
import MainNavigations from "./MainNavigations";
import AddLinkPage from "../page/AddLinkPage";
import SearchPage from "../page/SearchPage";
import AccountPage from "../page/AccountPage";
import NotificationPage from "../page/NotificationPage";
import SearchNavigation from "./SearchNavigation";

const Tab = createBottomTabNavigator();

const colors = {
  activeColor: "#FFFFFF",
  inactiveColor: "#7F7F7F",
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        activeTintColor: darkTheme.highlight,
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainNavigations}
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-sharp"
              size={24}
              color={focused ? colors.activeColor : colors.inactiveColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.activeColor : colors.inactiveColor,
                fontSize: 10,
              }}
            >
              홈
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={NotificationPage}
        options={{
          title: "알림",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="notifications"
              size={24}
              color={focused ? colors.activeColor : colors.inactiveColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.activeColor : colors.inactiveColor,
                fontSize: 10,
              }}
            >
              알림
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="추가"
        component={AddLinkPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="add-circle" size={50} color={darkTheme.highlight} />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Tab.Screen
        name="Notification"
        component={SearchNavigation}
        options={{
          title: "검색",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="search"
              size={24}
              color={focused ? colors.activeColor : colors.inactiveColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.activeColor : colors.inactiveColor,
                fontSize: 10,
              }}
            >
              검색
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="MyPage"
        component={AccountPage}
        options={{
          title: "마이페이지",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person"
              size={24}
              color={focused ? colors.activeColor : colors.inactiveColor}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? colors.activeColor : colors.inactiveColor,
                fontSize: 10,
              }}
            >
              마이페이지
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "column",
    backgroundColor: darkTheme.level1,
  },
});

export default BottomTab;
