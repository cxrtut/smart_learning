import { View, Text, TextInput, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import colors from '@/constants/colors';
import { useClerk } from '@clerk/clerk-expo';
import CustomButton from '@/components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useOnboarding } from '@/context/onboardingContext';
import CustomHeader from '@/components/CustomHeader';
import { Image } from 'react-native';
import { images } from '@/constants';
import CustomCard from '@/components/CustomCard';

const Profile = () => {
  const { user, signOut } = useClerk();

  const [name, setName] = useState(user?.firstName || '');
  const [email, setEmail] = useState(user?.emailAddresses?.[0]?.emailAddress || '');
  const userImage = user?.imageUrl;

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
      <CustomHeader 
          title="Smart Learning"
          showBackButton={false}
      />

      <View className="flex w-full items-center bg-white h-40">
        <ImageBackground
          source={images.bg_3}
          className='w-full h-full'
        />
        {userImage ? <Image
          source={{ uri: userImage }}
          className='w-[200px] h-[200px] rounded-full border-[15px] border-black absolute top-10'
        /> : <FontAwesome name="user" size={100} color="black" style={{ top: 10 }} />}
      </View>

      <View className='mt-24 flex h-full w-full px-6'>
        <CustomCard 
            label='Username'
            headingStyle='text-lg'
            subTitle={name}
        />
        <CustomCard 
            label='Email' 
            headingStyle='text-lg'
            subTitle={email}
        />
        <CustomCard 
            label='School level'
            headingStyle='text-lg'
            subTitle={currentSchoolLevel}
        />
        <CustomCard 
            label='Grade Level'
            headingStyle='text-lg'
            subTitle={currentGradeLevel}
        />
        <View className='flex w-full items-center justify-center mt-4'>
          <CustomButton
            title="Sign Out"
            className="w-[55%] bg-white"
            bgVariant="outline"
            textVariant="secondary"
            onPress={() => signOut()}
          />
        </View>
      </View>

      {/* <View className="mt-5">
        <Text className="text-white mt-3 mr-[62%] text-2xl font-bold">User Info</Text>
      </View> */}

      {/* <View className="rounded-lg mt-2 border-[0.5px] border-white p-6 w-[90%] bg-white" >
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          className="text-white text-lg font-bold border-b border-white mb-3 mt-1"
          style={{ color: 'white', fontSize: 18 }}
          editable={false}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          className="text-white text-lg font-bold border-b border-white mb-3 mt-3"
          style={{ color: 'white', fontSize: 18 }}
          editable={false}
        />
        <Text
          className="text-gray-700 text-lg font-normal border-b-[0.5px] border-white mb-3 mt-3"
        >
         School level: {currentSchoolLevel}
        </Text>
        <Text
          className="text-gray-700 text-lg font-normal border-b border-white mb-5 mt-3"
        >
          Grade Level: {currentGradeLevel || 'N/A'}
        </Text>
      </View> */}

      
    </SafeAreaView>
  );
};

export default Profile;
