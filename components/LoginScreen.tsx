import React, { useState } from 'react';
import { getTranslations } from '../translations';
import { userService } from '../services/userService';
import { Language } from '../types';

interface LoginScreenProps {
    onLogin: (name: string, phone: string) => void;
    onAdminLogin?: () => void;
    language: Language;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onAdminLogin, language }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const t = getTranslations(language);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isAdminMode) {
            const isValid = await userService.verifyAdmin(password);
            if (isValid) {
                if (onAdminLogin) onAdminLogin();
            } else {
                setError('Invalid Admin Password');
            }
            return;
        }

        if (name.length < 3 || phone.length !== 10 || !/^\d+$/.test(phone)) {
            setError(t.validationError);
            return;
        }

        // Save user before proceeding
        await userService.saveUser(name, phone);
        onLogin(name, phone);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
            {/* Background Image with Blur Overlay for the modal context */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542858888-eaee913db581?q=80&w=1920&auto=format&fit=crop"
                    alt="Spiritual Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            </div>

            <div className="bg-white/95 backdrop-blur-xl p-0 rounded-3xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden border border-white/20 z-10">

                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <span className="text-5xl mb-2 block relative z-10 animate-pulse-slow">🕉️</span>
                    <h2 className="text-3xl font-bold text-gray-800 relative z-10">{isAdminMode ? 'Admin Access' : t.welcome}</h2>
                    <p className="text-gray-500 mt-2 font-medium relative z-10">{isAdminMode ? 'Enter credentials' : t.enterDetails}</p>
                </div>

                <div className="p-8 space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3 border border-red-100">
                            <span className="text-lg">⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isAdminMode ? (
                            <>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">{t.nameLabel}</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">👤</span>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                setError('');
                                            }}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl border bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-lg"
                                            placeholder={t.namePlaceholder}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700 ml-1">{t.phoneLabel}</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">📱</span>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                if (val.length <= 10) {
                                                    setPhone(val);
                                                    setError('');
                                                }
                                            }}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl border bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-lg"
                                            placeholder={t.phonePlaceholder}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 ml-1">Admin Password</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError('');
                                        }}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-medium text-lg"
                                        placeholder="Enter Admin Password"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                            disabled={(!isAdminMode && (!name || !phone)) || (isAdminMode && !password)}
                        >
                            {isAdminMode ? 'Login as Admin' : t.startJourney}
                        </button>
                    </form>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => {
                                setIsAdminMode(!isAdminMode);
                                setError('');
                                setPassword('');
                            }}
                            className="text-sm font-medium text-gray-400 hover:text-orange-500 underline decoration-gray-300 hover:decoration-orange-500 transition-colors"
                        >
                            {isAdminMode ? 'Back to User Login' : 'Admin Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
