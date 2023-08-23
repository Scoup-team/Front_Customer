import React from "react";
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
import API from "../api";

const MyPage = ({ navigation }) => {
  const CouponPageClick = () => {
    navigation;
  };

  const deleteUser = async () => {
    try {
      const response = await API.delete("/user");

      if (response.status === 200) {
        console.log("회원 탈퇴 성공:", response.data.message);
        alert("회원 탈퇴가 성공적으로 이루어졌습니다.");
        navigation.navigate("SignIn");
      } else {
        console.error("회원 탈퇴 실패:", response.data.message);
      }
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>마이 페이지</Text>
      <View style={styles.usersection}>
        <Image source={coffee} style={styles.coffee} />
        <Text style={styles.nickname}>크림님</Text>
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
      <Text style={styles.BottomMenu}>로그아웃하기</Text>
      <TouchableOpacity onPress={deleteUser}>
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
    fontWeight: 700,
    marginTop: 70,
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
    fontWeight: 700,
    marginLeft: 10,
  },

  topMenu: {
    color: "#6E85B7",
    textAlign: "left",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
    marginBottom: 34,
    marginLeft: 30.51,
  },

  BottomMenu: {
    color: "#5A5858",
    textAlign: "left",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: 700,
    marginBottom: 34,
    marginLeft: 30.51,
  },
});

export default MyPage;
