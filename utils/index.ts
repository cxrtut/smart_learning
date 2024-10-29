import { grade10_12Subjects, grade1_3Subjects, grade4_6Subjects, grade7Subjects, grade8_9Subjects } from "@/constants";

export const getSubjectsByGradeAndSchool = (grade: string, school: string) => {
    if(school === '1') {
        switch(grade) {
            case '1':
                return grade1_3Subjects;
                break;
            case '2':
                return grade4_6Subjects;
                break;
            case '3':
                return grade7Subjects;
                break;
        }
    } else {
        // Secondary school subjects
        switch(grade) {
            case '1':
                return grade8_9Subjects;
                break;
            case '2':
                return grade10_12Subjects;
                break;
        }
    }
};

export const addSubject = (subjects: string[], subject: string) => {
    if(subjects.includes(subject)) {
        return subjects.filter((sub) => sub !== subject);
    }
    return [...subjects, subject];
}