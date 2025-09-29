"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "hi" | "pa" | "ta" | "te" | "ml"

interface Translation {
  [key: string]: string | Translation
}

interface I18nContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  languages: { code: Language; name: string; nativeName: string; flag: string }[]
}

const languages = [
  { code: "en" as Language, name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "hi" as Language, name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "pa" as Language, name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "ta" as Language, name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te" as Language, name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "ml" as Language, name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
]

const translations: Record<Language, Translation> = {
  en: {
    // Common
    welcome: "Welcome",
    loading: "Loading",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    add: "Add",
    search: "Search",
    filter: "Filter",
    close: "Close",
    submit: "Submit",
    continue: "Continue",
    back: "Back",
    next: "Next",

    // Navigation
    dashboard: "Dashboard",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",

    // Authentication
    signIn: "Sign In",
    signUp: "Sign Up",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    role: "Role",
    school: "School",
    welcomeBack: "Welcome Back",
    joinEcoLearn: "Join EcoLearn",
    signInToContinue: "Sign in to continue your eco-journey",
    startJourney: "Start your environmental education journey",
    alreadyHaveAccount: "Already have an account? Sign in",
    dontHaveAccount: "Don't have an account? Sign up",

    // Roles
    student: "Student",
    teacher: "Teacher",
    admin: "Admin",

    // Student Dashboard
    ecoPoints: "Eco-Points",
    yourEcoJourney: "Your Eco-Journey",
    dailyChallenges: "Daily Challenges",
    yourProgress: "Your Progress",
    connectWithPeers: "Connect with Peers",
    lessonsCompleted: "Lessons Completed",
    quizzesPassed: "Quizzes Passed",
    challengesDone: "Challenges Done",
    challengeStreak: "Challenge Streak",
    daysInARow: "days in a row",
    onFire: "On Fire!",
    todaysProgress: "Today's Progress",
    challengesCompleted: "Challenges Completed",
    challengesRemaining: "challenges remaining",
    todaysChallenges: "Today's Challenges",

    // Teacher Dashboard
    classEngagement: "Class Engagement Heatmap",
    studentProgress: "Student Progress Tracker",
    classChallenges: "Class Challenges",
    automatedAlerts: "Automated Alerts",
    averageEngagement: "Average Engagement",
    totalStudents: "Total Students",
    daysTracked: "Days Tracked",
    systemUptime: "System Uptime",
    createChallenge: "Create Challenge",

    // Admin Dashboard
    systemOverview: "System Overview",
    userManagement: "User Management",
    analytics: "Analytics",
    totalUsers: "Total Users",
    activeSchools: "Active Schools",
    systemStatus: "System Status",
    online: "Online",

    // Gamification
    achievements: "Achievements",
    badges_collection: "Badges Collection",
    leaderboard: "Leaderboard",
    level: "Level",
    points: "Points",
    progress: "Progress",
    unlocked_on: "Unlocked on",
    no_achievements_found: "No achievements found",
    all: "All",
    unlocked: "Unlocked",
    locked: "Locked",
    learning: "Learning",
    social: "Social",
    environmental: "Environmental",
    streak: "Streak",
    common: "Common",
    rare: "Rare",
    epic: "Epic",
    legendary: "Legendary",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    all_time: "All Time",
    your_position: "Your Position",
    day_streak: "Day Streak",
    keep_learning_climb_leaderboard: "Keep learning to climb the leaderboard!",
    total_points: "Total Points",
    progress_to_next_level: "Progress to Next Level",
    points_to_next_level: "points to next level",
    next_level_unlocks: "Next level unlocks",
    new_avatar_options: "New Avatar Options",
    exclusive_challenges: "Exclusive Challenges",
    bonus_points: "Bonus Points",
    rank: "Rank",

    // Challenges
    waterConservation: "Water Conservation",
    plasticFreeLunch: "Plastic-Free Lunch",
    energyAudit: "Energy Audit",
    plantTree: "Plant a Tree Challenge",

    // Lessons
    introToEcosystems: "Introduction to Ecosystems",
    climateChange: "Climate Change",
    renewableEnergy: "Renewable Energy",
    wasteManagement: "Waste Management",
    biodiversity: "Biodiversity",

    // Messages
    excellentProgress: "Excellent progress! Consider assigning advanced challenges",
    studentBehind: "Student is behind on lessons - consider one-on-one support",
    additionalPractice: "Consider providing additional quiz practice materials",
    allCaughtUp: "All caught up!",
    noActiveAlerts: "No active alerts at the moment.",

    // Home Page
    welcomeToEcoLearn: "Welcome to EcoLearn",
    platformDescription:
      "A gamified environmental education platform designed for Indian schools and colleges. Learn, play, and make a difference for our planet.",
    getStarted: "Get Started",
    roleBasedLearning: "Role-Based Learning",
    roleBasedDescription: "Tailored experiences for students, teachers, and administrators",
    interactiveLessons: "Interactive Lessons",
    interactiveLessonsDescription:
      "Engaging environmental education with quizzes, challenges, and real-world applications",
    gamifiedExperience: "Gamified Experience",
    gamifiedDescription: "Earn eco-points, unlock badges, and compete with peers while learning",
    readyToStart: "Ready to Start Your Eco-Journey?",
    joinThousands: "Join thousands of students and teachers already making a difference",
    signUpNow: "Sign Up Now",

    // Quiz translations
    quizQuestion1: "Which of these actions helps reduce carbon footprint the most?",
    quizOption1A: "Using plastic bags",
    quizOption1B: "Walking or cycling instead of driving",
    quizOption1C: "Leaving lights on",
    quizOption1D: "Using more water",
    quizExplanation1: "Walking and cycling produce zero emissions compared to cars!",
    quizQuestion2: "What percentage of Earth's water is freshwater?",
    quizOption2A: "50%",
    quizOption2B: "25%",
    quizOption2C: "3%",
    quizOption2D: "75%",
    quizExplanation2: "Only about 3% of Earth's water is freshwater, making it precious!",
    quizQuestion3: "Which renewable energy source is most widely used globally?",
    quizOption3A: "Solar power",
    quizOption3B: "Wind power",
    quizOption3C: "Hydroelectric power",
    quizOption3D: "Geothermal power",
    quizExplanation3: "Hydroelectric power generates the most renewable energy worldwide!",
    takeEcoQuiz: "Take Quick Eco-Quiz",
    ecoQuizTitle: "Quick Eco-Quiz",
    quizCompleted: "Quiz completed! See your results below.",
    question: "Question",
    of: "of",
    score: "Score",
    congratulations: "Congratulations!",
    yourScore: "Your score",
    perfectScore: "Perfect! You're an eco-champion!",
    goodScore: "Great job! You know your environmental facts!",
    keepLearning: "Keep learning about our environment!",
    tryAgain: "Try Again",

    // Onboarding
    onboarding: {
      step: "Step",
      of: "of",
      previous: "Previous",
      next: "Next",
      skip: "Skip Tour",
      finish: "Get Started!",
      welcome: "Welcome!",
      dashboard: "Dashboard",
      ecoPoints: "Eco-Points",
      achievements: "Achievements",
      challenges: "Challenges",
    },
  },

  hi: {
    // Common
    welcome: "स्वागत",
    loading: "लोड हो रहा है",
    save: "सेव करें",
    cancel: "रद्द करें",
    delete: "हटाएं",
    edit: "संपादित करें",
    add: "जोड़ें",
    search: "खोजें",
    filter: "फिल्टर",
    close: "बंद करें",
    submit: "जमा करें",
    continue: "जारी रखें",
    back: "वापस",
    next: "अगला",

    // Navigation
    dashboard: "डैशबोर्ड",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",

    // Authentication
    signIn: "साइन इन",
    signUp: "साइन अप",
    email: "ईमेल",
    password: "पासवर्ड",
    confirmPassword: "पासवर्ड की पुष्टि करें",
    fullName: "पूरा नाम",
    role: "भूमिका",
    school: "स्कूल",
    welcomeBack: "वापस स्वागत है",
    joinEcoLearn: "इको लर्न में शामिल हों",
    signInToContinue: "अपनी पर्यावरण यात्रा जारी रखने के लिए साइन इन करें",
    startJourney: "अपनी पर्यावरण शिक्षा यात्रा शुरू करें",
    alreadyHaveAccount: "पहले से खाता है? साइन इन करें",
    dontHaveAccount: "खाता नहीं है? साइन अप करें",

    // Roles
    student: "छात्र",
    teacher: "शिक्षक",
    admin: "प्रशासक",

    // Student Dashboard
    ecoPoints: "इको-पॉइंट्स",
    yourEcoJourney: "आपकी इको-यात्रा",
    dailyChallenges: "दैनिक चुनौतियां",
    yourProgress: "आपकी प्रगति",
    connectWithPeers: "साथियों से जुड़ें",
    lessonsCompleted: "पूरे किए गए पाठ",
    quizzesPassed: "पास की गई क्विज़",
    challengesDone: "पूरी की गई चुनौतियां",
    challengeStreak: "चुनौती स्ट्रीक",
    daysInARow: "लगातार दिन",
    onFire: "आग में!",
    todaysProgress: "आज की प्रगति",
    challengesCompleted: "चुनौतियां पूरी",
    challengesRemaining: "चुनौतियां बाकी",
    todaysChallenges: "आज की चुनौतियां",

    // Teacher Dashboard
    classEngagement: "कक्षा सहभागिता हीटमैप",
    studentProgress: "छात्र प्रगति ट्रैकर",
    classChallenges: "कक्षा चुनौतियां",
    automatedAlerts: "स्वचालित अलर्ट",
    averageEngagement: "औसत सहभागिता",
    totalStudents: "कुल छात्र",
    daysTracked: "ट्रैक किए गए दिन",
    systemUptime: "सिस्टम अपटाइम",
    createChallenge: "चुनौती बनाएं",

    // Admin Dashboard
    systemOverview: "सिस्टम अवलोकन",
    userManagement: "उपयोगकर्ता प्रबंधन",
    analytics: "विश्लेषण",
    totalUsers: "कुल उपयोगकर्ता",
    activeSchools: "सक्रिय स्कूल",
    systemStatus: "सिस्टम स्थिती",
    online: "ऑनलाइन",

    // Gamification
    achievements: "उपलब्धियां",
    badges_collection: "बैज संग्रह",
    leaderboard: "लीडरबोर्ड",
    level: "स्तर",
    points: "अंक",
    progress: "प्रगति",
    unlocked_on: "अनलॉक किया गया",
    no_achievements_found: "कोई उपलब्धि नहीं मिली",
    all: "सभी",
    unlocked: "अनलॉक",
    locked: "लॉक",
    learning: "सीखना",
    social: "सामाजिक",
    environmental: "पर्यावरणीय",
    streak: "स्ट्रीक",
    common: "सामान्य",
    rare: "दुर्लभ",
    epic: "महाकाव्य",
    legendary: "पौराणिक",
    daily: "दैनिक",
    weekly: "साप्ताहिक",
    monthly: "मासिक",
    all_time: "सभी समय",
    your_position: "आपकी स्थिति",
    day_streak: "दिन स्ट्रीक",
    keep_learning_climb_leaderboard: "लीडरबोर्ड पर चढ़ने के लिए सीखते रहें!",
    total_points: "कुल अंक",
    progress_to_next_level: "अगले स्तर की प्रगति",
    points_to_next_level: "अगले स्तर के लिए अंक",
    next_level_unlocks: "अगला स्तर अनलॉक करता है",
    new_avatar_options: "नए अवतार विकल्प",
    exclusive_challenges: "विशेष चुनौतियां",
    bonus_points: "बोनस अंक",
    rank: "रैंक",

    // Challenges
    waterConservation: "जल संरक्षण",
    plasticFreeLunch: "प्लास्टिक मुक्त दोपहर का भोजन",
    energyAudit: "ऊर्जा ऑडिट",
    plantTree: "पेड़ लगाने की चुनौती",

    // Lessons
    introToEcosystems: "पारिस्थितिकी तंत्र का परिचय",
    climateChange: "जलवायु परिवर्तन",
    renewableEnergy: "नवीकरणीय ऊर्जा",
    wasteManagement: "अपशिष्ट प्रबंधन",
    biodiversity: "जैव विविधता",

    // Messages
    excellentProgress: "उत्कृष्ट प्रगति! उन्नत चुनौतियां देने पर विचार करें",
    studentBehind: "छात्र पाठों में पीछे है - व्यक्तिगत सहायता पर विचार करें",
    additionalPractice: "अतिरिक्त क्विज़ अभ्यास सामग्री प्रदान करने पर विचार करें",
    allCaughtUp: "सब कुछ अप टू डेट!",
    noActiveAlerts: "फिलहाल कोई सक्रिय अलर्ट नहीं।",

    // Home Page
    welcomeToEcoLearn: "इको लर्न में आपका स्वागत है",
    platformDescription:
      "भारतीय स्कूलों और कॉलेजों के लिए डिज़ाइन किया गया एक गेमिफाइड पर्यावरण शिक्षा मंच। सीखें, खेलें, और हमारे ग्रहਿ ਲਈ ਬਦਲਾਅ ਲਿਆਓ।",
    getStarted: "शुरू करें",
    roleBasedLearning: "भूमिका-आधारित शिक्षा",
    roleBasedDescription: "छात्रों, शिक्षकों और प्रशासकों के लिए अनुकूलित अनुभव",
    interactiveLessons: "इंटरैक्टिव पाठ",
    interactiveLessonsDescription: "क्विज़, चुनौतियों और वास्तविक दुनिया के अनुप्रयोगों के साथ आकर्षक पर्यावरण शिक्षा",
    gamifiedExperience: "गेमिफाइड अनुभव",
    gamifiedDescription: "सीखते समय इको-पॉइंट्स अर्जित करें, बैज अनलॉक करें, और सహచరులతో పోటీ పడండి",
    readyToStart: "अपनी इको-यात्रा शुरू करने के लिए तैयार हैं?",
    joinThousands: "पहले से ही बदलਾਵ लਿਆ ਰਹੇ ਹਜ਼ਾਰਾਂ ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਅਧਿਆਪਕਾਂ ਨਾਲ ਜੁੜੋ",
    signUpNow: "ਹੁਣੇ ਸਾਈਨ ਅੱਪ ਕਰੋ",

    // Quiz translations
    quizQuestion1: "इनमें से कौन सा कार्य कार्बन फुटप्रिंट को सबसे ज्यादा कम करने में मदद करता है?",
    quizOption1A: "प्लास्टिक बैग का उपयोग",
    quizOption1B: "गाड़ी चलाने के बजाय पैदल चलना या साइकिल चलाना",
    quizOption1C: "लाइट जलाकर छोड़ना",
    quizOption1D: "अधिक पानी का उपयोग",
    quizExplanation1: "पैदल चलना और साइकल चलाना कारों की तुलना में शून्य उत्सर्जन पैदा करता है!",
    quizQuestion2: "पृथ्वी के पानी का कितना प्रतिशत मीठा पानी है?",
    quizOption2A: "50%",
    quizOption2B: "25%",
    quizOption2C: "3%",
    quizOption2D: "75%",
    quizExplanation2: "पृथ्वी का केवल लगभग 3% पानी मीठा पानी है, जो इसे कीमती बनाता है!",
    quizQuestion3: "विश्व स्तर पर सबसे व्यापक रूप से उपयोग किया जाने वाला नवीकरणीय ऊर्जा स्रोत कौन सा है?",
    quizOption3A: "सौर ऊर्जा",
    quizOption3B: "पवन ऊर्जा",
    quizOption3C: "जल विद्युत ऊर्जा",
    quizOption3D: "भूतापीय ऊर्जा",
    quizExplanation3: "जल विद्युत ऊर्जा दुनिया भर में सबसे अधिक नवीकरणीय ऊर्जा उत्पन्न करती है!",
    takeEcoQuiz: "त्वरित इको-क्विज़ लें",
    ecoQuizTitle: "त्वरित इको-क्विज़",
    quizCompleted: "क्विज़ पूरी हो गई! नीचे अपने परिणाम देखें।",
    question: "प्रश्न",
    of: "का",
    score: "स्कोर",
    congratulations: "बधाई हो!",
    yourScore: "आपका स्कोर",
    perfectScore: "परफेक्ट! आप एक इको-चैंपियन हैं!",
    goodScore: "बहुत बढ़िया! आप अपने पर्यावरणीय तथ्यों को जानते हैं!",
    keepLearning: "हमारे पर्यावरण के बारे में सीखते रहें!",
    tryAgain: "फिर से कोशिश करें",

    // Onboarding
    onboarding: {
      step: "चरण",
      of: "का",
      previous: "पिछला",
      next: "अगला",
      skip: "टूर छोड़ें",
      finish: "शुरू करें!",
      welcome: "स्वागत!",
      dashboard: "डैशबोर्ड",
      ecoPoints: "इको-पॉइंट्स",
      achievements: "उपलब्धियां",
      challenges: "चुनौतियां",
    },
  },

  pa: {
    // Common
    welcome: "ਸੁਆਗਤ",
    loading: "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ",
    save: "ਸੇਵ ਕਰੋ",
    cancel: "ਰੱਦ ਕਰੋ",
    delete: "ਮਿਟਾਓ",
    edit: "ਸੰਪਾਦਿਤ ਕਰੋ",
    add: "ਜੋੜੋ",
    search: "ਖੋਜੋ",
    filter: "ਫਿਲਟਰ",
    close: "ਬੰਦ ਕਰੋ",
    submit: "ਜਮ੍ਹਾਂ ਕਰੋ",
    continue: "ਜਾਰੀ ਰੱਖੋ",
    back: "ਵਾਪਸ",
    next: "ਅਗਲਾ",

    // Navigation
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    settings: "ਸੈਟਿੰਗਜ਼",
    logout: "ਲਾਗ ਆਊਟ",

    // Authentication
    signIn: "ਸਾਈਨ ਇਨ",
    signUp: "ਸਾਈਨ ਅੱਪ",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    confirmPassword: "ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    fullName: "ਪੂਰਾ ਨਾਮ",
    role: "ਭੂਮਿਕਾ",
    school: "ਸਕੂਲ",
    welcomeBack: "ਵਾਪਸੀ ਤੇ ਸੁਆਗਤ",
    joinEcoLearn: "ਈਕੋ ਲਰਨ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    signInToContinue: "ਆਪਣੀ ਵਾਤਾਵਰਣ ਯਾਤਰਾ ਜਾਰੀ ਰੱਖਣ ਲਈ ਸਾਈਨ ਇਨ ਕਰੋ",
    startJourney: "ਆਪਣੀ ਵਾਤਾਵਰਣ ਸਿੱਖਿਆ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ",
    alreadyHaveAccount: "ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ? ਸਾਈਨ ਇਨ ਕਰੋ",
    dontHaveAccount: "ਖਾਤਾ ਨਹੀਂ ਹੈ? ਸਾਈਨ ਅੱਪ ਕਰੋ",

    // Roles
    student: "ਵਿਦਿਆਰਥੀ",
    teacher: "ਅਧਿਆਪਕ",
    admin: "ਪ੍ਰਸ਼ਾਸਕ",

    // Student Dashboard
    ecoPoints: "ਈਕੋ-ਪੁਆਇੰਟਸ",
    yourEcoJourney: "ਤੁਹਾਡੀ ਈਕੋ-ਯਾਤਰਾ",
    dailyChallenges: "ਰੋਜ਼ਾਨਾ ਚੁਣੌਤੀਆਂ",
    yourProgress: "ਤੁਹਾਡੀ ਤਰੱਕੀ",
    connectWithPeers: "ਸਾਥੀਆਂ ਨਾਲ ਜੁੜੋ",
    lessonsCompleted: "ਪੂਰੇ ਕੀਤੇ ਪਾਠ",
    quizzesPassed: "ਪਾਸ ਕੀਤੇ ਕੁਇਜ਼",
    challengesDone: "ਪੂਰੀਆਂ ਕੀਤੀਆਂ ਚੁਣੌਤੀਆਂ",
    challengeStreak: "ਚੁਣੌਤੀ ਸਟ੍ਰੀਕ",
    daysInARow: "ਲਗਾਤਾਰ ਦਿਨ",
    onFire: "ਅੱਗ ਵਿੱਚ!",
    todaysProgress: "ਅੱਜ ਦੀ ਤਰੱਕੀ",
    challengesCompleted: "ਚੁਣੌਤੀਆਂ ਪੂਰੀਆਂ",
    challengesRemaining: "ਚੁਣੌਤੀਆਂ ਬਾਕੀ",
    todaysChallenges: "ਅੱਜ ਦੀਆਂ ਚੁਣੌਤੀਆਂ",

    // Teacher Dashboard
    classEngagement: "ਕਲਾਸ ਸਹਿਭਾਗਤਾ ਹੀਟਮੈਪ",
    studentProgress: "ਵਿਦਿਆਰਥੀ ਤਰੱਕੀ ਟ੍ਰੈਕਰ",
    classChallenges: "ਕਲਾਸ ਚੁਣੌਤੀਆਂ",
    automatedAlerts: "ਸਵੈਚਲਿਤ ਅਲਰਟ",
    averageEngagement: "ਔਸਤ ਸਹਿਭਾਗਤਾ",
    totalStudents: "ਕੁੱਲ ਵਿਦਿਆਰਥੀ",
    daysTracked: "ਟ੍ਰੈਕ ਕੀਤੇ ਦਿਨ",
    systemUptime: "ਸਿਸਟਮ ਅਪਟਾਈਮ",
    createChallenge: "ਚੁਣੌਤੀ ਬਣਾਓ",

    // Admin Dashboard
    systemOverview: "ਸਿਸਟਮ ਸਮੀਖਿਆ",
    userManagement: "ਉਪਭੋਗਤਾ ਪ੍ਰਬੰਧਨ",
    analytics: "ਵਿਸ਼ਲੇਸ਼ਣ",
    totalUsers: "ਕੁੱਲ ਉਪਭੋਗਤਾ",
    activeSchools: "ਸਰਗਰਮ ਸਕੂਲ",
    systemStatus: "ਸਿਸਟਮ ਸਥਿਤੀ",
    online: "ਔਨਲਾਈਨ",

    // Gamification
    achievements: "ਪ੍ਰਾപਤੀਆਂ",
    badges_collection: "ਬੈਜ ਸੰਗ੍ਰਹਿ",
    leaderboard: "ਲੀਡਰਬੋਰਡ",
    level: "ਪੱਧਰ",
    points: "ਅੰਕ",
    progress: "ਤਰੱਕੀ",
    unlocked_on: "ਅਨਲਾਕ ਕੀਤਾ ਗਿਆ",
    no_achievements_found: "ਕੋਈ ਪ੍ਰਾപਤੀ ਨਹੀਂ ਮਿਲੀ",
    all: "ਸਭ",
    unlocked: "ਅਨਲਾਕ",
    locked: "ਲਾਕ",
    learning: "ਸਿੱਖਣਾ",
    social: "ਸਮਾਜਿਕ",
    environmental: "ਵਾਤਾਵਰਣੀ",
    streak: "ਸਟ੍ਰੀਕ",
    common: "ਆਮ",
    rare: "ਦੁਰਲੱਭ",
    epic: "ਮਹਾਨ",
    legendary: "ਮਹਾਨ",
    daily: "ਰੋਜ਼ਾਨਾ",
    weekly: "ਹਫ਼ਤਾਵਾਰੀ",
    monthly: "ਮਹੀਨਾਵਾਰੀ",
    all_time: "ਸਾਰਾ ਸਮਾਂ",
    your_position: "ਤੁਹਾਡੀ ਸਥਿਤੀ",
    day_streak: "ਦਿਨ ਸਟ੍ਰੀਕ",
    keep_learning_climb_leaderboard: "ਲੀਡਰਬੋਰਡ ਤੇ ਚੜ੍ਹਨ ਲਈ ਸਿੱਖਦੇ ਰਹੋ!",
    total_points: "ਕੁੱਲ ਅੰਕ",
    progress_to_next_level: "ਅਗਲੇ ਪੱਧਰ ਦੀ ਤਰੱਕੀ",
    points_to_next_level: "ਅਗਲੇ ਪੱਧਰ ਲਈ ਅੰਕ",
    next_level_unlocks: "ਅਗਲਾ ਪੱਧਰ ਅਨਲਾਕ ਕਰਦਾ ਹੈ",
    new_avatar_options: "ਨਵੇਂ ਅਵਤਾਰ ਵਿਕਲਪ",
    exclusive_challenges: "ਵਿਸ਼ੇਸ਼ ਚੁਣੌਤੀਆਂ",
    bonus_points: "ਬੋਨਸ ਅੰਕ",
    rank: "ਰੈਂਕ",

    // Challenges
    waterConservation: "ਪਾਣੀ ਸੰਭਾਲ",
    plasticFreeLunch: "ਪਲਾਸਟਿਕ ਮੁਕਤ ਦੁਪਹਿਰ ਦਾ ਖਾਣਾ",
    energyAudit: "ਊਰਜਾ ਆਡਿਟ",
    plantTree: "ਰੁੱਖ ਲਗਾਉਣ ਦੀ ਚੁਣੌਤੀ",

    // Lessons
    introToEcosystems: "ਵਾਤਾਵਰਣ ਪ੍ਰਣਾਲੀ ਦੀ ਜਾਣ-ਪਛਾਣ",
    climateChange: "ਜਲਵਾਯੂ ਤਬਦੀਲੀ",
    renewableEnergy: "ਨਵਿਆਉਣਯੋਗ ਊਰਜਾ",
    wasteManagement: "ਰਿਫਿਊਜ਼ ਪ੍ਰਬੰਧਨ",
    biodiversity: "ਜੈਵਿਕ ਵਿਭਿੰਨਤਾ",

    // Messages
    excellentProgress: "ਸ਼ਾਨਦਾਰ ਤਰੱਕੀ! ਉੱਨਤ ਚੁਣੌਤੀਆਂ ਦੇਣ ਬਾਰੇ ਸੋਚੋ",
    studentBehind: "ਵਿਦਿਆਰਥੀ ਪਾਠਾਂ ਵਿੱਚ ਪਿੱਛੇ ਹੈ - ਵਿਅਕਤੀਗਤ ਸਹਾਇਤਾ ਬਾਰੇ ਸੋਚੋ",
    additionalPractice: "ਵਾਧੂ ਕੁਇਜ਼ ਅਭਿਆਸ ਸਮੱਗਰੀ ਪ੍ਰਦਾਨ ਕਰਨ ਬਾਰੇ ਸੋਚੋ",
    allCaughtUp: "ਸਭ ਕੁਝ ਅਪ ਟੂ ਡੇਟ!",
    noActiveAlerts: "ਫਿਲਹਾਲ ਕੋਈ ਸਰਗਰਮ ਅਲਰਟ ਨਹੀਂ।",

    // Home Page
    welcomeToEcoLearn: "ਈਕੋ ਲਰਨ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ",
    platformDescription:
      "ਭਾਰਤੀ ਸਕੂਲਾਂ ਅਤੇ ਕਾਲਜਾਂ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤਾ ਗਿਆ ਇੱਕ ਗੇਮੀਫਾਈਡ ਵਾਤਾਵਰਣ ਸਿੱਖਿਆ ਪਲੇਟਫਾਰਮ। ਸਿੱਖੋ, ਖੇਡੋ, ਅਤੇ ਸਾਡੇ ਗ੍ਰਹਿ ਲਈ ਬਦਲਾਅ ਲਿਆਓ।",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    roleBasedLearning: "ਭੂਮਿਕਾ-ਆਧਾਰਿਤ ਸਿੱਖਿਆ",
    roleBasedDescription: "ਵਿਦਿਆਰਥੀਆਂ, ਅਧਿਆਪਕਾਂ ਅਤੇ ਪ੍ਰਸ਼ਾਸਕਾਂ ਲਈ ਅਨੁਕੂਲਿਤ ਅਨੁਭਵ",
    interactiveLessons: "ਇੰਟਰਐਕਟਿਵ ਪਾਠ",
    interactiveLessonsDescription: "ਕੁਇਜ਼, ਚੁਣੌਤੀਆਂ ਅਤੇ ਅਸਲ ਸੰਸਾਰ ਦੇ ਉਪਯੋਗਾਂ ਨਾਲ ਦਿਲਚਸਪ ਵਾਤਾਵਰਣ ਸਿੱਖਿਆ",
    gamifiedExperience: "ਗੇਮੀਫਾਈਡ ਅਨੁਭਵ",
    gamifiedDescription: "ਸਿੱਖਦੇ ਸਮੇਂ ਈਕੋ-ਪੁਆਇੰਟਸ ਕਮਾਓ, ਬੈਜ ਅਨਲਾਕ ਕਰੋ, ਅਤੇ ਸਾਥੀਆਂ ਨਾਲ ਮੁਕਾਬਲਾ ਕਰੋ",
    readyToStart: "ਆਪਣੀ ਈਕੋ-ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਤਿਆਰ ਹੋ?",
    joinThousands: "ਪਹਿਲਾਂ ਤੋਂ ਹੀ ਬਦਲਾਅ ਲਿਆ ਰਹੇ ਹਜ਼ਾਰਾਂ ਵਿਦਿਆਰਥੀਆਂ ਅਤੇ ਅਧਿਆਪਕਾਂ ਨਾਲ ਜੁੜੋ",
    signUpNow: "ਹੁਣੇ ਸਾਈਨ ਅੱਪ ਕਰੋ",

    // Quiz translations
    quizQuestion1: "ఈ చర్యలలో ఏది కార్బన్ పాదముద్రను అత్యధికంగా తగ్గించడంలో సహాయపడుతుంది?",
    quizOption1A: "ప్లాస్టిక్ బ్యాగ్‌లను ఉపయోగించడం",
    quizOption1B: "కారు నడపడానికి బదులుగా నడవడం లేదా సైకిల్ తొక్కడం",
    quizOption1C: "లైట్లను వెలిగించి వదిలేయడం",
    quizOption1D: "ఎక్కువ నీరు వాడటం",
    quizExplanation1: "నడవడం మరియు సైకిల్ తొక్కడం కార్లతో పోల్చితే శూన్య ఉద్గారాలను ఉత్పత్తి చేస్తుంది!",
    quizQuestion2: "భూమి యొక్క నీటిలో ఎంత శాతం మంచినీరు?",
    quizOption2A: "50%",
    quizOption2B: "25%",
    quizOption2C: "3%",
    quizOption2D: "75%",
    quizExplanation2: "భూమి యొక్క నీటిలో కేవలం 3% మాత్రమే మంచినీరు, ఇది దానిని విలువైనదిగా చేస్తుంది!",
    quizQuestion3: "ప్రపంచవ్యాప్తంగా అత్యధికంగా ఉపయోగించే పునరుత్పాదక శక్తి వనరు ఏది?",
    quizOption3A: "సౌర శక్తి",
    quizOption3B: "గాలి శక్తి",
    quizOption3C: "జల విద్యుత్ శక్తి",
    quizOption3D: "భూఉష్ణ శక్తి",
    quizExplanation3: "జల విద్యుత్ శక్తి ప్రపంచవ్యాప్తంగా అత్యధిక పునరుత్పాదక శక్తిని ఉత్పత్తి చేస్తుంది!",
    takeEcoQuiz: "త్వరిత ఎకో-క్విజ్ తీసుకోండి",
    ecoQuizTitle: "త్వరిత ఎకో-క్విజ్",
    quizCompleted: "క్విజ్ పూర్తయింది! దిగువ మీ ఫలితాలను చూడండి.",
    question: "ప్రశ్న",
    of: "లో",
    score: "స్కోర్",
    congratulations: "అభినందనలు!",
    yourScore: "మీ స్కోర్",
    perfectScore: "పర్ఫెక్ట్! మీరు ఎకో-చాంపియన్!",
    goodScore: "గొప్ప పని! మీరు మీ పర్యావరణ వాస్తవాలను తెలుసుకున్నారు!",
    keepLearning: "మన పర్యావరణం గురించి నేర్చుకోవడం కొనసాగించండి!",
    tryAgain: "మళ్లీ ప్రయత్నించండి",

    // Onboarding
    onboarding: {
      step: "ਕਦਮ",
      of: "ਦਾ",
      previous: "ਪਿਛਲਾ",
      next: "ਅਗਲਾ",
      skip: "ਟੂਰ ਛੱਡੋ",
      finish: "ਸ਼ੁਰੂ ਕਰੋ!",
      welcome: "ਸੁਆਗਤ!",
      dashboard: "ਡੈਸ਼ਬੋਰਡ",
      ecoPoints: "ਈਕੋ-ਪੁਆਇੰਟਸ",
      achievements: "ਪ੍ਰਾਪਤੀਆਂ",
      challenges: "ਚੁਣੌਤੀਆਂ",
    },
  },

  ta: {
    // Common
    welcome: "வரவேற்கிறோம்",
    loading: "ஏற்றுகிறது",
    save: "சேமிக்கவும்",
    cancel: "ரத்து செய்யவும்",
    delete: "நீக்கவும்",
    edit: "திருத்தவும்",
    add: "சேர்க்கவும்",
    search: "தேடவும்",
    filter: "வடிகட்டவும்",
    close: "மூடவும்",
    submit: "சமர்ப்பிக்கவும்",
    continue: "தொடரவும்",
    back: "பின்னால்",
    next: "அடுத்து",

    // Navigation
    dashboard: "டாஷ்போர்டு",
    profile: "சுயவிவரம்",
    settings: "அமைப்புகள்",
    logout: "வெளியேறு",

    // Authentication
    signIn: "உள்நுழைய",
    signUp: "பதிவு செய்ய",
    email: "மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    confirmPassword: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    fullName: "முழு பெயர்",
    role: "பங்கு",
    school: "பள்ளி",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    joinEcoLearn: "ஈகோ லர்னில் சேரவும்",
    signInToContinue: "உங்கள் சுற்றுச்சூழல் பயணத்தைத் தொடர உள்நுழையவும்",
    startJourney: "உங்கள் சுற்றுச்சூழல் கல்வி பயணத்தைத் தொடங்குங்கள்",
    alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழையவும்",
    dontHaveAccount: "கணக்கு இல்லையா? பதிவு செய்யவும்",

    // Roles
    student: "மாணவர்",
    teacher: "ஆசிரியர்",
    admin: "நிர்வாகி",

    // Student Dashboard
    ecoPoints: "ஈகோ-புள்ளிகள்",
    yourEcoJourney: "உங்கள் ஈகோ-பயணம்",
    dailyChallenges: "தினசரி சவால்கள்",
    yourProgress: "உங்கள் முன்னேற்றம்",
    connectWithPeers: "சக மாணவர்களுடன் இணையுங்கள்",
    lessonsCompleted: "முடிக்கப்பட்ட பாடங்கள்",
    quizzesPassed: "தேர்ச்சி பெற்ற வினாடி வினாக்கள்",
    challengesDone: "முடிக்கப்பட்ட சவால்கள்",
    challengeStreak: "சவால் தொடர்ச்சி",
    daysInARow: "தொடர்ச்சியான நாட்கள்",
    onFire: "தீயில்!",
    todaysProgress: "இன்றைய முன்னேற்றம்",
    challengesCompleted: "சவால்கள் முடிந்தது",
    challengesRemaining: "சவால்கள் மீதமுள்ளது",
    todaysChallenges: "இன்றைய சவால்கள்",

    // Teacher Dashboard
    classEngagement: "வகுப்பு ஈடுபாடு வெப்ப வரைபடம்",
    studentProgress: "மாணவர் முன்னேற்ற கண்காணிப்பு",
    classChallenges: "வகுப்பு சவால்கள்",
    automatedAlerts: "தானியங்கு எச்சரிக்கைகள்",
    averageEngagement: "சராசரி ஈடுபாடு",
    totalStudents: "மொத்த மாணவர்கள்",
    daysTracked: "கண்காணிக்கப்பட்ட நாட்கள்",
    systemUptime: "கணினி இயக்க நேரம்",
    createChallenge: "சவால் உருவாக்கவும்",

    // Admin Dashboard
    systemOverview: "கணினி மேலோட்டம்",
    userManagement: "பயனர் மேலாண்மை",
    analytics: "பகுப்பாய்வு",
    totalUsers: "மொத்த பயனர்கள்",
    activeSchools: "செயலில் உள்ள பள்ளிகள்",
    systemStatus: "கணினி நிலை",
    online: "ஆன்லைன்",

    // Gamification
    achievements: "சாதனைகள்",
    badges_collection: "பேட்ஜ் சேகரிப்பு",
    leaderboard: "தலைமை பலகை",
    level: "நிலை",
    points: "புள்ளிகள்",
    progress: "முன்னேற்றம்",
    unlocked_on: "திறக்கப்பட்டது",
    no_achievements_found: "சாதனைகள் எதுவும் கிடைக்கவில்லை",
    all: "அனைத்தும்",
    unlocked: "திறக்கப்பட்டது",
    locked: "பூட்டப்பட்டது",
    learning: "கற்றல்",
    social: "சமூக",
    environmental: "சுற்றுச்சூழல்",
    streak: "தொடர்ச்சி",
    common: "பொதுவான",
    rare: "அரிதான",
    epic: "காவியம்",
    legendary: "புராணம்",
    daily: "தினசரி",
    weekly: "வாராந்திர",
    monthly: "மாதாந்திர",
    all_time: "எல்லா நேரமும்",
    your_position: "உங்கள் நிலை",
    day_streak: "நாள் தொடர்ச்சி",
    keep_learning_climb_leaderboard: "தலைமை பலகையில் ஏற தொடர்ந்து கற்றுக்கொள்ளுங்கள்!",
    total_points: "மொத்த புள்ளிகள்",
    progress_to_next_level: "அடுத்த நிலைக்கான முன்னேற்றம்",
    points_to_next_level: "அடுத்த நிலைக்கான புள்ளிகள்",
    next_level_unlocks: "அடுத்த நிலை திறக்கிறது",
    new_avatar_options: "புதிய அவதார் விருப்பங்கள்",
    exclusive_challenges: "பிரத்யேக சவால்கள்",
    bonus_points: "போனஸ் புள்ளிகள்",
    rank: "தரவரிசை",

    // Challenges
    waterConservation: "நீர் பாதுகாப்பு",
    plasticFreeLunch: "பிளாஸ்டிக் இல்லாத மதிய உணவு",
    energyAudit: "ஆற்றல் தணிக்கை",
    plantTree: "மரம் நடும் சவால்",

    // Lessons
    introToEcosystems: "சுற்றுச்சூழல் அமைப்புகளின் அறிமுகம்",
    climateChange: "காலநிலை மாற்றம்",
    renewableEnergy: "புதுப்பிக்கத்தக்க ஆற்றல்",
    wasteManagement: "கழிவு மேலாண்மை",
    biodiversity: "உயிரியல் பன்முகத்தன்மை",

    // Messages
    excellentProgress: "சிறந்த முன்னேற்றம்! மேம்பட்ட சவால்களை வழங்குவதைக் கருத்தில் கொள்ளுங்கள்",
    studentBehind: "மாணவர் பாடங்களில் பின்தங்கியுள்ளார் - தனிப்பட்ட ஆதரவைக் கருத்தில் கொள்ளுங்கள்",
    additionalPractice: "கூடுதல் வினாடி வினா பயிற்சி பொருட்களை வழங்குவதைக் கருத்தில் கொள்ளுங்கள்",
    allCaughtUp: "அனைத்தும் புதுப்பிக்கப்பட்டது!",
    noActiveAlerts: "தற்போது செயலில் உள்ள எச்சரிக்கைகள் இல்லை.",

    // Home Page
    welcomeToEcoLearn: "ஈகோ லர்னுக்கு வரவேற்கிறோம்",
    platformDescription:
      "இந்திய பள்ளிகள் மற்றும் கல்லூரிகளுக்காக வடிவமைக்கப்பட்ட ஒரு விளையாட்டுமய சுற்றுச்சூழல் கல்வி தளம். கற்றுக்கொள்ளுங்கள், விளையாடுங்கள், நம்முடைய கிரகத்திற்கு மாற்றத்தை ஏற்படுத்துங்கள்.",
    getStarted: "தொடங்குங்கள்",
    roleBasedLearning: "பங்கு அடிப்படையிலான கற்றல்",
    roleBasedDescription: "மாணவர்கள், ஆசிரியர்கள் மற்றும் நிர்வாகிகளுக்கான தனிப்பயனாக்கப்பட்ட அனுபவங்கள்",
    interactiveLessons: "ஊடாடும் பாடங்கள்",
    interactiveLessonsDescription: "வினாடி வினாக்கள், சவால்கள் மற்றும் நிஜ உலக பயன்பாடுகளுடன் ஈர்க்கும் சுற்றுச்சூழல் கல்வி",
    gamifiedExperience: "விளையாட்டுமய அனுபவம்",
    gamifiedDescription: "கற்றுக்கொள்ளும்போது ஈகோ-புள்ளிகளை சம்பாதியுங்கள், பேட்ஜ்களை திறக்கவும், சக மாணவர்களுடன் போட்டியிடுங்கள்",
    readyToStart: "உங்கள் ஈகோ-பயணத்தைத் தொடங்க தயாரா?",
    joinThousands: "ஏற்கனவே மாற்றத்தை ஏற்படுத்தும் ஆயிரக்கணக்கான மாணவர்கள் மற்றும் ஆசிரியர்களுடன் சேருங்கள்",
    signUpNow: "இப்போதே பதிவு செய்யுங்கள்",

    // Quiz translations
    quizQuestion1: "இவற்றில் எது கார்பன் தடம் குறைக்க அதிகம் உதவுகிறது?",
    quizOption1A: "பிளாஸ்டிக் பைகளைப் பயன்படுத்துதல்",
    quizOption1B: "வாகனம் ஓட்டுவதற்குப் பதிலாக நடத்தல் அல்லது சைக்கிள் ஓட்டுதல்",
    quizOption1C: "விளக்குகளை எரிந்த நிலையில் விடுதல்",
    quizOption1D: "அதிக தண்ணீர் பயன்படுத்துதல்",
    quizExplanation1: "நடத்தல் மற்றும் சைக்கிள் ஓட்டுதல் கார்களுடன் ஒப்பிடும்போது பூஜ்ய உமிழ்வுகளை உருவாக்குகிறது!",
    quizQuestion2: "பூமியின் நீரில் எంత చதவீதம் நன்னீர்?",
    quizOption2A: "50%",
    quizOption2B: "25%",
    quizOption2C: "3%",
    quizOption2D: "75%",
    quizExplanation2: "பூமியின் நீரில் வெறும் 3% மட்டுமே நன்னீர், இது அதை மதிப்புமிக்கதாக ஆக்குகிறது!",
    quizQuestion3: "உலகளவில் மிகவும் பரவலாகப் பயன்படுத்தப்படும் புதுப்பிக்கத்தக்க ஆற்றல் மூலம் எது?",
    quizOption3A: "சூரிய சக்தி",
    quizOption3B: "காற்று சக்தி",
    quizOption3C: "நீர்மின் சக்தி",
    quizOption3D: "புவிவெப்ப சக்தி",
    quizExplanation3: "நீர்மின் சக்தி உலகளவில் அதிக புதுப்பிக்கத்தக்க ஆற்றலை உருவாக்குகிறது!",
    takeEcoQuiz: "விரைவு ஈகோ-வினாடி வினா எடுக்கவும்",
    ecoQuizTitle: "விரைவு ஈகோ-வினாடி வினா",
    quizCompleted: "வினாடி வினா முடிந்தது! கீழே உங்கள் முடிவுகளைப் பார்க்கவும்.",
    question: "கேள்வி",
    of: "இல்",
    score: "மதிப்பெண்",
    congratulations: "வாழ்த்துக்கள்!",
    yourScore: "உங்கள் மதிப்பெண்",
    perfectScore: "சரியானது! நீங்கள் ஒரு ஈகோ-சாம்பியன்!",
    goodScore: "சிறந்த வேலை! உங்கள் சுற்றுச்சூழல் உண்மைகளை நீங்கள் தெளிவாக அறிவீர்கள்!",
    keepLearning: "நமது சுற்றுச்சூழலைப் பற்றி தொடர்ந்து கற்றுக்கொள்ளுங்கள்!",
    tryAgain: "மீண்டும் முயற்சிக்கவும்",

    // Onboarding
    onboarding: {
      step: "படி",
      of: "இல்",
      previous: "முந்தைய",
      next: "அடுத்து",
      skip: "சுற்றுப்பயணத்தைத் தவிர்க்கவும்",
      finish: "தொடங்குங்கள்!",
      welcome: "வரவேற்கிறோம்!",
      dashboard: "டாஷ்போர்டு",
      ecoPoints: "ஈகோ-புள்ளிகள்",
      achievements: "சாதனைகள்",
      challenges: "சவால்கள்",
    },
  },

  te: {
    // Common
    welcome: "స్వాగతం",
    loading: "లోడ్ అవుతోంది",
    save: "సేవ్ చేయండి",
    cancel: "రద్దు చేయండి",
    delete: "తొలగించండి",
    edit: "సవరించండి",
    add: "జోడించండి",
    search: "వెతకండి",
    filter: "ఫిల్టర్",
    close: "మూసివేయండి",
    submit: "సమర్పించండి",
    continue: "కొనసాగించండి",
    back: "వెనుకకు",
    next: "తదుపరి",

    // Navigation
    dashboard: "డాష్‌బోర్డ్",
    profile: "ప్రొఫైల్",
    settings: "సెట్టింగ్స్",
    logout: "లాగ్ అవుట్",

    // Authentication
    signIn: "సైన్ ఇన్",
    signUp: "సైన్ అప్",
    email: "ఇమెయిల్",
    password: "పాస్‌వర్డ్",
    confirmPassword: "పాస్‌వర్డ్ నిర్ధారించండి",
    fullName: "పూర్తి పేరు",
    role: "పాత్ర",
    school: "పాఠశాల",
    welcomeBack: "తిరిగి స్వాగతం",
    joinEcoLearn: "ఎకో లెర్న్‌లో చేరండి",
    signInToContinue: "మీ పర్యావరణ ప్రయాణాన్ని కొనసాగించడానికి సైన్ ఇన్ చేయండి",
    startJourney: "మీ పర్యావరణ విద్య ప్రయాణాన్ని ప్రారంభించండి",
    alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా? సైన్ ఇన్ చేయండి",
    dontHaveAccount: "ఖాతా లేదా? సైన్ అప్ చేయండి",

    // Roles
    student: "విద్యార్థి",
    teacher: "ఉపాధ్యాయుడు",
    admin: "నిర్వాహకుడు",

    // Home Page
    welcomeToEcoLearn: "ఎకో లెర్న్‌కు స్వాగతం",
    platformDescription:
      "భారతీయ పాఠశాలలు మరియు కళాశాలల కోసం రూపకൽപ్పన ചെയ്ത ഗെയിമിഫൈഡ് പരിസ്ഥിതി വിദ്യാഭ്യാസ പ്ലാറ്റ്ഫോം. പഠിക്കുക, കളിക്കുക, നമ്മുടെ ഗ്രഹത്തിന് മാറ്റം കൊണ്ടുവരുക.",
    getStarted: "ప్రారంభించండి",
    roleBasedLearning: "పాత్ర ఆధారిత అభ్యాసం",
    roleBasedDescription: "విద్యార్థులు, ఉపాధ్యాయులు మరియు నిర్వాహకుల కోసం అనుకూలీకరించిన అనుభవాలు",
    interactiveLessons: "ఇంటరాక్టివ్ పాఠాలు",
    interactiveLessonsDescription: "క్విజ్‌లు, సవాళ్లు మరియు వాస్తవ ప్రపంచ అనువర్తనాలతో ఆకర్షణీయమైన పర్యావరణ విద్య",
    gamifiedExperience: "గేమిఫైడ్ అనుభవం",
    gamifiedDescription: "నేర్చుకుంటూ ఎకో-పాయింట్లు సంపాదించండి, బ్యాడ్జ్‌లను అన్‌లాక్ చేయండి మరియు సహచరులతో పోటీ పడండి",
    readyToStart: "మీ ఎకో-ప్రయాణాన్ని ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?",
    joinThousands: "ఇప్పటికే మార్పు తీసుకురాస్తున్న వేలాది విద్యార్థులు మరియు ఉపాధ్యాయులతో చేరండి",
    signUpNow: "ఇప్పుడే సైన్ అప్ చేయండి",

    // Quiz translations
    quizQuestion1: "ఈ చర్యలలో ఏది కార్బన్ పాదముద్రను అత్యధికంగా తగ్గించడంలో సహాయపడుతుంది?",
    quizOption1A: "ప్లాస్టిక్ బ్యాగ్‌లను ఉపయోగించడం",
    quizOption1B: "కారు నడపడానికి బదులుగా నడవడం లేదా సైకిల్ తొక్కడం",
    quizOption1C: "లైట్లను వెలిగించి వదిలేయడం",
    quizOption1D: "ఎక్కువ నీరు వాడటం",
    quizExplanation1: "నడవడం మరియు సైకిల్ తొక్కడం కార్లతో పోల్చితే శూన్య ఉద్గారాలను ఉత్పత్తి చేస్తుంది!",
    quizQuestion2: "భూమి యొక్క నీటిలో ఎంత శాతం మంచినీరు?",
    quizOption2A: "50%",
    quizOption2B: "25%",
    quizOption2C: "3%",
    quizOption2D: "75%",
    quizExplanation2: "భూమి యొక్క నీటిలో కేవలం 3% మాత్రమే మంచినీరు, ఇది దానిని విలువైనదిగా చేస్తుంది!",
    quizQuestion3: "ప్రపంచవ్యాప్తంగా అత్యధికంగా ఉపయోగించే పునరుత్పాదక శక్తి వనరు ఏది?",
    quizOption3A: "సౌర శక్తి",
    quizOption3B: "గాలి శక్తి",
    quizOption3C: "జల విద్యుత్ శక్తి",
    quizOption3D: "భూఉష్ణ శక్తి",
    quizExplanation3: "జల విద్యుత్ శక్తి ప్రపంచవ్యాప్తంగా అత్యధిక పునరుత్పాదక శక్తిని ఉత్పత్తి చేస్తుంది!",
    takeEcoQuiz: "త్వరిత ఎకో-క్విజ్ తీసుకోండి",
    ecoQuizTitle: "త్వరిత ఎకో-క్విజ్",
    quizCompleted: "క్విజ్ పూర్తయింది! దిగువ మీ ఫలితాలను చూడండి.",
    question: "ప్రశ్న",
    of: "లో",
    score: "స్కోర్",
    congratulations: "అభినందనలు!",
    yourScore: "మీ స్కోర్",
    perfectScore: "పర్ఫెక్ట్! మీరు ఎకో-చాంపియన్!",
    goodScore: "గొప్ప పని! మీరు మీ పర్యావరణ వాస్తవాలను తెలుసుకున్నారు!",
    keepLearning: "మన పర్యావరణం గురించి నేర్చుకోవడం కొనసాగించండి!",
    tryAgain: "మళ్లీ ప్రయత్నించండి",

    // Onboarding
    onboarding: {
      step: "దశ",
      of: "లో",
      previous: "మునుపటి",
      next: "తదుపరి",
      skip: "టూర్ దాటవేయండి",
      finish: "ప్రారంభించండి!",
      welcome: "స్వాగతం!",
      dashboard: "డాష్‌బోర్డ్",
      ecoPoints: "ఎకో-పాయింట్లు",
      achievements: "విజయాలు",
      challenges: "సవాళ్లు",
    },
  },

  ml: {
    // Common
    welcome: "സ്വാഗതം",
    loading: "ലോഡ് ചെയ്യുന്നു",
    save: "സേവ് ചെയ്യുക",
    cancel: "റദ്ദാക്കുക",
    delete: "ഇല്ലാതാക്കുക",
    edit: "എഡിറ്റ് ചെയ്യുക",
    add: "ചേർക്കുക",
    search: "തിരയുക",
    filter: "ഫിൽട്ടർ",
    close: "അടയ്ക്കുക",
    submit: "സമർപ്പിക്കുക",
    continue: "തുടരുക",
    back: "പിന്നോട്ട്",
    next: "അടുത്തത്",

    // Navigation
    dashboard: "ഡാഷ്‌ബോർഡ്",
    profile: "പ്രൊഫൈൽ",
    settings: "സെറ്റിംഗ്സ്",
    logout: "ലോഗ് ഔട്ട്",

    // Authentication
    signIn: "സൈൻ ഇൻ",
    signUp: "സൈൻ അപ്പ്",
    email: "ഇമെയിൽ",
    password: "പാസ്‌വേഡ്",
    confirmPassword: "പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക",
    fullName: "പൂർണ്ണ നാമം",
    role: "റോൾ",
    school: "സ്കൂൾ",
    welcomeBack: "തിരികെ സ്വാഗതം",
    joinEcoLearn: "ഇക്കോ ലേണിൽ ചേരുക",
    signInToContinue: "നിങ്ങളുടെ പരിസ്ഥിതി യാത്ര തുടരാൻ സൈൻ ഇൻ ചെയ്യുക",
    startJourney: "നിങ്ങളുടെ പരിസ്ഥിതി വിദ്യാഭ്യാസ യാത്ര ആരംഭിക്കുക",
    alreadyHaveAccount: "ഇതിനകം അക്കൗണ്ട് ഉണ്ടോ? സൈൻ ഇൻ ചെയ്യുക",
    dontHaveAccount: "അക്കൗണ്ട് ഇല്ലേ? സൈൻ അപ്പ് ചെയ്യുക",

    // Roles
    student: "വിദ്യാർത്ഥി",
    teacher: "അധ്യാപകൻ",
    admin: "അഡ്മിൻ",

    // Home Page
    welcomeToEcoLearn: "ഇക്കോ ലേണിലേക്ക് സ്വാഗതം",
    platformDescription:
      "ഇന്ത്യൻ സ്കൂളുകൾക്കും കോളേജുകൾക്കുമായി രൂപകൽപ്പന ചെയ്ത ഗെയിമിഫൈഡ് പരിസ്ഥിതി വിദ്യാഭ്യാസ പ്ലാറ്റ്ഫോം. പഠിക്കുക, കളിക്കുക, നമ്മുടെ ഗ്രഹത്തിന് മാറ്റം കൊണ്ടുവരുക.",
    getStarted: "ആരംഭിക്കുക",
    roleBasedLearning: "റോൾ അടിസ്ഥാനമാക്കിയുള്ള പഠനം",
    roleBasedDescription: "വിദ്യാർത്ഥികൾ, അധ്യാപകർ, അഡ്മിനിസ്ട്രേറ്റർമാർ എന്നിവർക്കായി ഇഷ്ടാനുസൃതമാക്കിയ അനുഭവങ്ങൾ",
    interactiveLessons: "ഇന്ററാക്ടീവ് പാഠങ്ങൾ",
    interactiveLessonsDescription: "ക്വിസുകൾ, വെല്ലുവിളികൾ, യഥാർത്ഥ ലോക ആപ്ലിക്കേഷനുകൾ എന്നിവയുമായി ആകർഷകമായ പരിസ്ഥിതി വിദ്യാഭ്യാസം",
    gamifiedExperience: "ഗെയിമിഫൈഡ് അനുഭവം",
    gamifiedDescription: "പഠിക്കുമ്പോൾ ഇക്കോ-പോയിന്റുകൾ നേടുക, ബാഡ്ജുകൾ അൺലോക്ക് ചെയ്യുക, സമപ്രായക്കാരുമായി മത്സരിക്കുക",
    readyToStart: "നിങ്ങളുടെ ഇക്കോ-യാത്ര ആരംഭിക്കാൻ തയ്യാറാണോ?",
    joinThousands: "ഇതിനകം മാറ്റം കൊണ്ടുവരുന്ന ആയിരക്കണക്കിന് വിദ്യാർത്ഥികളും അധ്യാപകരുമായി ചേരുക",
    signUpNow: "ഇപ്പോൾ സൈൻ അപ്പ് ചെയ്യുക",

    // Quiz translations
    quizQuestion1: "ఈ പ്രവർത്തനങ്ങളിൽ ഏതാണ് കാർബൺ കാൽപ്പാട് കുറയ്ക്കാൻ ഏറ്റവും സഹായിക്കുന്നത്?",
    quizOption1A: "പ്ലാസ്റ്റിക് ബാഗുകൾ ഉപയോഗിക്കുന്നത്",
    quizOption1B: "കാർ ഓടിക്കുന്നതിനുപകരം നടക്കുകയോ സൈക്കിൾ ഓടിക്കുകയോ ചെയ്യുന്നത്",
    quizOption1C: "ലൈറ്റുകൾ കത്തിച്ചുവെച്ചിരിക്കുന്നത്",
    quizOption1D: "കൂടുതൽ വെള്ളം ഉപയോഗിക്കുന്നത്",
    quizExplanation1: "നടത്തവും സൈക്കിൾ ഓടിക്കലും കാറുകളുമായി താരതമ്യപ്പെടുത്തുമ്പോൾ പൂജ്യം ഉദ്‌വമനം ഉത്പാദിപ്പിക്കുന്നു!",
    quizQuestion2: "ഭൂമിയിലെ വെള്ളത്തിന്റെ എത്ര ശതമാനം ശുദ്ധജലമാണ്?",
    quizOption2A: "50%",
    quizOption2B: "25%",
    quizOption2C: "3%",
    quizOption2D: "75%",
    quizExplanation2: "ഭൂമിയിലെ വെള്ളത്തിന്റെ വെറും 3% മാത്രമാണ് ശുദ്ധജലം, ഇത് അതിനെ വിലപ്പെട്ടതാക്കുന്നു!",
    quizQuestion3: "ലോകമെമ്പാടും ഏറ്റവും വ്യാപകമായി ഉപയോഗിക്കുന്ന പുനരുപയോഗ ഊർജ്ജ സ്രോതസ്സ് ഏതാണ്?",
    quizOption3A: "സൗരോർജ്ജം",
    quizOption3B: "കാറ്റിൽ നിന്നുള്ള ഊർജ്ജം",
    quizOption3C: "ജലവൈദ്യുതി",
    quizOption3D: "ഭൂതാപ ഊർജ്ജം",
    quizExplanation3: "ജലവൈദ്യുതി ലോകമെമ്പാടും ഏറ്റവും കൂടുതൽ പുനരുപയോഗ ഊർജ്ജം ഉത്പാദിപ്പിക്കുന്നു!",
    takeEcoQuiz: "പെട്ടെന്നുള്ള ഇക്കോ-ക്വിസ് എടുക്കുക",
    ecoQuizTitle: "പെട്ടെന്നുള്ള ഇക്കോ-ക്വിസ്",
    quizCompleted: "ക്വിസ് പൂർത്തിയായി! താഴെ നിങ്ങളുടെ ഫലങ്ങൾ കാണുക.",
    question: "ചോദ്യം",
    of: "ൽ",
    score: "സ്കോർ",
    congratulations: "അഭിനന്ദനങ്ങൾ!",
    yourScore: "നിങ്ങളുടെ സ്കോർ",
    perfectScore: "പെർഫെക്റ്റ്! നിങ്ങൾ ഒരു ഇക്കോ-ചാമ്പ്യനാണ്!",
    goodScore: "മികച്ച ജോലി! നിങ്ങളുടെ പരിസ്ഥിതി വസ്തുതകൾ നിങ്ങൾക്കറിയാം!",
    keepLearning: "നമ്മുടെ പരിസ്ഥിതിയെക്കുറിച്ച് പഠിക്കുന്നത് തുടരുക!",
    tryAgain: "వീണ്ടും ശ്രമിക്കുക",

    // Onboarding
    onboarding: {
      step: "ഘട്ടം",
      of: "ൽ",
      previous: "മുമ്പത്തെ",
      next: "അടുത്തത്",
      skip: "ടൂർ ഒഴിവാക്കുക",
      finish: "ആരംഭിക്കുക!",
      welcome: "സ്വാഗതം!",
      dashboard: "ഡാഷ്‌ബോർഡ്",
      ecoPoints: "ഇക്കോ-പോയിന്റുകൾ",
      achievements: "നേട്ടങ്ങൾ",
      challenges: "വെല്ലുവിളികൾ",
    },
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("eco-language") as Language
    if (savedLanguage && languages.find((lang) => lang.code === savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("eco-language", lang)
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        value = translations.en
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey]
          } else {
            return key // Return key if not found in fallback
          }
        }
        break
      }
    }

    return typeof value === "string" ? value : key
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage: changeLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}
