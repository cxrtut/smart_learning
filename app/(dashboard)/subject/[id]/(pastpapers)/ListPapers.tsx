import { View, Text, FlatList, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import { RelativePathString, router, useLocalSearchParams } from 'expo-router'
import { useOnboarding } from '@/context/OnboardingProvider'
import CustomCard from '@/components/CustomCard'
import { supabase } from '@/lib/supabase'

const ListPapers = () => {
  const {year, grade} = useLocalSearchParams()
  const {activeSubject} = useOnboarding()
  const [files, setFiles] = useState<{filename:string, path:string, url:string}[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
      const listFilesInFolder = async () => {
        try {
            setIsLoading(true)
            const folderPath =  `${grade}/${activeSubject?.subjectName}/${year}/`

            const {data, error} = await supabase.storage
            .from('pdfBucket')
            .list(folderPath)
    
            if (error) {
                console.log('Error listing files', error)
                return []
            }
    
            const files = await Promise.all(data.map(async (file) => {
                const filePath = `${folderPath}${file.name}`
                const {data: urlData} = await supabase.storage
                .from('pdfBucket')
                .getPublicUrl(filePath)
    
                return {
                    filename: file.name,
                    path: filePath,
                    url: urlData.publicUrl
                }
            }))

            setFiles(files)
            setIsLoading(false)

        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }

    }

    listFilesInFolder()
  }, [])

  if(isLoading) {
    return (
        <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: "#cbd5e1", padding: 0}}>
            <CustomHeader 
                title={`${activeSubject?.subjectName} | ${year as string}`}
                subtitle='Past Papers for the selected year'
                showBackButton={true}
            />
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size='large' color='purple' />
            </View>
        </View>
    )
  }

  const openFile = (url: string, filename: string) => {
    router.push({
        pathname: `/(dashboard)/subject/${activeSubject?.subjectId}/PdfViewer` as RelativePathString,
        params: {url: url, year: year, filename: filename},
    })
  }

  const renderFiles = ({ item }: { item: { filename: string, path: string, url: string } }) => (
    <CustomCard
      label={`${grade as string} - ${year as string} Past Paper`}
      headingStyle='text-lg'
      subTitle={item.filename.split('.')[0]}
      onPressAction={() => openFile(item.url, item.filename.split('.')[0])}
    />
  )

  return (
    <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: "#cbd5e1", padding: 0}}>
      <CustomHeader 
          title={`${activeSubject?.subjectName} | ${year as string}`}
          subtitle='Past Papers for the selected year'
          showBackButton={true}
      />
      <View style={{padding: 10}}>
        <FlatList
          data={files}
          renderItem={renderFiles}
          keyExtractor={(item) => item.path}
        />
      </View>
    </View>
  )
}

export default ListPapers