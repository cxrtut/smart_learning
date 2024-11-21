import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { useClerk } from '@clerk/clerk-expo';
import CustomButton from '@/components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useOnboarding } from '@/context/onboardingContext';

const Profile = () => {
  const { user, signOut } = useClerk();

  const [name, setName] = useState(user?.firstName || '');
  const [email, setEmail] = useState(user?.emailAddresses?.[0]?.emailAddress || '');

  const { schoolLevel, gradeRange } = useOnboarding();

  const primaryGradeLevels = [
    { label: 'Grade 1 - 3', value: '1' },
    { label: 'Grade 4 - 6', value: '2' },
    { label: 'Grade 7', value: '3' },
  ];

  const secondaryGradeLevels = [
    { label: 'Grade 8 - 9', value: '4' },
    { label: 'Grade 10 - 12', value: '5' },
  ];

  const getSchoolLevelLabel = (level: string) => {
    switch (level) {
      case '1':
        return 'Primary';
      case '2':
        return 'Secondary';
      default:
        return 'Unknown';
    }
  };

  const getGradeLabel = (level: string) => {
    switch (schoolLevel) {
      case '1': // Primary school
        const primaryGrade = primaryGradeLevels.find((grade) => grade.value === level);
        return primaryGrade ? primaryGrade.label : 'Unknown'; // Return label
      case '2': // Secondary school
        const secondaryGrade = secondaryGradeLevels.find((grade) => grade.value === level);
        return secondaryGrade ? secondaryGrade.label : 'Unknown'; // Return label
      default:
        return 'Unknown'; // Default case for unknown levels
    }
  };

  const currentSchoolLevel = getSchoolLevelLabel(schoolLevel);
  const currentGradeLevel = getGradeLabel(gradeRange);

  return (
    <SafeAreaView style={{ backgroundColor: colors.PRIMARY }} className="w-full h-full flex items-center">
      <View className="p-4 mt-3 mr-[45%]">
        <Text className="text-2xl text-white">Smart Learning</Text>
      </View>

      <View className="items-center mt-10">
        <FontAwesome name="user-circle" size={200} color="white" />
      </View>

      <View className="items-center mt-5">
        <Text className="text-white mt-3 text-2xl font-bold">User Info</Text>
      </View>

      <View className="rounded-lg mt-2 border border-white" style={{ padding:22, marginHorizontal: 20 }}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          className="text-white text-lg font-bold border-b border-white mb-5 mt-1"
          style={{ color: 'white', fontSize: 18 }}
          editable={false}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          className="text-white text-lg font-bold border-b border-white mb-5 mt-3"
          style={{ color: 'white', fontSize: 18 }}
          editable={false}
        />
        <Text
          className="text-white text-lg font-bold border-b border-white mb-5 mt-3"
          style={{ color: 'white', fontSize: 18 }}
        >
          {currentSchoolLevel}
        </Text>
        <Text
          className="text-white text-lg font-bold border-b border-white mb-5 mt-3"
          style={{ color: 'white', fontSize: 18 }}
        >
          Grade Level: {currentGradeLevel || 'N/A'}
        </Text>
      </View>

      <CustomButton
        title="Sign Out"
        className="w-[55%] mt-[40] bg-white"
        bgVariant="outline"
        textVariant="secondary"
        onPress={() => signOut()}
      />
    </SafeAreaView>
  );
};

export default Profile;
