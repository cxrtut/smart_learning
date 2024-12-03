import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo';
import { useOnboarding } from '@/context/onboardingContext';
import { getVideoTitle } from '@/utils';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import colors from '@/constants/colors';
import CustomCard from '@/components/CustomCard';
import { Href, router } from 'expo-router';

const SelectTopic = () => {
    const { user } = useUser();
    const { activeSubject } = useOnboarding();
    const [topics, setTopics] = useState<{ title: string;}[]>([])
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const loadVideoTitle = async () => {
          if (!user?.id) return;
          setLoading(true);
          setFetchError(null); // Reset error state before each fetch
          try {
            const data = await getVideoTitle(user?.id);
    
            // Filter videos based on the active subject
            const subjectVideoTitles = data.filter((title) => title.subject_name === activeSubject?.subjectName);
    
            if (subjectVideoTitles.length > 0) {
              setTopics(subjectVideoTitles);
            } else {
              setFetchError("No videos available for this subject.");
            }
          } catch (error) {
            console.error("Error loading videos", error);
            setFetchError("Failed to load video data.");
          } finally {
            setLoading(false);
          }
        };
    
        loadVideoTitle();
    }, [user?.id, activeSubject?.subjectName]);

    return (
        <SafeAreaView style={{backgroundColor: colors.PRIMARY}} className='flex h-full w-full'>
            <CustomHeader 
                title='Please select a topic'
                showBackButton={true}
            />
            <ScrollView className='h-full p-5 pb-3'>
                <View className='flex items-center justify-center pb-3'>
                    {topics.map((topic: any, index: number) => (
                        <CustomCard 
                            key={index}
                            label={topic.title}
                            headingStyle='text-lg'
                            subTitle={`Start quiz  (4 questions)  `}
                            onPressAction={
                              () => {
                                console.log("Our Topic: ",topic.title)
                                const realTopic = topic.title
                                router.push({
                                  pathname: `/(dashboard)/subject/[id]/(quiz)/Quiz`,
                                  params: { id: index, topic: realTopic}
                                })
                              }
                            } 
                        />
                    ))}
                </View>
            </ScrollView>
            <View className='h-[12%]'>

            </View>
            </SafeAreaView>
    )
}

export default SelectTopic