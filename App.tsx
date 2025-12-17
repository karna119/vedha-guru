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

  const handleLandingStart = (problem?: string) => {
    setInitialProblem(problem);
    if (problem) {
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
    <div className="min-h-screen animated-gradient-bg flex flex-col items-center justify-center p-6 relative overflow-y-auto overflow-x-hidden">
      <SecurityWrapper />
      {/* Background effects */}
      <FloatingParticles />
      <DecorativeRings />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg">

        {/* Language Selector */}
        <div className="mb-8">
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>

        {/* Header with Om symbol */}
        <div className="text-center mb-10">
          <div className="relative inline-block mb-6">
            {/* Glowing Om */}
            <div className="om-glow w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl cursor-pointer">
              <span className="text-5xl text-white drop-shadow-lg">🕉️</span>
            </div>
            {/* Outer ring */}
            <div className="absolute inset-0 -m-3 rounded-full border-2 border-amber-400/30 animate-ping" style={{ animationDuration: '3s' }} />
          </div>

          <h1 className={`text-5xl font-bold text-gradient tracking-tight mb-2 ${selectedLanguage === Language.HINDI ? 'font-hindi' : 'font-telugu'
            }`}>
            {t.appTitle}
          </h1>
          <p className="text-xl text-white/80 font-medium mb-3">
            {t.appSubtitle}
          </p>
          <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
            {t.appDescription}
          </p>
        </div>

        {/* Teaching Mode Cards */}
        <div className="space-y-4 mb-8">
          {modeCards.map(({ mode, icon, title, description, gradient }) => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`w-full glass card-hover rounded-2xl p-5 flex items-center gap-5 group relative overflow-hidden
                ${selectedMode === mode
                  ? 'ring-2 ring-amber-400/50 bg-white/15'
                  : 'hover:bg-white/10'
                }`}
            >
              {/* Selection indicator */}
              {selectedMode === mode && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-500" />
              )}

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {icon}
              </div>

              {/* Text */}
              <div className="text-left flex-1">
                <h3 className="font-bold text-white text-lg font-telugu group-hover:text-amber-200 transition-colors">
                  {title}
                </h3>
                <p className="text-white/60 text-sm">
                  {description}
                </p>
              </div>

              {/* Arrow */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${selectedMode === mode
                ? 'bg-amber-500 text-white'
                : 'bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white'
                }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </button>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          className="w-full btn-premium py-5 text-white rounded-2xl font-bold text-lg shadow-2xl active:scale-95 transition-transform"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>{t.startLearning}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </button>

        {/* Footer note */}
        <p className="text-center text-white/40 text-xs mt-6">
          {t.microphoneNote}
        </p>
      </div>
    </div>
  );
}

export default App;