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


import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";

import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import dollar from "@/assets/icons/dollar.png";
import email from "@/assets/icons/email.png";
import eyecross from "@/assets/icons/eyecross.png";

import list from "@/assets/icons/list.png";
import lock from "@/assets/icons/lock.png";
import map from "@/assets/icons/map.png";
import marker from "@/assets/icons/marker.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";

import selectedMarker from "@/assets/icons/selected-marker.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";

import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import teach from "@/assets/images/teach.png";

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
    arrowDown,
    arrowUp,
    backArrow,
    checkmark,
    close,
    dollar,
    email,
    eyecross,
    list,
    lock,
    map,
    marker,
    out,
    person,
    pin,
    point,
    selectedMarker,
    star,
    target,
    to,
}

export const images = {
    check,
    teach,
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