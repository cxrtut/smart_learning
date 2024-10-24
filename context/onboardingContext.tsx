import { OnboardingState } from '@/constants';
import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';



export const OnboardingContext = createContext<{
    schoolLevel: string;
    gradeRange: string;
    subjects: string[];
    setSchoolLevel: (schoolLevel: string) => void;
    setGradeRange: (gradeRange: string) => void;
    setSubjects: (subjects: string[]) => void;
}>({
    schoolLevel: '',
    gradeRange: '',
    subjects: [],
    setSchoolLevel: () => null,
    setGradeRange: () => null,
    setSubjects: () => null,
});

export const useOnboarding = () => {
    const context = useContext(OnboardingContext);
    if(process.env.NODE_ENV !== 'production') {
        if (!context) {
            throw new Error('useOnboarding must be used within a OnboardingProvider');
        }
    }
    return context;
}

export const OnboardingProvider = ({children}: PropsWithChildren) => {
    const [schoolLevel, setSchoolLevel] = React.useState('');
    const [gradeRange, setGradeRange] = React.useState('');
    const [subjects, setSubjects] = React.useState<string[]>([]);

    return (
        <OnboardingContext.Provider value={{schoolLevel, gradeRange, subjects, setSchoolLevel, setGradeRange, setSubjects}}>
            {children}
        </OnboardingContext.Provider>
    )
}

