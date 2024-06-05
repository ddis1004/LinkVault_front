import { View, Text } from "react-native";
import React from "react";
import SearchPage from "../page/SearchPage";
import SearchResultPage from "../page/SearchResultPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <NavigationContainer style={{ flex: 1 }} independent={true}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Search" component={SearchPage} />
        <Stack.Screen name="SearchResult" component={SearchResultPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SearchNavigation;
