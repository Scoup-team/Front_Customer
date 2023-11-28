import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import bluearrow from "../assets/icons/bluearrow.png";
import coffee from "../assets/icons/coffee.png";
import { deleteUser } from "../api/userInfo";
import { getNickname } from "../api/userInfo";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyPage = ({ navigation }) => {
  const [nickname, setNickname] = useState("");
  const isFocused = useIsFocused();

  const logout = async () => {
    await AsyncStorage.removeItem("AccessToken");
  };

  const CouponPageClick = () => {
    navigation;
  };

  useEffect(() => {
    getNick();
  }, [isFocused]);

  const getNick = async () => {
    const nick = await getNickname();
    setNickname(nick);
  };

  return (
    <View>
      <Text style={styles.title}>마이 페이지</Text>
      <View style={styles.usersection}>
        <Image source={coffee} style={styles.coffee} />
        <Text style={styles.nickname}>{nickname}님</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.topMenu}>개인 정보 수정</Text>
        <Pressable onPress={() => navigation.navigate("ModifyInfo")}>
          <Image source={bluearrow} style={styles.arrow} />
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={styles.topMenu}>내 쿠폰함</Text>
        <Pressable onPress={() => navigation.navigate("CouponPage")}>
          <Image source={bluearrow} style={styles.arrow} />
        </Pressable>
      </View>
      <Text onPress={logout} style={styles.BottomMenu}>
        로그아웃하기
      </Text>
      <TouchableOpacity
        onPress={() => {
          deleteUser();
          navigation.navigate("SignIn");
        }}
      >
        <Text style={styles.BottomMenu}>탈퇴하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  usersection: {
    flexDirection: "row",
    alignItems: "flex-start",
    // justifyContent: "space-between",
    marginLeft: 20.51,
    marginBottom: 34,
  },

  section: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  title: {
    color: "#000",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "normal",
    // fontWeight: 700,
    marginTop: 20,
    marginBottom: 50,
  },

  arrow: {
    width: 13,
    height: 19,
    marginRight: 40,
    marginTop: 5,
  },

  coffee: {
    width: 35,
    height: 35,
  },

  nickname: {
    color: "#5A5858",
    textAlign: "left",
    fontSize: 28,
    fontStyle: "normal",
    // fontWeight: 700,
    marginLeft: 10,
  },

  topMenu: {
    color: "#6E85B7",
    textAlign: "left",
    fontSize: 20,
    fontStyle: "normal",
    // fontWeight: 700,
    marginBottom: 34,
    marginLeft: 30.51,
  },

  BottomMenu: {
    color: "#5A5858",
    textAlign: "left",
    fontSize: 20,
    fontStyle: "normal",
    // fontWeight: 700,
    marginBottom: 34,
    marginLeft: 30.51,
  },
});

export default MyPage;
