import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import CustomHeader from '@/components/CustomeHeader'
import CustomAccordion from '@/components/CustomAccordion'
import { supabase } from '@/lib/supabase'

const SelectYear = () => {
    const {grade, subject} = useLocalSearchParams()
    const [years, setYears] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const listPastPapers = async () => {
            setIsLoading(true)
            const folderPath =  `${grade}/${subject}/`
    
            const {data, error} = await supabase.storage
            .from('pdfBucket')
            .list(folderPath)

            if(error) {
                console.log("Error fetching past papers: ", error.message)
            }

            if(data) {
                console.log("Past papers: ", data.map((item) => item.name))
                setYears(data.map((item) => item.name))
                setIsLoading(false)
            }
        }
        listPastPapers()
    }, [])

    return (
        <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: "#cbd5e1", padding: 0}}>
            <CustomHeader 
                title={subject as string}
                subtitle='Please select year'
                showBackButton={true}
            />

            <View style={{padding: 10}}>
                <CustomAccordion
                    grade={`${grade as string}`}
                    subtitle='Select a year to view past papers'
                    isLoading={isLoading}
                    content={years}
                />
            </View>
        </View>
    )
}

export default SelectYear