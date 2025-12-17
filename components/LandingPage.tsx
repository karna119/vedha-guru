
import React, { useState, useEffect, useRef } from 'react';
import { getTranslations } from '../translations';
import { Language } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface LandingPageProps {
    onStart: (problem?: string) => void;
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, language, setLanguage }) => {
    const [problem, setProblem] = useState('');
    const t = getTranslations(language);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        // Play Omkara sound on mount
        const playAudio = async () => {
            if (audioRef.current) {
                try {
                    audioRef.current.volume = 0.5; // Set reasonable volume
                    await audioRef.current.play();

                    // Stop after 5 seconds
                    setTimeout(() => {
                        if (audioRef.current) {
                            // Fade out effect could be added here, but simple pause for now
                            audioRef.current.pause();
                            audioRef.current.currentTime = 0;
                        }
                    }, 5000);
                } catch (err) {
                    console.log("Audio autoplay blocked by browser policy:", err);
                }
            }
        };

        playAudio();
    }, []);

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-orange-50 to-amber-50" onClick={() => {
            // Try to play on first interaction if not playing
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().catch(e => console.log("Still blocked", e));
            }
        }}>
            {/* Audio Element */}
            <audio ref={audioRef} src="/omkara.ogg" preload="auto" />

            {/* Manual Audio Control */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (audioRef.current) {
                        if (audioRef.current.paused) {
                            audioRef.current.play();
                        } else {
                            audioRef.current.pause();
                        }
                    }
                }}
                className="fixed bottom-4 right-4 z-50 bg-white/80 backdrop-blur p-3 rounded-full shadow-lg border border-orange-200 hover:scale-110 transition-transform"
                title="Play/Pause Chant"
            >
                🔊
            </button>

            {/* Navigation/Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">🕉️</span>
                        <h1 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 ${language === Language.HINDI ? 'font-hindi' : 'font-telugu'}`}>
                            {t.appTitle}
                        </h1>
                    </div>
                    <div>
                        <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/landing_hero.png"
                        alt="Spiritual Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-orange-50/90" />
                </div>


                <div className="relative z-10 max-w-5xl mx-auto pt-20">
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                        {t.heroHeadline}
                    </h2>
                    <p className="text-xl md:text-2xl text-orange-50 font-medium max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-md">
                        {t.heroSubheading}
                    </p>

                    {/* Single Call to Action Button */}
                    <div className="mt-8">
                        <button
                            onClick={() => onStart()}
                            className="px-10 py-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full font-bold text-xl shadow-2xl hover:scale-105 active:scale-95 transition-transform border-2 border-orange-300/30 ring-4 ring-orange-500/20"
                        >
                            {t.beginJourney}
                        </button>
                    </div>
                </div>
            </header>

            {/* How It Works Section - Restored */}
            <section className="py-24 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-16 relative">
                        {t.howItWorksTitle}
                        <span className="block h-1 w-20 bg-orange-400 mx-auto mt-4 rounded-full" />
                    </h3>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: t.step1Title, desc: t.step1Desc, icon: "🗣️" },
                            { title: t.step2Title, desc: t.step2Desc, icon: "🕉️" },
                            { title: t.step3Title, desc: t.step3Desc, icon: "💡" }
                        ].map((step, idx) => (
                            <div key={idx} className="text-center group p-6 rounded-3xl hover:bg-orange-50/50 transition-colors">
                                <div className="w-20 h-20 mx-auto bg-orange-100 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md">
                                    {step.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Section (Replacing How It Works with just Vision) */}
            <section className="py-24 bg-gradient-to-b from-orange-50 to-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h3 className="text-4xl font-bold mb-8 text-orange-900">{t.visionTitle}</h3>
                    <div className="max-w-4xl mx-auto">
                        <blockquote className="text-3xl font-serif italic text-orange-700/80 mb-10 leading-relaxed">
                            "{t.visionStatement1}"
                        </blockquote>
                        <p className="text-xl text-gray-600 mb-12">{t.visionStatement2}</p>
                    </div>

                    {/* Mahatmas & Wisdom Visuals */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <div className="rounded-3xl overflow-hidden shadow-xl h-80 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1623345805780-8f6a908a8a49?q=80&w=800&auto=format&fit=crop"
                                alt="Scriptural Wisdom"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <span className="text-white text-xl font-bold">Timeless Scriptures</span>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-xl h-80 relative group mt-0 md:-mt-8">
                            <img
                                src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop"
                                alt="Sadhu Meditation"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <span className="text-white text-xl font-bold">Wisdom of Sages</span>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-xl h-80 relative group">
                            <img
                                src="https://images.unsplash.com/photo-1561385419-f53e6b7f3dc5?q=80&w=800&auto=format&fit=crop"
                                alt="Temple Atmosphere"
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <span className="text-white text-xl font-bold">Temple Serenity</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        {(t.whyDifferentPoints || []).map((point, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 hover:shadow-xl transition-shadow">
                                <span className="text-4xl block mb-4">🕉️</span>
                                <p className="text-lg text-gray-700 font-medium">{point}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-12 text-center border-t border-gray-100">
                <p className="text-gray-400">© 2025 DharmaSaathi. All rights reserved.</p>
            </footer>
        </div>
    );
};
