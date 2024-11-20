import home from '@/assets/icons/home.png'
import profile from '@/assets/icons/profile.png'
import camera from '@/assets/icons/camera.png'
import chat from '@/assets/icons/chat.png'
import bookmark from '@/assets/icons/bookmark.png'
import chevron from '@/assets/icons/chevron.png'
import documnet from '@/assets/icons/document.png'
import folder from '@/assets/icons/folder.png'
import lockClosed from '@/assets/icons/lock-closed.png'
import search from '@/assets/icons/search.png'
import settingsIcon from '@/assets/icons/settings.png'
import google from '@/assets/icons/google.png'
import check from '@/assets/images/check.png'
import bg_3 from '@/assets/images/bg-8.jpg'
import onboarding13 from '@/assets/images/onboarding13.png'

export const icons = {
    home,
    profile,
    camera,
    chat,
    bookmark,
    chevron,
    documnet,
    folder,
    lockClosed,
    search,
    settingsIcon,
    google,
    
}

export const images = {
    check,
    bg_3,
    onboarding13,
}

export interface OnboardingState {
    schoolLevel: string;
    gradeRange: string;
    subjects: string[];
}

export const grade1_3Subjects = [
    {subject: 'Numeracy', id: '1'},
    {subject: 'Literacy', id: '2'},
    {subject: 'Life Skills', id: '3'},
]

export const grade4_6Subjects = [
    {subject: 'Mathematics', id: '1'},
    {subject: 'English', id: '2'},
    {subject: 'Life Orientation', id: '3'},
    {subject: 'Social Science', id: '4'},
    {subject: 'Natural Sciences and Technology', id: '5'},
]

export const grade7Subjects = [
    {subject: "Home Language", id: "1"},
    {subject: "First additional language", id: "2"},
    {subject: "Mathematics", id: "3"},
    {subject: "Natural Sciences", id: "4"},
    {subject: "Social Sciences", id: "5"},
    {subject: "Technology", id: "6"},
    {subject: "Economic Management Sciences", id: "7"},
    {subject:"Life Orientation", id: "8"},
    {subject: "Creative Arts", id: "9"},
]

export const grade8_9Subjects = [
    {subject: "Home Language", id: "1"},
    {subject: "First additional language", id: "2"},
    {subject: "Mathematics", id: "3"},
    {subject: "Natural Sciences", id: "4"},
    {subject: "Social Sciences", id: "5"},
    {subject: "Technology", id: "6"},
    {subject: "Economic Management Sciences", id: "7"},
    {subject:"Life Orientation", id: "8"},
    {subject: "Creative Arts", id: "9"},
]

export const grade10_12Subjects = [
    {subject: "Home Language", id: "1"},
    {subject: "First additional language", id: "2"},
    {subject: "Mathematics", id: "3"},
    {subject: "Physical Science", id: "4"},
    {subject: "Life Science", id: "5"},
    {subject: "Accounting", id: "6"},
    {subject:"Life Orientation", id: "8"},
    {subject: "Creative Arts", id: "9"},
]