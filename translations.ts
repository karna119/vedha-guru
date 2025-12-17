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
    gitaTitle: string;
    gitaDescription: string;
    ramayanaTitle: string;
    ramayanaDescription: string;
    vemanaTitle: string;
    vemanaDescription: string;

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
}

const teluguTranslations: Translations = {
    appTitle: '\u0c24\u0c46\u0c32\u0c41\u0c17\u0c41 \u0c35\u0c47\u0c26 \u0c17\u0c41\u0c30\u0c41\u0c35\u0c41',
    appSubtitle: 'Telugu Veda Guru',
    appDescription: 'భగవద్గీత, రామాయణం మరియు వేమన శతకం ద్వారా ఆధ్యాత్మిక జ్ఞానం నేర్చుకోండి.',
    selectLanguage: 'భాష ఎంచుకోండి',
    startLearning: 'నేర్చుకోవడం ప్రారంభించండి',
    microphoneNote: 'మైక్రోఫోన్ అనుమతి అవసరం • Gemini ద్వారా',
    configError: 'కాన్ఫిగరేషన్ లోపం',
    apiKeyMissing: 'API కీ కనుగొనబడలేదు. దయచేసి .env.local లో VITE_API_KEY సెట్ చేయండి',

    gitaTitle: 'భగవద్గీత',
    gitaDescription: 'శ్రీకృష్ణుని జ్ఞానం',
    ramayanaTitle: 'రామాయణం',
    ramayanaDescription: 'శ్రీరాముని గాథ',
    vemanaTitle: 'వేమన శతకం',
    vemanaDescription: 'జ్ఞాన పద్యాలు',

    sessionTitle: {
        [TeachingMode.GITA]: 'శ్రీ మద్భగవద్గీత',
        [TeachingMode.RAMAYANA]: 'శ్రీ రామాయణం',
        [TeachingMode.VEMANA]: 'వేమన శతకం',
        [TeachingMode.GENERAL]: 'ఆధ్యాత్మిక చర్చ'
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
    endSession: 'సెషన్ ముగించండి'
};

const hindiTranslations: Translations = {
    appTitle: '\u0935\u0947\u0926 \u0917\u0941\u0930\u0941',
    appSubtitle: 'Veda Guru',
    appDescription: 'भगवद्गीता, रामायण और वेमना शतकम् के माध्यम से आध्यात्मिक ज्ञान सीखें।',
    selectLanguage: 'भाषा चुनें',
    startLearning: 'सीखना शुरू करें',
    microphoneNote: 'माइक्रोफ़ोन की अनुमति आवश्यक • Gemini द्वारा',
    configError: 'कॉन्फ़िगरेशन त्रुटि',
    apiKeyMissing: 'API कुंजी नहीं मिली। कृपया .env.local में VITE_API_KEY सेट करें',

    gitaTitle: 'भगवद्गीता',
    gitaDescription: 'श्री कृष्ण का ज्ञान',
    ramayanaTitle: 'रामायण',
    ramayanaDescription: 'श्री राम की गाथा',
    vemanaTitle: 'वेमना शतकम्',
    vemanaDescription: 'ज्ञान के पद्य',

    sessionTitle: {
        [TeachingMode.GITA]: 'श्रीमद्भगवद्गीता',
        [TeachingMode.RAMAYANA]: 'श्री रामायण',
        [TeachingMode.VEMANA]: 'वेमना शतकम्',
        [TeachingMode.GENERAL]: 'आध्यात्मिक चर्चा'
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
    endSession: 'सत्र समाप्त करें'
};

const englishTranslations: Translations = {
    appTitle: 'Veda Guru',
    appSubtitle: 'Your Spiritual Guide',
    appDescription: 'Learn spiritual wisdom through Bhagavad Gita, Ramayana, and Vemana Satakam.',
    selectLanguage: 'Select Language',
    startLearning: 'Start Learning',
    microphoneNote: 'Requires Microphone Access • Powered by Gemini',
    configError: 'Configuration Error',
    apiKeyMissing: 'API Key not found. Please ensure VITE_API_KEY is set in .env.local',

    gitaTitle: 'Bhagavad Gita',
    gitaDescription: 'Wisdom of Lord Krishna',
    ramayanaTitle: 'Ramayana',
    ramayanaDescription: 'The Epic of Rama',
    vemanaTitle: 'Vemana Satakam',
    vemanaDescription: 'Poems of Wisdom',

    sessionTitle: {
        [TeachingMode.GITA]: 'Shrimad Bhagavad Gita',
        [TeachingMode.RAMAYANA]: 'Shri Ramayana',
        [TeachingMode.VEMANA]: 'Vemana Satakam',
        [TeachingMode.GENERAL]: 'Spiritual Discussion'
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
    endSession: 'End Session'
};

export const translations: Record<Language, Translations> = {
    [Language.TELUGU]: teluguTranslations,
    [Language.HINDI]: hindiTranslations,
    [Language.ENGLISH]: englishTranslations
};

export const getTranslations = (language: Language): Translations => {
    return translations[language] || englishTranslations;
};
