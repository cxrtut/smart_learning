import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import CustomHeader from '@/components/CustomeHeader'
import { useLocalSearchParams } from 'expo-router'
import { useOnboarding } from '@/context/OnboardingProvider'
import Pdf from 'react-native-pdf'

const PdfViewer = () => {
    const {year, url, filename} = useLocalSearchParams()
    const {activeSubject} = useOnboarding()

    const onlineSource = {uri: url as string, cache: true}
    const [pdfSource, setPdfSource] = useState(onlineSource)
    const pdfRef = useRef<Pdf | null>(null)

    return (
        <View style={{flex: 1, height: '100%', width: '100%', backgroundColor: "#cbd5e1", padding: 0}}>
            <CustomHeader 
                title={`${activeSubject?.subjectName} | ${year as string}`}
                subtitle={filename as string}
                showBackButton={true}
            />
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Pdf
                    source={pdfSource}
                    ref={pdfRef} 
                    trustAllCerts={false}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link pressed: ${uri}`)
                    }}
                    style={styles.pdf}
                />
            </SafeAreaView>
        </View>
    )
}

export default PdfViewer

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 1
      },
      pdf: {
        flex: 1,
        alignSelf: "stretch"
      }
})