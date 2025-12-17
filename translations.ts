import { Language, TeachingMode, StudyMode } from './types';

export interface Translations {
    appTitle: string;
    appSubtitle: string;
    appDescription: string;

    // Landing Page
    heroHeadline: string;
    heroSubheading: string;
    ctaShareProblem: string;
    ctaAskGita: string;
    promptPlaceholder: string;
    promptHelper: string;
    findGuidanceBtn: string;
    howItWorksTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    visionTitle: string;
    visionStatement1: string;
    visionStatement2: string;
    beginJourney: string;
    whyDifferentTitle: string;
    whyDifferentPoints: string[];

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
    appTitle: 'Dharmika Mitra (ధార్మిక మిత్ర)',
    appSubtitle: 'Guidance from Gita, Ramayana & Bhagavatam',
    appDescription: 'Navigate life\'s challenges with timeless wisdom.',

    // Landing Page (Telugu)
    heroHeadline: 'మీ సమస్యను చెప్పండి. ధర్మం మీకు మార్గనిర్దేశం చేస్తుంది.',
    heroSubheading: 'జీవితం గందరగోళంగా ఉన్నప్పుడు, గీత మాట్లాడుతుంది. బాధ్యత భారంగా అనిపించినప్పుడు, రాముడు దారి చూపుతాడు.',
    ctaShareProblem: 'మీ సమస్యను పంచుకోండి',
    ctaAskGita: 'గీతను అడగండి',
    promptPlaceholder: 'మీ పరిస్థితి లేదా చిక్కును వివరించండి...',
    promptHelper: 'ఉదా: "నా కెరీర్ మరియు బాధ్యత గురించి నేను గందరగోళంలో ఉన్నాను."',
    findGuidanceBtn: 'ధర్మం ద్వారా మార్గనిర్దేశం పొందండి',
    howItWorksTitle: 'ఇది ఎలా పని చేస్తుంది',
    step1Title: 'మీ సమస్యను పంచుకోండి',
    step1Desc: 'మీ గందరగోళం, భయం లేదా సందిగ్ధతను మీ మాటల్లో వ్యక్తపరచండి.',
    step2Title: 'శాస్త్ర జ్ఞానం అన్వయించబడుతుంది',
    step2Desc: 'యాప్ మీ పరిస్థితిని గీత, రామాయణం & భాగవతం ద్వారా విశ్లేషిస్తుంది.',
    step3Title: 'ఉదాహరణతో మార్గనిర్దేశం',
    step3Desc: 'సంబంధిత శ్లోకం, అర్థం మరియు ఆచరణాత్మక జీవిత ఉదాహరణను పొందండి.',
    visionTitle: 'మా దార్శనికత',
    visionStatement1: 'మనస్సు చంచలంగా ఉన్నప్పుడు, ధర్మం లంగరు అవుతుంది.',
    visionStatement2: 'ప్రతి సమస్యకు ఒక మార్గం ఉంది - అది జ్ఞానం ద్వారా వెల్లడవుతుంది.',
    beginJourney: 'మీ ధార్మిక ప్రయాణాన్ని ప్రారంభించండి',
    whyDifferentTitle: 'ధార్మిక మిత్ర ఎందుకు?',
    whyDifferentPoints: [
        'ప్రామాణిక హిందూ శాస్త్రాల ఆధారంగా',
        'కేవలం కోట్స్ కాదు, సందర్భోచిత జ్ఞానం',
        'ఆధునిక జీవితానికి సంప్రదాయాన్ని అన్వయిస్తుంది',
        'ప్రశాంతమైన, ప్రతిబింబించే మరియు తీర్పు లేని'
    ],

    selectLanguage: 'భాష ఎంచుకోండి',
    startLearning: 'ప్రారంభించండి',
    microphoneNote: 'ఉత్తమ అనుభవం కోసం మైక్రోఫోన్ అనుమతించండి',
    configError: 'ఆకృతీకరణ లోపం',
    apiKeyMissing: 'API Key కనుగొనబడలేదు. దయచేసి .env.local లో VITE_API_KEY సెట్ చేయండి',

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
    appTitle: 'Dharmika Mitra',
    appSubtitle: 'Guidance from Gita, Ramayana & Bhagavatam',
    appDescription: 'Navigate life\'s challenges with timeless wisdom.',

    // Landing Page (Hindi)
    heroHeadline: 'अपनी समस्या बताएं। धर्म आपका मार्गदर्शन करेगा।',
    heroSubheading: 'जब जीवन भ्रमित लगे, तो गीता बोलती है। जब कर्तव्य भारी लगे, तो राम मार्ग दिखाते हैं।',
    ctaShareProblem: 'अपनी समस्या साझा करें',
    ctaAskGita: 'गीता से पूछें',
    promptPlaceholder: 'अपनी स्थिति या दुविधा का वर्णन करें...',
    promptHelper: 'उदाहरण: "मैं अपने करियर और कर्तव्य को लेकर भ्रमित महसूस कर रहा हूँ।"',
    findGuidanceBtn: 'धर्म के माध्यम से मार्गदर्शन प्राप्त करें',
    howItWorksTitle: 'यह कैसे काम करता है',
    step1Title: 'आप अपनी समस्या साझा करें',
    step1Desc: 'अपने भ्रम, डर या दुविधा को अपने शब्दों में व्यक्त करें।',
    step2Title: 'शास्त्र ज्ञान लागू किया जाता है',
    step2Desc: 'ऐप आपकी स्थिति का विश्लेषण गीता, रामायण और भागवतम् के माध्यम से करता है।',
    step3Title: 'उदाहरण के साथ मार्गदर्शन',
    step3Desc: 'प्रासंगिक श्लोक, अर्थ और व्यावहारिक जीवन उदाहरण प्राप्त करें।',
    visionTitle: 'हमारा दृष्टिकोण',
    visionStatement1: 'जब मन बेचैन होता है, तो धर्म लंगर बन जाता है।',
    visionStatement2: 'हर समस्या का एक रास्ता है—जो ज्ञान द्वारा प्रकट होता है।',
    beginJourney: 'अपनी धार्मिक यात्रा शुरू करें',
    whyDifferentTitle: 'धार्मिक मित्र क्यों?',
    whyDifferentPoints: [
        'प्रामाणिक हिंदू शास्त्रों पर आधारित',
        'केवल उद्धरण नहीं, प्रासंगिक ज्ञान',
        'आधुनिक जीवन के लिए परंपरा का सम्मान',
        'शांत, चिंतनशील और निर्णय-मुक्त'
    ],

    selectLanguage: 'भाषा चुनें',
    startLearning: 'शुरू करें',
    microphoneNote: 'कृपया माइक्रोफ़ोन की अनुमति दें',
    configError: 'कॉन्फ़िगरेशन त्रुटि',
    apiKeyMissing: 'API Key नहीं मिली। कृपया .env.local में VITE_API_KEY सेट करें',

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
    appTitle: 'Dharmika Mitra',
    appSubtitle: 'Guidance from Gita, Ramayana & Bhagavatam',
    appDescription: 'Navigate life\'s challenges with timeless wisdom.',

    // Landing Page
    heroHeadline: 'Tell Me Your Problem. Dharma Will Guide You.',
    heroSubheading: 'When life feels confusing, the Gita speaks. When duty feels heavy, Rama shows the path.',
    ctaShareProblem: 'Share Your Problem',
    ctaAskGita: 'Ask the Gita',
    promptPlaceholder: 'Describe your situation or dilemma...',
    promptHelper: 'Ex: "I feel confused about my career and duty."',
    findGuidanceBtn: 'Find Guidance Through Dharma',
    howItWorksTitle: 'How It Works',
    step1Title: 'You Share Your Problem',
    step1Desc: 'Express your confusion, fear, or dilemma in your own words.',
    step2Title: 'Scriptural Wisdom is Applied',
    step2Desc: 'The app analyzes your situation through Gita, Ramayana & Bhagavatam.',
    step3Title: 'Guidance with Example',
    step3Desc: 'Receive relevant verse, meaning, and practical life example.',
    visionTitle: 'Our Vision',
    visionStatement1: 'When the mind is restless, Dharma becomes the anchor.',
    visionStatement2: 'Every problem has a path—revealed by wisdom.',
    beginJourney: 'Begin Your Dharmic Journey',
    whyDifferentTitle: 'Why Dharmika Mitra?',
    whyDifferentPoints: [
        'Rooted in authentic Hindu scriptures',
        'Contextual wisdom, not just quotes',
        'Respects tradition while serving modern life',
        'Calm, reflective, and non-judgmental'
    ],

    selectLanguage: 'Select Language',
    startLearning: 'Start Learning',
    microphoneNote: 'Please allow microphone access for best experience',
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
