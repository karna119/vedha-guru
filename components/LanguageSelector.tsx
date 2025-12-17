import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
    selectedLanguage: Language;
    onLanguageChange: (language: Language) => void;
}

const languageConfig = [
    { lang: Language.TELUGU, label: 'తెలుగు', icon: '🕉️', color: 'from-orange-500 to-amber-500' },
    { lang: Language.HINDI, label: 'हिंदी', icon: '🙏', color: 'from-rose-500 to-pink-500' },
    { lang: Language.ENGLISH, label: 'English', icon: '🌐', color: 'from-blue-500 to-cyan-500' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
    selectedLanguage,
    onLanguageChange
}) => {
    return (
        <div className="flex justify-center gap-3">
            {languageConfig.map(({ lang, label, icon, color }) => {
                const isSelected = selectedLanguage === lang;
                return (
                    <button
                        key={lang}
                        onClick={() => onLanguageChange(lang)}
                        className={`
              relative group px-5 py-2.5 rounded-2xl font-semibold text-sm
              transition-all duration-300 transform
              ${isSelected
                                ? `bg-gradient-to-r ${color} text-white shadow-lg scale-105 ring-2 ring-white/30`
                                : 'bg-gray-100/50 backdrop-blur-sm text-gray-700 hover:bg-gray-100 hover:scale-102 border border-gray-200/50'
                            }
              hover:-translate-y-0.5 active:scale-95
            `}
                    >
                        {/* Glow effect for selected */}
                        {isSelected && (
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${color} blur-xl opacity-50 -z-10`} />
                        )}

                        <span className="flex items-center gap-2">
                            <span className="text-lg">{icon}</span>
                            <span>{label}</span>
                        </span>

                        {/* Selection indicator */}
                        {isSelected && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-lg" />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
