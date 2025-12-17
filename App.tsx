import React, { useState, useEffect } from 'react';
import { LiveSession } from './components/LiveSession';
import { LanguageSelector } from './components/LanguageSelector';
import SecurityWrapper from './components/SecurityWrapper';
import { LoginScreen } from './components/LoginScreen';
import { AdminDashboard } from './components/AdminDashboard';
import { LandingPage } from './components/LandingPage';
import { TeachingMode, Language } from './types';
import { getTranslations } from './translations';

// Floating particles component
const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 10,
    size: 2 + Math.random() * 4
  }));

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  );
};

// Decorative rings component
const DecorativeRings: React.FC = () => (
  <>
    <div
      className="decorative-ring"
      style={{
        width: '400px',
        height: '400px',
        top: '-100px',
        right: '-100px',
        animationDelay: '0s'
      }}
    />
    <div
      className="decorative-ring"
      style={{
        width: '300px',
        height: '300px',
        bottom: '-50px',
        left: '-50px',
        animationDelay: '1s'
      }}
    />
    <div
      className="decorative-ring"
      style={{
        width: '200px',
        height: '200px',
        top: '40%',
        left: '10%',
        animationDelay: '2s'
      }}
    />
  </>
);

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedMode, setSelectedMode] = useState<TeachingMode>(TeachingMode.RAMAYANA);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('vedaGuruLanguage');
    return (saved as Language) || Language.TELUGU;
  });

  const t = getTranslations(selectedLanguage);


  const apiKey = import.meta.env.VITE_API_KEY || '';
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [initialProblem, setInitialProblem] = useState<string | undefined>(undefined);

  // Save language preference
  useEffect(() => {
    localStorage.setItem('vedaGuruLanguage', selectedLanguage);
  }, [selectedLanguage]);

  const handleLogin = (name: string, phone: string) => {
    setUser({ name, phone });
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminBack = () => {
    setIsAdmin(false);
  };

  const handleLandingStart = (problem?: string, mode?: TeachingMode) => {
    setInitialProblem(problem);
    if (mode) {
      setSelectedMode(mode);
    } else if (problem) {
      setSelectedMode(TeachingMode.DHARMA);
    }
    setShowLanding(false);
  };


  if (!apiKey) {
    return (
      <div className="min-h-screen animated-gradient-bg flex items-center justify-center p-8">
        <SecurityWrapper />
        <div className="glass rounded-3xl p-8 text-center max-w-md">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">{t.configError}</h1>
          <p className="text-white/70">{t.apiKeyMissing}</p>
        </div>
      </div>
    );
  }

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleEnd = () => {
    setHasStarted(false);
    setSelectedMode(TeachingMode.RAMAYANA);
  };

  if (hasStarted) {
    return (
      <div className="h-screen bg-gradient-to-br from-saffron-50 to-saffron-100">
        <SecurityWrapper />
        <LiveSession
          apiKey={apiKey}
          mode={selectedMode}
          language={selectedLanguage}
          onEndSession={handleEnd}
          initialMessage={initialProblem}
        />
      </div>
    );
  }

  if (showLanding) {
    return (
      <>
        <SecurityWrapper />
        <LandingPage
          onStart={handleLandingStart}
          language={selectedLanguage}
          setLanguage={setSelectedLanguage}
        />
      </>
    );
  }

  if (isAdmin) {
    return (
      <div className="min-h-screen animated-gradient-bg relative overflow-hidden">
        <SecurityWrapper />
        <AdminDashboard onBack={handleAdminBack} />
      </div>
    );
  }

  // Show login screen if no user
  if (!user) {
    return (
      <div className="min-h-screen animated-gradient-bg flex flex-col items-center justify-center p-6 relative overflow-y-auto overflow-x-hidden">
        <SecurityWrapper />
        <FloatingParticles />
        <DecorativeRings />
        <div className="relative z-10 w-full max-w-lg mb-8">
          {/* Back to landing optional */}
          <button
            onClick={() => setShowLanding(true)}
            className="mb-4 text-white/50 hover:text-white text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
        <LoginScreen onLogin={handleLogin} onAdminLogin={handleAdminLogin} language={selectedLanguage} />
      </div>
    );
  }

  const modeCards = [
    {
      mode: TeachingMode.DHARMA,
      icon: '🕉️',
      title: 'Dharma',
      description: 'Guidance from Gita, Ramayana, Bhagavatam',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      mode: TeachingMode.RAMAYANA,
      icon: '🏹',
      title: t.ramayanaTitle,
      description: t.ramayanaDescription,
      gradient: 'from-amber-500 to-orange-600'
    },
    {
      mode: TeachingMode.MAHABHARATA,
      icon: '🙏',
      title: t.mahabharataTitle,
      description: t.mahabharataDescription,
      gradient: 'from-rose-500 to-pink-600'
    },
    {
      mode: TeachingMode.BHAGAVATAM,
      icon: '📜',
      title: t.bhagavatamTitle,
      description: t.bhagavatamDescription,
      gradient: 'from-violet-500 to-purple-600'
    }
  ];

  return (
  // Mode Selection Screen (The "Middle Page")
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 flex flex-col items-center p-4 md:p-6 overflow-y-auto">
      <SecurityWrapper />

      <div className="w-full max-w-lg my-auto relative z-10">

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mb-4 inline-block">
            <span className="text-6xl filter drop-shadow-md animate-pulse-slow">🕉️</span>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 mb-3 ${selectedLanguage === Language.HINDI ? 'font-hindi' : 'font-telugu'}`}>
            {t.appTitle}
          </h1>
          <p className="text-gray-600 text-lg font-medium leading-relaxed px-4">
            {t.appSubtitle}
          </p>
        </div>

        {/* Language Selector */}
        <div className="mb-8 flex justify-center">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Mode Selection Cards */}
        <div className="space-y-4 mb-8">
          <p className="text-gray-500 text-sm font-bold uppercase tracking-wider ml-2 mb-2">Select Your Path</p>
          {modeCards.map(({ mode, icon, title, description, gradient }) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`w-full bg-white border-2 rounded-2xl p-4 flex items-center gap-4 group transition-all duration-200 shadow-sm hover:shadow-md
                    ${selectedMode === mode
                  ? 'border-orange-500 ring-4 ring-orange-500/10 scale-[1.02]'
                  : 'border-white hover:border-orange-200'
                }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl text-white shadow-md group-hover:scale-110 transition-transform`}>
                {icon}
              </div>

              <div className="text-left flex-1">
                <h3 className={`font-bold text-gray-800 text-lg group-hover:text-orange-600 transition-colors ${selectedLanguage === Language.HINDI ? 'font-hindi' : 'font-telugu'}`}>
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-tight">
                  {description}
                </p>
              </div>

              <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedMode === mode ? 'bg-orange-500 border-orange-500 text-white' : 'border-gray-200 text-transparent'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full py-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span>{t.startLearning}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>

        <p className="text-center text-gray-400 text-xs mt-6 px-8 leading-relaxed">
          {t.microphoneNote}
        </p>

      </div>
    </div>
  );
}

export default App;