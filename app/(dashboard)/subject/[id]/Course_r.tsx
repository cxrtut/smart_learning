import { SafeAreaView } from "react-native-safe-area-context"
import colors from '@/constants/colors';
import CustomHeader from '@/components/CustomHeader';
import { useOnboarding } from '@/context/onboardingContext';
import { View, Text, Image, TouchableOpacity } from 'react-native';




const Course_r = () => {
    
 

    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="flex h-full w-full">
    <CustomHeader
                title={'Course Result'}
                showBackButton={true}
                headerStyles="pr-3"
            />

             <Text className="text-black-500 font-bold">Next</Text>

    </SafeAreaView>


}
export default Course_r;


