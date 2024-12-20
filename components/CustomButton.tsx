import { ButtonProps } from "@/types/type"
import { Text, TouchableOpacity } from "react-native"

const getBgVariantStyle = (variant: ButtonProps['bgVariant']) => {
    switch (variant) {
        case "secondary":
            return "bg-gray-500"
        case "danger":
            return "text-[#FF0000]"
        case "success":
            return "bg-green-500"
        case "outline":
            return "bg-transparent border-[0.5px] border-neutral-300"
        default:
            return "bg-[#0286ff]"
    }
}

const getTextVariantStyle = (variant: ButtonProps['textVariant']) => {
    switch (variant) {
        case "primary":
            return "text-black"
        case "secondary":
            return "text-[#5470FD]"
        case "danger":
            return "text-[#FF0000]"
        case "success":
            return "text-green-100"
        default:
            return "text-white"
    }
}

const CustomButton = ({
    onPress, 
    title, 
    bgVariant= "primary", 
    textVariant="default", 
    IconRight, 
    IconLeft, 
    className, 
    ...props
}: ButtonProps) => (
    <TouchableOpacity 
        onPress={onPress}
        className={` p-3 rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
        {...props}
    >
        {IconLeft && <IconLeft />}

        <Text 
            className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}
        >
            {title}
        </Text>

        {IconRight && <IconRight />}
    </TouchableOpacity>
)

export default CustomButton