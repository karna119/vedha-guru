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
        <div className="glass card-hover w-full max-w-md p-8 rounded-3xl mx-auto shadow-2xl relative z-10">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 mb-2">
                    {isAdminMode ? 'Admin Access' : t.welcome}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                    {isAdminMode ? 'Enter password' : t.enterDetails}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {!isAdminMode ? (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                {t.nameLabel}
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setError('');
                                }}
                                placeholder={t.namePlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white/50 backdrop-blur-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                                {t.phoneLabel}
                            </label>
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
                                placeholder={t.phonePlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white/50 backdrop-blur-sm"
                            />
                        </div>
                    </>
                ) : (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Enter admin password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white/50 backdrop-blur-sm"
                        />
                    </div>
                )}

                {error && (
                    <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg animate-pulse">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    disabled={(!isAdminMode && (!name || !phone)) || (isAdminMode && !password)}
                >
                    {isAdminMode ? 'Login as Admin' : t.startJourney}
                </button>
            </form>

            <div className="mt-6 text-center">
                <button
                    type="button"
                    onClick={() => {
                        setIsAdminMode(!isAdminMode);
                        setError('');
                        setPassword('');
                    }}
                    className="text-xs text-gray-400 hover:text-orange-500 transition underline"
                >
                    {isAdminMode ? 'Back to User Login' : 'Admin Login'}
                </button>
            </div>
        </div>
    );
};
