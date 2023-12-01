import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { FileSystem as ExpoFileSystem } from "expo";
import * as FileSystem from "expo-file-system";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { postReceipt, postReceiptData } from "../api/receipt";

const imagePickerOption = {
  mediaType: "photo",
  maxWidth: 768,
  maxHeight: 768,
};

const CameraPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      console.log("No access to camera");
      return false;
    }
    return true;
  };

  useEffect(() => {
    (async () => {
      const hasPermission = await getCameraPermission();
      setHasPermission(hasPermission);
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        console.log("photo", photo);

        const formData = new FormData();
        formData.append("file", {
          uri: photo.uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });

        const info = await postReceipt(formData);
        console.log(info);
        if (info) {
          postReceiptData(info);
          console.log("서버로 이미지 전송");
        }
      } catch (error) {
        console.log("Error taking picture: ", error);
      }
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const pickImageFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("status", status);

    if (status !== "granted") {
      console.log("Gallery permission denied");
      return;
    }

    try {
      const result =
        await ImagePicker.launchImageLibraryAsync(imagePickerOption);
      const selectedImageAssets = result.assets;
      if (!selectedImageAssets || selectedImageAssets.length === 0) {
        closeModal();
        return;
      }

      const formData = new FormData();
      formData.append("file", {
        uri: selectedImageAssets[0].uri,
        name: "photo.jpg",
        type: "image/jpeg",
      });

      const info = await postReceipt(formData);
      console.log(info);
      if (info) {
        postReceiptData(info);
        console.log("서버로 이미지 전송");
        Alert.alert("영수증 인증 성공");
        navigation.native("Home");
      }

      console.log("Image uploaded successfully");
      closeModal();
    } catch (error) {
      // console.error("Error picking an image: ", error);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              borderRadius: 40,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 20,
            }}
            onPress={takePicture}
          >
            <Text style={{ fontSize: 14 }}>촬영</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickImageFromGallery}>
            <Text style={{ fontSize: 18, color: "white" }}>
              갤러리에서 이미지 선택
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

export default CameraPage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0,0,0,0,6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBox: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 26,
  },
});
