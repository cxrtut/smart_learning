import { grade1_3Subjects, grade4_6Subjects, grade7Subjects } from "@/constants";

export const getSubjectsByGrade = (grade: string) => {
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
};

export const addSubject = (subjects: string[], subject: string) => {
    if(subjects.includes(subject)) {
        return subjects.filter((sub) => sub !== subject);
    }
    return [...subjects, subject];
}