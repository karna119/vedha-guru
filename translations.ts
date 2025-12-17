import { Language, TeachingMode, StudyMode } from './types';

export interface Translations {
    appTitle: string;
    appSubtitle: string;
    appDescription: string;
    selectLanguage: string;
    startLearning: string;
    microphoneNote: string;
    configError: string;
    apiKeyMissing: string;

    // Teaching modes
    ramayanaTitle: string;
    ramayanaDescription: string;
    mahabharataTitle: string;
    mahabharataDescription: string;
    bhagavatamTitle: string;
    bhagavatamDescription: string;

    // Login
    welcome: string;
    enterDetails: string;
    nameLabel: string;
    phoneLabel: string;
    startJourney: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    validationError: string;

    // Session page
    sessionTitle: {
        [key: string]: string;
    };
    statusConnecting: string;
    statusSpeaking: string;
    statusListening: string;
    statusMicOff: string;
    statusError: string;
    statusDisconnected: string;

    // Study modes
    slokaRecitation: string;
    storytelling: string;
    explanation: string;

    // Chat
    chatPlaceholder: string;
    askQuestion: string;
    endSession: string;
    viewScript: string;
    scriptTitle: string;
    close: string;
}

const teluguTranslations: Translations = {
    appTitle: 'తెలుగు వేద గురువు',
    appSubtitle: 'Telugu Veda Guru',
    appDescription: 'రామాయణం, మహాభారతం మరియు భాగవతం ద్వారా ఆధ్యాత్మిక జ్ఞానం నేర్చుకోండి.',
    selectLanguage: 'భాష ఎంచుకోండి',
    startLearning: 'నేర్చుకోవడం ప్రారంభించండి',
    microphoneNote: 'మైక్రోఫోన్ అనుమతి అవసరం • Gemini ద్వారా',
    configError: 'కాన్ఫిగరేషన్ లోపం',
    apiKeyMissing: 'API కీ కనుగొనబడలేదు. దయచేసి .env.local లో VITE_API_KEY సెట్ చేయండి',

    ramayanaTitle: 'రామాయణం',
    ramayanaDescription: 'శ్రీరాముని గాథ',
    mahabharataTitle: 'మహాభారతం',
    mahabharataDescription: 'పాండవుల చరిత్ర',
    bhagavatamTitle: 'శ్రీమద్భాగవతం',
    bhagavatamDescription: 'శ్రీకృష్ణ లీలలు',

    welcome: 'స్వాగతం',
    enterDetails: 'మీ వివరాలను నమోదు చేయండి',
    nameLabel: 'పేరు',
    phoneLabel: 'ఫోన్ నంబర్',
    startJourney: 'ప్రారంభించండి',
    namePlaceholder: 'మీ పేరు',
    phonePlaceholder: '10 అంకెల నంబర్',
    validationError: 'దయచేసి సరైన వివరాలను నమోదు చేయండి',

    sessionTitle: {
        [TeachingMode.RAMAYANA]: 'శ్రీ రామాయణం',
        [TeachingMode.MAHABHARATA]: 'శ్రీ మహాభారతం',
        [TeachingMode.BHAGAVATAM]: 'శ్రీమద్భాగవతం'
    },
    statusConnecting: 'గురువుతో కనెక్ట్ అవుతోంది...',
    statusSpeaking: 'గురువు మాట్లాడుతున్నారు...',
    statusListening: 'గురువు వింటున్నారు...',
    statusMicOff: 'కనెక్ట్ అయింది (మైక్ ఆఫ్) - మాట్లాడటానికి మైక్ నొక్కండి',
    statusError: 'కనెక్షన్ లోపం. దయచేసి పునఃప్రారంభించండి.',
    statusDisconnected: 'సెషన్ ముగిసింది.',

    slokaRecitation: 'శ్లోక పఠనం',
    storytelling: 'కథా వాచకం',
    explanation: 'వివరణ',

    chatPlaceholder: 'గురువుకు సందేశం టైప్ చేయండి...',
    askQuestion: 'ప్రశ్న అడగండి లేదా "నమస్కారం" అని చెప్పండి...',
    endSession: 'సెషన్ ముగించండి',
    viewScript: 'స్క్రిప్ట్ చూడండి',
    scriptTitle: 'సంభాషణ స్క్రిప్ట్',
    close: 'మూసివేయు'
};

const hindiTranslations: Translations = {
    appTitle: 'वेद गुरु',
    appSubtitle: 'Veda Guru',
    appDescription: 'रामायण, महाभारत और भागवतम् के माध्यम से आध्यात्मिक ज्ञान सीखें।',
    selectLanguage: 'भाषा चुनें',
    startLearning: 'सीखना शुरू करें',
    microphoneNote: 'माइक्रोफ़ोन की अनुमति आवश्यक • Gemini द्वारा',
    configError: 'कॉन्फ़िगरेशन त्रुटि',
    apiKeyMissing: 'API कुंजी नहीं मिली। कृपया .env.local में VITE_API_KEY सेट करें',

    ramayanaTitle: 'रामायण',
    ramayanaDescription: 'श्री राम की गाथा',
    mahabharataTitle: 'महाभारत',
    mahabharataDescription: 'पांडवों का इतिहास',
    bhagavatamTitle: 'श्रीमद्भागवतम्',
    bhagavatamDescription: 'श्री कृष्ण की लीलाएँ',

    welcome: 'स्वागत',
    enterDetails: 'अपना विवरण दर्ज करें',
    nameLabel: 'नाम',
    phoneLabel: 'फ़ोन नंबर',
    startJourney: 'शुरू करें',
    namePlaceholder: 'आपका नाम',
    phonePlaceholder: '10 अंकों का नंबर',
    validationError: 'कृपया सही विवरण दर्ज करें',

    sessionTitle: {
        [TeachingMode.RAMAYANA]: 'श्री रामायण',
        [TeachingMode.MAHABHARATA]: 'श्री महाभारत',
        [TeachingMode.BHAGAVATAM]: 'श्रीमद्भागवतम्'
    },
    statusConnecting: 'गुरु से जुड़ रहे हैं...',
    statusSpeaking: 'गुरु बोल रहे हैं...',
    statusListening: 'गुरु सुन रहे हैं...',
    statusMicOff: 'जुड़ा हुआ (माइक बंद) - बोलने के लिए माइक टैप करें',
    statusError: 'कनेक्शन त्रुटि। कृपया पुनः आरंभ करें।',
    statusDisconnected: 'सत्र समाप्त।',

    slokaRecitation: 'श्लोक पाठ',
    storytelling: 'कथावाचन',
    explanation: 'व्याख्या',

    chatPlaceholder: 'गुरु को संदेश टाइप करें...',
    askQuestion: 'प्रश्न पूछें या "नमस्कार" कहें...',
    endSession: 'सत्र समाप्त करें',
    viewScript: 'लिपि देखें',
    scriptTitle: 'बातचीत की लिपि',
    close: 'बंद करें'
};

const englishTranslations: Translations = {
    appTitle: 'Veda Guru',
    appSubtitle: 'Your Spiritual Guide',
    appDescription: 'Learn spiritual wisdom through Ramayana, Mahabharata, and Bhagavatam.',
    selectLanguage: 'Select Language',
    startLearning: 'Start Learning',
    microphoneNote: 'Requires Microphone Access • Powered by Gemini',
    configError: 'Configuration Error',
    apiKeyMissing: 'API Key not found. Please ensure VITE_API_KEY is set in .env.local',

    ramayanaTitle: 'Ramayana',
    ramayanaDescription: 'The Epic of Rama',
    mahabharataTitle: 'Mahabharata',
    mahabharataDescription: 'The Great Epic',
    bhagavatamTitle: 'Bhagavatam',
    bhagavatamDescription: 'Leelas of Krishna',

    welcome: 'Welcome',
    enterDetails: 'Enter your details',
    nameLabel: 'Name',
    phoneLabel: 'Phone Number',
    startJourney: 'Start Journey',
    namePlaceholder: 'Your Name',
    phonePlaceholder: '10 digit number',
    validationError: 'Please enter valid details',

    sessionTitle: {
        [TeachingMode.RAMAYANA]: 'Shri Ramayana',
        [TeachingMode.MAHABHARATA]: 'Shri Mahabharata',
        [TeachingMode.BHAGAVATAM]: 'Shrimad Bhagavatam'
    },
    statusConnecting: 'Connecting to Guru...',
    statusSpeaking: 'Guru is speaking...',
    statusListening: 'Guru is listening...',
    statusMicOff: 'Connected (Mic Off) - Tap mic to speak',
    statusError: 'Connection Error. Please restart.',
    statusDisconnected: 'Session Ended.',

    slokaRecitation: 'Sloka Recitation',
    storytelling: 'Storytelling',
    explanation: 'Explanation',

    chatPlaceholder: 'Type a message to Guru...',
    askQuestion: 'Ask a question or say "Namaskaram" to start...',
    endSession: 'End Session',
    viewScript: 'View Script',
    scriptTitle: 'Conversation Script',
    close: 'Close'
};

export const translations: Record<Language, Translations> = {
    [Language.TELUGU]: teluguTranslations,
    [Language.HINDI]: hindiTranslations,
    [Language.ENGLISH]: englishTranslations
};

export const getTranslations = (language: Language): Translations => {
    return translations[language] || englishTranslations;
};
