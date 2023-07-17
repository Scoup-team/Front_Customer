import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MyPage from "./screens/MyPage"; 
import SearchPage from "./screens/SearchPage"; 
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Searchpage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Mypage" component={Mypage} />
        <Stack.Screen name="Searchpage" component={Searchpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
