
import React, { useEffect, useState } from 'react';


// Importing local assets (assuming they are in public folder or imported)
// For now, we will use the absolute paths provided by the generate_image tool, 
// which means we need to copy them to the public folder or import them if vite supports it.
// The easiest way for this environment is to assume we will copy them to public/assets.

// Mapping keywords to image files
const BACKGROUNDS = {
    ganesha: [
        'ganesha', 'vinayaka', 'pillayar', 'ganapati', 'elephant', 'vighneshwara'
    ],
    krishna: [
        'krishna', 'gita', 'bhagavad', 'govinda', 'arjuna', 'mahabharata', 'murali', 'pandavas', 'kauravas', 'draupadi', 'bhishma'
    ],
    rama: [
        'rama', 'sita', 'hanuman', 'ramayana', 'ayodhya', 'bow', 'ravana', 'lakshmana'
    ],
    saraswathi: [
        'saraswathi', 'veena', 'education', 'wisdom', 'knowledge'
    ],
    bhagavatam: [
        'bhagavatam', 'prahlada', 'dhruva', 'narasimha', 'vamana', 'vishnu', 'narayana'
    ],
    temple: ['default'] // Default fallback
};

interface BackgroundManagerProps {
    messages: any[]; // Chat messages
}

// We will use the absolute paths for the generated artifacts directly effectively as "source"
// In a real prod app, these would be in /public.
const IMAGE_PATHS = {
    ganesha: 'https://images.unsplash.com/photo-1628108425206-e04f056d688b?q=80&w=1920&auto=format&fit=crop',
    krishna: 'https://images.unsplash.com/photo-1534008745585-618420e7df65?q=80&w=1920&auto=format&fit=crop',
    rama: 'https://images.unsplash.com/photo-1624538904797-152e93d8b244?q=80&w=1920&auto=format&fit=crop',
    temple: 'https://images.unsplash.com/photo-1621360841012-37c88b2a3477?q=80&w=1920&auto=format&fit=crop',
    saraswathi: 'https://images.unsplash.com/photo-1582236319808-7243b8113426?q=80&w=1920&auto=format&fit=crop',
    bhagavatam: 'https://images.unsplash.com/photo-1566453916963-3d01f9e2b60a?q=80&w=1920&auto=format&fit=crop'
};

export const BackgroundManager: React.FC<BackgroundManagerProps> = ({ messages }) => {
    const [currentBg, setCurrentBg] = useState<string>('temple');

    useEffect(() => {
        if (!messages || messages.length === 0) return;

        const lastMessage = messages[messages.length - 1];

        // Only care if AI spoke or User spoke, context changes based on content
        // We look at the last few messages text to determine context
        const textToCheck = (lastMessage.text || '').toLowerCase();

        let foundBg = 'temple';

        // Check keywords
        for (const [key, keywords] of Object.entries(BACKGROUNDS)) {
            if (key === 'temple') continue;
            if (keywords.some(k => textToCheck.includes(k))) {
                foundBg = key;
                break;
            }
        }

        // If not found, keep previous if it wasn't valid, or default to temple?
        // Let's stick to last found if valid, else temple explicitly if we want to reset? 
        // Actually, "Context Aware" means if they talk about Ganesha, it stays Ganesha until they talk about Rama.
        if (foundBg !== 'temple' && foundBg !== currentBg) {
            setCurrentBg(foundBg);
        }
    }, [messages, currentBg]);


    // Effect to animate the background when it changes (Ken Burns)
    // We can just use CSS Keyframes on the image itself, simpler than JS animation for this.

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Background Image Layer */}
            <div
                key={currentBg} // Key change forces re-render for enter animation
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `url('${(IMAGE_PATHS as any)[currentBg]}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.3, // Low opacity to blend with saffron theme
                    animation: 'kenburns 20s infinite alternate',
                }}
            />

            {/* Gradient Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-50/80 to-orange-100/90" />

            <style>{`
         @keyframes kenburns {
           0% { transform: scale(1) translate(0, 0); }
           100% { transform: scale(1.1) translate(-2%, -2%); }
         }
       `}</style>
        </div>
    );
};
