import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import { NavigationContainer } from "@react-navigation/native";
import LoginPage from "../page/LoginPage";
import SignupPage from "../page/SignupPage";
import AccountOptionPage from "../page/AccountOptionPage";

const Stack = createNativeStackNavigator();

function Navigations() {
  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen style={{ flex: 1 }} name="Main" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;
