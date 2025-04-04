import { View, Text, TextInput, TouchableOpacity, Alert, FlatList, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import { useOnboarding } from '@/context/OnboardingProvider'
import { extractYouTubeVideoId, fetchYouTubeThumbnail, getSubjectVideosBySubjectId } from '@/utils'
import CustomCard from '@/components/CustomCard'
import { RelativePathString, router } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign'
import SearchCard from '@/components/SearchCard'

interface VideoListProps {
    videoId: string
    videoTitle: string
    thumbnail?: string
    videoDescription: string
}

const VideoList = () => {
    const {activeSubject} = useOnboarding()
    const [subjectVideos, setSubjectVideos] = useState<
        { 
            title: string; 
            description: string; 
            video_url: string; 
            thumbnail?: string 
        }[]>([])
    const [isEmpty, setIsEmpty] = useState(false)
    const videoTitle = activeSubject?.subjectName || 'Video List';
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchComplete, setIsSearchComplete] = useState(false);

    const handleSearch = async () => {
        try {
          // Replace with your actual YouTube Data API search implementation
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&key=${process.env.EXPO_PUBLIC_YOUTUBE_API_KEY}`
          )

          if(response.ok) {
            const data = await response.json();
            console.log(data.items)
            setIsSearchComplete(true);
            setSearchResults(data.items);

          } else {
            console.error('Failed to search for videos:', response.status, response.statusText);
            Alert.alert('Error', 'Failed to search for videos');
          }
        } catch (error) {
          console.error('Error searching for videos:', error);
          Alert.alert('Error', 'Failed to search for videos');
          setSearchResults([]); 
        }
    }

    useEffect(() => {
        const fetchSubjectVideos = async () => {
            console.log(isSearchComplete)
            try {
                const response = await getSubjectVideosBySubjectId(activeSubject?.subjectId as string)
                
                if(response.length > 0) {
                    const updatedVideos = await Promise.all(
                        response.map(async (video) => {
                            const videoId = extractYouTubeVideoId(video.video_url); // Helper function to get YouTube video ID
                            const thumbnailUrl = await fetchYouTubeThumbnail(videoId);
                            return { ...video, thumbnail: thumbnailUrl };
                        })
                    );

                    setSubjectVideos(updatedVideos)
                } else {
                    setIsEmpty(true)
                    
                }
            } catch (error) {
                console.log(error)
                Alert.alert('Error', 'Failed to fetch subject videos')
            }
        }
        fetchSubjectVideos()
    }, [])

    const databaseVideos = ({item} : { item: any }) => {
        return (
            <SearchCard
                label = {item.title}
                subTitle = {item.description}
                customStyles = 'w-full'
                headerImage={item.thumbnail}
                onPressAction = {() => {
                    const videoId = extractYouTubeVideoId(item.video_url)
                    router.push({
                        pathname: `/(dashboard)/subject/${activeSubject?.subjectId}/VideoPlayer` as RelativePathString,
                        params: {videoId: videoId, videoTitle: item.title, videoDescription: item.description}
                    })
                }}
            />
        )
    }

    const searchResultsList = ({item} : { item: any }) => {
        console.log(item.snippet.thumbnails.default.url)
        return (
            <SearchCard
                label={item.snippet.channelTitle}
                subTitle={item.snippet.title}
                customStyles='w-full'
                headerImage={item.snippet.thumbnails.high.url}
                onPressAction={() => {
                    const videoId = item.id.videoId
                    router.push({
                        pathname: `/(dashboard)/subject/${activeSubject?.subjectId}/VideoPlayer` as RelativePathString,
                        params: {videoId: videoId, videoTitle: item.snippet.channelTitle, videoDescription: item.snippet.title}
                    })
                }}
            />
        )
    }



    return (
        <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: '#cbd5e1'}}>
            <CustomHeader  
                    title={activeSubject?.subjectName as string}
                    subtitle={videoTitle}
                    showBackButton={true}
                    headerStyles='pr-3'
            />
            <View style={{flexDirection: 'row', gap: 16, alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: 20}}>
                <View className='flex' style={{ width: '85%'}} >
                    <TextInput
                        style={{height: 50, borderColor: 'gray', borderWidth: 1, borderRadius: 999, paddingLeft: 10, width: '100%'}}
                        placeholder="Search for videos"
                        onChangeText={(text) => setSearchQuery(text)}
                        value={searchQuery}
                    />
                </View >
                <View className='bg-green-400'>
                    <TouchableOpacity style={{padding: 10, borderRadius: 999, borderColor: 'gray', borderWidth: 1}} onPress={handleSearch}>
                        <AntDesign name="search1" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            <View className='flex-1 items-center w-full'>
                {!isEmpty ? (
                    <FlatList
                        className='w-full p-3 h-full'
                        data={isSearchComplete ? searchResults : subjectVideos}
                        renderItem={isSearchComplete ? searchResultsList : databaseVideos}
                        keyExtractor={(item) => item.video_url} 
                />) : (
                    <View className='flex-1 justify-center items-center p-5'>
                        <Image
                            source={require('@/assets/images/fail_image.png')}
                            style={{height: "50%",aspectRatio: 1, resizeMode: "contain"}}
                        />
                        <Text className='text-lg mt-2 text-gray-700 text-center px-5 font-light mb-3'>
                            Ohh No!, There are no videos available for this subject, Try again later.
                        </Text>
                        <TouchableOpacity 
                            style={{backgroundColor: '#5470FD', padding: 16, borderRadius: 999, width: '100%'}}
                            onPress={() => router.back()}
                        >
                            <Text className='text-white text-center text-md font-medium'>
                                Try Again
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    )
}

export default VideoList