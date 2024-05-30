import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainPage from "../page/MainPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DirectoryViewPage from "../page/DirectoryViewPage";

const Stack = createNativeStackNavigator();

const MainNavigations = () => {
  return (
    <NavigationContainer style={{ flex: 1 }} independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="Directory" component={DirectoryViewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigations;
