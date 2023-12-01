import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, LogBox } from "react-native";
import MyPage from "./screens/MyPage";
import SearchPage from "./screens/SearchPage";
import EventPage from "./screens/EventPage";
import CouponPage from "./screens/CouponPage";
import SignIn from "./screens/SignIn";
import FindPw from "./screens/FindPw";
import ModifyInfo from "./screens/ModifyInfo";
import SignUp from "./screens/SignUp";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import QrPage from "./screens/QrPage";
import CameraPage from "./screens/CameraPage";
import Home from "./screens/Home";
import StampDetail from "./screens/StampDetail";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs(["Require cycle: "]);
LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate`"]);
LogBox.ignoreLogs(["Could not find image file:"]);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused
              ? require("./assets/icons/redhome.png")
              : require("./assets/icons/home.png");
          } else if (route.name === "CameraPage") {
            iconName = focused
              ? require("./assets/icons/redqr.png")
              : require("./assets/icons/qr.png");
          } else if (route.name === "MyPage") {
            iconName = focused
              ? require("./assets/icons/redmypage.png")
              : require("./assets/icons/mypage.png");
          }
          return <Image source={iconName} style={{ width: 25, height: 25 }} />;
        },
        tabBarLabel: () => null,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="CameraPage"
        component={CameraPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  // const isFocused = useIsFocused();

  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("AccessToken");
      if (token) {
        setIsLogin(!!token);
      }
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer style={styles.container}>
      {isLogin ? (
        <>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Main"
          >
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="ModifyInfo" component={ModifyInfo} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="StampDetail" component={StampDetail} />
            <Stack.Screen name="CouponPage" component={CouponPage} />
            <Stack.Screen name="QrPage" component={QrPage} />
            <Stack.Screen name="CameraPage" component={CameraPage} />
            <Stack.Screen name="EventPage" component={EventPage} />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="SignIn"
          >
            <Stack.Screen name="SearchPage" component={SearchPage} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="FindPw" component={FindPw} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet;
