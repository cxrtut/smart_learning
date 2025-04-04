import { RelativePathString, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useOnboarding } from '@/context/OnboardingProvider';

const CustomAccordion = ({ 
    grade, 
    content, 
    onPressAction,
    subtitle,
    isLoading 
}: {
    grade: string, 
    content: string[], 
    subtitle?: string,
    isLoading?: boolean
    onPressAction?: (year:string) => void
}) => {
    const {activeSubject} = useOnboarding()
    const id = activeSubject?.subjectId
    const [isOpen, setIsOpen] = useState(false);
    const moveToNextScreen = (year: string) => {
        console.log("Move to next screen with year: ", year)
        router.push({
            pathname: `/(dashboard)/subject/${id}/ListPapers` as RelativePathString,
            params: {
                year: year,
                grade: grade
            }
        })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.card, isOpen && styles.cardOpen]} onPress={() => setIsOpen(!isOpen)} activeOpacity={0.8}>
                <View style={{flex: 1}}>
                    <Text style={styles.title}>{grade}</Text>
                    <Text style={styles.subTitle}>{subtitle}</Text>
                </View>
                {isOpen 
                    ? <AntDesign name="upcircleo" size={20} color="black" /> 
                    : <AntDesign name="downcircleo" size={20} color="black" />
                }
            </TouchableOpacity>
            {isOpen && (
                isLoading ? (
                    <View style={styles.contentContainer}>
                        <ActivityIndicator size='large' color='purple' />
                    </View>
                ) : (
                    <View style={styles.contentContainer}>
                        {content.length < 1 
                        ? <Text>No past question papers yet</Text>
                        : content.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.contentItemBtn} 
                                onPress={() => onPressAction ? onPressAction(item) : moveToNextScreen(item)}
                            >
                                <Text style={styles.content}>{item}</Text>
                            </TouchableOpacity>
                        ))
                    }
                    </View>
                )
            )}
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'light',
  },
  contentContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10
  },
  contentItemBtn: {
    padding: 20,
    backgroundColor: '#afbcff',
    width: '100%',
    marginBottom: 3,
    borderRadius: 10,
  },
  content: {
    fontSize: 14,
    color: '#000',
    marginBottom: 4,
  },
});
export default CustomAccordion;