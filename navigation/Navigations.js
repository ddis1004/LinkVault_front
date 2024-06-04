import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "../page/LoginPage";
import SignupPage from "../page/SignupPage";
import AccountOptionPage from "../page/AccountOptionPage";
import * as Linking from "expo-linking";

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/");

function Navigations() {
  const linking = {
    prefixes: [prefix],
  };
  return (
    <NavigationContainer style={{ flex: 1 }} linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen style={{ flex: 1 }} name="Main" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;
