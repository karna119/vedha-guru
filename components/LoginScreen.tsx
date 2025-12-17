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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in py-10 px-4">
            {/* Background Image with Blur Overlay */}
            <div className="fixed inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542858888-eaee913db581?q=80&w=1920&auto=format&fit=crop"
                    alt="Spiritual Background"
                    className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            </div>

            <div className="bg-white p-0 rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden border border-orange-100 z-10 my-auto">

                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-orange-100 to-amber-100 p-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <span className="text-5xl mb-2 block relative z-10 animate-pulse-slow">🕉️</span>
                    <h2 className="text-3xl font-bold text-gray-900 relative z-10">{isAdminMode ? 'Admin Access' : t.welcome}</h2>
                    <p className="text-gray-600 mt-2 font-medium relative z-10">{isAdminMode ? 'Enter credentials' : t.enterDetails}</p>
                </div>

                <div className="p-6 md:p-8 space-y-6">
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
                                    <label className="text-sm font-bold text-gray-700 ml-1 block">{t.nameLabel}</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl z-20">👤</span>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                setError('');
                                            }}
                                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-orange-100 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all font-semibold text-lg shadow-sm"
                                            placeholder={t.namePlaceholder}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1 block">{t.phoneLabel}</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl z-20">📱</span>
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
                                            className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-orange-100 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all font-semibold text-lg shadow-sm"
                                            placeholder={t.phonePlaceholder}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1 block">Admin Password</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl z-20">🔒</span>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError('');
                                        }}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-orange-100 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-all font-semibold text-lg shadow-sm"
                                        placeholder="Enter Admin Password"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-xl font-bold text-lg shadow-lg transition-all duration-200 mt-4"
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
                            className="text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors"
                        >
                            {isAdminMode ? 'Back to User Login' : 'Admin Login'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
