import { icons } from '@/constants';
import {
    KeyboardAvoidingView,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';

// Define the props type
interface InputFieldProps {
    label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label }) => (
    <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
            <View className="my-2 w-full">
                <Text className={`text-lg font-JakartaSemiBold mb-3`}>
                    {label}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

export default InputField;
