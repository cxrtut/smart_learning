import { createContext, useContext, useState } from "react";

interface FileContextProps {
    fileName?: string;
    fileUri: string;
    fileType?: string;
    ocrFileContents: string | null;
    setFileUri: (fileUri: string) => void;
    setFileType: (fileType: string) => void;
    setocrFileContents: React.Dispatch<React.SetStateAction<string>>;
    setFileName: (fileName: string) => void;
}
export const FileContext = createContext<FileContextProps>({
    fileName: "",
    fileUri: "",
    fileType: "",
    ocrFileContents: "",
    setFileUri: () => {},
    setFileType: () => {},
    setocrFileContents: () => {},
    setFileName: () => {},
}) 

export const FileProvider = ({children}: {children: React.ReactNode}) => {
    const [fileName, setFileName] = useState("")
    const [fileUri, setFileUri] = useState("")
    const [fileType, setFileType] = useState("")
    const [ocrFileContents, setocrFileContents] = useState("")
    return (
        <FileContext.Provider value={{fileName, fileUri, fileType, ocrFileContents, setFileUri, setFileType, setocrFileContents, setFileName}}>
            {children}
        </FileContext.Provider>
    )
}

export const useFileContext = () => useContext(FileContext)