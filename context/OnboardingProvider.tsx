import React, { createContext, PropsWithChildren, useContext, useReducer } from 'react';

export interface ActiveSubject {
    subjectName: string;
    subjectId: string;
}


export const OnboardingContext = createContext<{
    schoolLevel: string;
    gradeRange: string;
    activeSubject?: ActiveSubject;
    subjects: string[];
    setSchoolLevel: (schoolLevel: string) => void;
    setGradeRange: (gradeRange: string) => void;
    setActiveSubject?: (activeSubject: ActiveSubject) => void;
    setSubjects: (subjects: string[]) => void;
}>({
    schoolLevel: '',
    gradeRange: '',
    activeSubject: {subjectName: '', subjectId: ''},
    subjects: [],
    setSchoolLevel: () => null,
    setGradeRange: () => null,
    setActiveSubject: () => null,
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
    const [activeSubject, setActiveSubject] = React.useState({subjectName: '', subjectId: ''});
    const [subjects, setSubjects] = React.useState<string[]>([]);

    return (
        <OnboardingContext.Provider value={{schoolLevel, gradeRange, activeSubject, subjects, setSchoolLevel, setGradeRange, setActiveSubject, setSubjects}}>
            {children}
        </OnboardingContext.Provider>
    )
}

