import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Linking, Alert } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import CameraButton from '@/components/CameraButton'
import { RelativePathString, useRouter } from 'expo-router'
import { Camera, useCameraDevice, useCameraFormat } from 'react-native-vision-camera'
import { analyzeImage } from '@/utils'
import { useFileContext } from '@/context/FileProvider'
import { useOnboarding } from '@/context/OnboardingProvider'

const CameraScreen = () => {
  const {
      setocrFileContents,
      setFileUri, 
      setFileName
  } = useFileContext()
  const {activeSubject} = useOnboarding()
  const [cameraPosition, setCameraPosition] = useState<"front" | "back">("back")
  const [flash, setFlash] = useState<"off" | "on">("off")
  const [torch, setTorch] = useState<"off" | "on">("off")
  const [exposure, setExposure] = React.useState(0);
  
  const router = useRouter()
  
  const camera = useRef<Camera>(null);
  const device = useCameraDevice(cameraPosition)
  const format = useCameraFormat(device, [
    { photoHdr: true },
  ])

  const [zoom, setZoom] = React.useState(device?.neutralZoom);

  const takePicture = async () => {
    try {
      if(camera.current == null) throw new Error("Camera ref is null")
        
      console.log("Taking picture...")
      const photo = await camera.current.takePhoto({
        flash: flash,
        enableShutterSound: true,
      })

      if(photo == null) throw new Error("Photo is null")
       
      if(photo) {
        console.log("Photo taken:", photo.path)
        const fileUri = 'file://'+ photo.path
        setFileUri(fileUri)

        const ocrContent = await analyzeImage(fileUri)

        if(ocrContent) {
          setocrFileContents(ocrContent.responses[0].textAnnotations[0].description)
          router.dismissAll()
          router.push(`/(dashboard)/subject/${activeSubject?.subjectId}/OCRConfirm` as RelativePathString)
        } else if(ocrContent.error) {
          Alert.alert("OCR Error", ocrContent.error)
        }
      } else {
        Alert.alert("Error", "An error occured while trying to take a picture")
        return
      }
      
    } catch (error: any) {
      console.log("Failed to take picture", error)
      Alert.alert('Error', error.message)
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={{flex:3, borderRadius: 10, overflow: "hidden", backgroundColor: "black"}}>
        <Camera 
              ref={camera}
              style={{flex: 1}} 
              device={device!} 
              format={format}
              photoHdr={format?.supportsPhotoHdr}
              isActive
              zoom={zoom}
              resizeMode='cover'
              exposure={exposure}
              torch={torch}
              video
              photo
            />
      </View>

      <View style={{flex: 1, backgroundColor: "black"}}>
        <View style={{flex: 0.7, flexDirection: "row",justifyContent: "space-evenly",}}>
          <CameraButton
            iconName={torch === "on" ? "flashlight" : "flashlight-outline"}
            onPress={() => setTorch((t) => (t === "off" ? "on" : "off"))}
            containerStyle={{ alignSelf: "center" }}
          />
          <CameraButton
              iconName={flash === "on" ? "flash-outline" : "flash-off-outline"}
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
        </View>

        <View style={{
          flex: 1.1, 
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}>
          <TouchableOpacity onPress={takePicture}>
            <FontAwesome5 name="dot-circle" size={55} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CameraScreen

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
})