import React from 'react';

export const AudioVisualizer: React.FC<{ isActive: boolean, mode: 'listening' | 'speaking' }> = ({ isActive, mode }) => {
  return (
    <div className="flex items-center justify-center gap-1 h-12">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2 rounded-full transition-all duration-300 ${
            isActive 
              ? mode === 'speaking' ? 'bg-saffron-600 animate-pulse' : 'bg-blue-500 animate-bounce'
              : 'bg-saffron-200 h-2'
          }`}
          style={{
            height: isActive ? `${Math.random() * 24 + 12}px` : '8px',
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};