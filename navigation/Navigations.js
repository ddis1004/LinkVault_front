import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LoginPage from "../page/LoginPage";
import SignupPage from "../page/SignupPage";
import AccountOptionPage from "../page/AccountOptionPage";
import * as Linking from "expo-linking";
import DirectoryViewPage from "../page/DirectoryViewPage";
import { navigationRef, onNavigationReady } from "./PushNavigation";
import { useShareIntent } from "expo-share-intent";
import { axiosPrivate } from "../api/axios";
import SearchNavigation from "./SearchNavigation";

const Stack = createNativeStackNavigator();
const prefix = Linking.createURL("/");

function Navigations() {
  const linking = {
    prefixes: [prefix],
  };

  const { hasShareIntent, shareIntent, resetShareIntent, error } =
    useShareIntent();

  if (shareIntent != null) {
    // console.log(shareIntent);
    axiosPrivate.get;
    // navigation.navigate("SearchResult", {
    //   params: { result: [], keyword: "" },
    // });
  }

  return (
    <NavigationContainer style={{ flex: 1 }} linking={linking} ref={navigationRef} onReady={onNavigationReady}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen style={{ flex: 1 }} name="Main" component={BottomTab} />
        <Stack.Screen name="DirectoryView" component={DirectoryViewPage} />
        {/* <Stack.Screen name="ShareIntent" component={SearchNavigation} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigations;
