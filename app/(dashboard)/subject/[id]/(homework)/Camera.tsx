import { View, Text, Platform, Linking } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera, CameraPermissionStatus, useCameraDevice, useCameraPermission } from 'react-native-vision-camera'
import { Href, Redirect, useRouter } from 'expo-router'
import { BlurView } from 'expo-blur'
import { TouchableHighlight } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import CameraButton from '@/components/CameraButton'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'react-native'
import * as ExpoMediaLibrary from 'expo-media-library'
import colors from '@/constants/colors'

const CameraScreen = () => {
  const {hasPermission} = useCameraPermission()
  const redirectToPermissions = !hasPermission
  console.log("Has permission: ", hasPermission)
  
  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "back"
  );
  const [showZoomControls, setShowZoomControls] = useState(false);
  const [showExposureControls, setShowExposureControls] = useState(false); 

  const router = useRouter()

  const camera = useRef<Camera>(null);
  const device = useCameraDevice(cameraPosition)

  console.log("Device: ", device?.name)
  console.log("StatusBar: ", StatusBar.currentHeight)
  console.log("Android: ", Platform.OS)

  const [zoom, setZoom] = React.useState(device?.neutralZoom);
  const [exposure, setExposure] = React.useState(0);
  const [flash, setFlash] = useState<"off" | "on">("off");
  const [torch, setTorch] = useState<"off" | "on">("off");

  const takePicture = async () => {
    try {
      if(camera.current == null) throw new Error("Camera ref is null")

        console.log("Taking picture...")
        const photo = await camera.current.takePhoto({
          flash: flash,
          enableShutterSound: true,
        })

        router.push({
          pathname: '/(dashboard)/subject/[id]/(homework)/Homework',
          //@ts-ignore
          params: {media: photo.path, type: 'photo'}
        })
    } catch (e) {
      console.log(e);
    }
  }

  if(redirectToPermissions) return <Redirect href={'/(dashboard)/subject/[id]/(homework)/Homework' as Href} />

  return (
    <SafeAreaView style={styles.container} >
      <View style={{flex:3, borderRadius: 10, overflow: "hidden", backgroundColor: "black"}}>
          <Camera 
            ref={camera}
            style={{flex: 1}} 
            device={device!} 
            isActive
            zoom={zoom}
            resizeMode='cover'
            exposure={exposure}
            torch={torch}
            video
            photo
          />
          <BlurView
            intensity={100}
            tint="systemThinMaterialDark"
            style={{
              flex: 1,
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 10,
            }}
            experimentalBlurMethod="dimezisBlurView"
          >
            <Text
              style={{
                color: "white",
              }}
            >
              Exposure: {exposure} | Zoom: x{zoom}
            </Text>
          </BlurView>
        </View>

        <View style={{flex: 1, backgroundColor: "black"}}>

          <View style={{flex: 0.7, flexDirection: "row",justifyContent: "space-evenly",}}>
            <CameraButton
                iconName={torch === "on" ? "flashlight" : "flashlight-outline"}
                onPress={() => setTorch((t) => (t === "off" ? "on" : "off"))}
                containerStyle={{ alignSelf: "center" }}
              />
            <CameraButton
              iconName={
                flash === "on" ? "flash-outline" : "flash-off-outline"
              }
              onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
              containerStyle={{ alignSelf: "center" }}
            />
            <CameraButton
              iconName="camera-reverse-outline"
              onPress={() =>
                setCameraPosition((p) => (p === "back" ? "front" : "back"))
              }
              containerStyle={{ alignSelf: "center" }}
            />
            <CameraButton
              iconName="image-outline"
              onPress={() => {
                const link = Platform.select({
                  ios: "photos-redirect://",
                  android: "content://media/external/images/media",
                });
                Linking.openURL(link!);
              }}
              containerStyle={{ alignSelf: "center" }}
            />
            <CameraButton
              iconName="settings-outline"
              onPress={() => router.push("/_sitemap")}
              containerStyle={{ alignSelf: "center" }}
            />
          </View>
          <View style={{
              flex: 1.1, 
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}>
              <CameraButton
                iconSize={40}
                title="+/-"
                onPress={() => setShowZoomControls((s) => !s)}
                containerStyle={{ alignSelf: "center" }}
              />

              <TouchableHighlight onPress={takePicture}>
                <FontAwesome5 name="dot-circle" size={55} color="white" />
              </TouchableHighlight>

              <CameraButton
                iconSize={40}
                title="1x"
                onPress={() => setShowExposureControls((s) => !s)}
                containerStyle={{ alignSelf: "center" }}
              />
          </View>
        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "black",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});

export default CameraScreen