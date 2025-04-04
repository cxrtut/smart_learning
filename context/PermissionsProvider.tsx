import React, { createContext, useContext } from "react";
import { CameraPermissionStatus } from "react-native-vision-camera";
import * as ExpoMediaLibrary from 'expo-media-library'


export const PermissionsContext = createContext<{
    cameraPermissionStatus: CameraPermissionStatus
    setCameraPermissionStatus: React.Dispatch<React.SetStateAction<CameraPermissionStatus>>
    mediaLibraryPermission: ExpoMediaLibrary.PermissionResponse | null
    requestMediaLibraryPermission: () => Promise<ExpoMediaLibrary.PermissionResponse>
}>({
    cameraPermissionStatus: "not-determined",
    setCameraPermissionStatus: () => {},
    mediaLibraryPermission: null,
    requestMediaLibraryPermission: async () => ({
        status: ExpoMediaLibrary.PermissionStatus.UNDETERMINED,
        expires: "never",
        granted: false,
        canAskAgain: true
    })
})

export const PermissionsProvider= ({ children }: {children: React.ReactNode}) => {
    const [cameraPermissionStatus, setCameraPermissionStatus] = React.useState<CameraPermissionStatus>("not-determined")
    const [mediaLibraryPermission, requestMediaLibraryPermission] = 
        ExpoMediaLibrary.usePermissions()

    return (
        <PermissionsContext.Provider value={{ cameraPermissionStatus, setCameraPermissionStatus, mediaLibraryPermission, requestMediaLibraryPermission }}>
            {children}
        </PermissionsContext.Provider>
    )
}

export const usePermissionsContext = () => useContext(PermissionsContext)