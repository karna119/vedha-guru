import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { TeachingMode, StudyMode, ChatMessage, Language } from '../types';
import { createBlob, decode, decodeAudioData } from '../utils/audioUtils';
import { AudioVisualizer } from './AudioVisualizer';
import { LIVE_MODEL, VOICE_NAME } from '../services/liveService';
import { BackgroundManager } from './BackgroundManager';
import { getTranslations } from '../translations';

interface LiveSessionProps {
  apiKey: string;
  mode: TeachingMode;
  language: Language;
  onEndSession: () => void;
  initialMessage?: string;
}

export const LiveSession: React.FC<LiveSessionProps> = ({ apiKey, mode, language, onEndSession, initialMessage }) => {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error' | 'disconnected'>('connecting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>(StudyMode.EXPLANATION);
  const [inputText, setInputText] = useState("");
  const [showScript, setShowScript] = useState(false);

  const t = getTranslations(language);
  const currentSessionRef = useRef<any>(null);

  // Standard Chat Model Ref for Hybrid Text Mode


  const handleSendText = async () => {
    if (!inputText.trim()) return;

    const text = inputText;
    setInputText("");

    // 1. Add User Message to UI
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      isComplete: true
    }]);

    // 2. Send to Live API directly (to get the Charon Voice)
    console.log("HandleSendText invoked. Checking session:", sessionPromiseRef.current);

    if (sessionPromiseRef.current) {
      try {
        const session = await sessionPromiseRef.current;
        console.log("Session resolved:", session);
        console.log("Sending text to Live Session:", text);

        const textMessage = {
          client_content: {
            turns: [{ role: "user", parts: [{ text: text }] }],
            turn_complete: true
          }
        };

        // Attempt 1: Standard 'send' (likely missing)
        if (typeof session.send === 'function') {
          session.send(textMessage);
        }
        // Attempt 2: Direct WebSocket access (Backdoor to ensure Voice works)
        else {
          const s = session as any;
          // Detailed probe
          console.log("Probing session structure:", Object.keys(s));
          if (s.conn) console.log("Probing conn:", Object.keys(s.conn));

          // Check for conn.ws (websocket)
          if (s.conn && s.conn.ws && s.conn.ws.readyState === 1) { // 1 = OPEN
            console.log("Using direct WebSocket injection for Voice");
            s.conn.ws.send(JSON.stringify(textMessage));
          } else {
            console.error("Cannot send text: Session or WebSocket not ready", s);
            if (s.conn && s.conn.ws) console.error("WS State:", s.conn.ws.readyState);

            setMessages(prev => [...prev, {
              id: Date.now().toString() + '-error',
              sender: 'model',
              text: "(Error: Live Session not connected. Please restart.)",
              isComplete: true
            }]);
          }
        }

      } catch (e: any) {
        console.error("Live Text Send Error:", e);
        setMessages(prev => [...prev, {
          id: Date.now().toString() + '-error',
          sender: 'model',
          text: "(Error: " + (e.message || e) + ")",
          isComplete: true
        }]);
      }
    } else {
      console.warn("No active session promise");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendText();
    }
  };

  // Refs for audio context and session management
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Ref for mic state to avoid reconnecting on toggle
  const isMicOnRef = useRef(isMicOn);

  // Transcription accumulators
  const currentInputTranscription = useRef('');
  const currentOutputTranscription = useRef('');

  // Update mic ref when state changes
  useEffect(() => {
    isMicOnRef.current = isMicOn;
  }, [isMicOn]);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Audio Resume Logic for Speech
  useEffect(() => {
    const resumeAudio = () => {
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    };

    window.addEventListener('click', resumeAudio);
    window.addEventListener('touchstart', resumeAudio);

    return () => {
      window.removeEventListener('click', resumeAudio);
      window.removeEventListener('touchstart', resumeAudio);
    };
  }, []);

  const getSystemInstruction = (mode: TeachingMode, studyMode: StudyMode, lang: Language) => {
    const referenceSlokas = `
    REFERENCE SLOKAS (Recite these exactly when asked):
    1. Ganesha: "Shuklaambharadharam Vishnum Shashivarnam Chaturbhujam | Prasanna Vadanam Dhyaayet Sarva Vighnopashaantaye ||" AND "Vakratunda Mahaakaaya Suryakoti Samaprabha | Nirvighnam Kuru Me Deva Sarva Kaaryeshu Sarvadaa ||"
    2. Saraswathi: "Saraswathi Namastubhyam Varade Kaamaroopini | Vidyaarambham Karishyaami Siddhir Bhavatu Me Sadaa ||"
    3. Guru: "Gurur Brahma Gurur Vishnu Gurur Devo Maheshwaraha | Gurur Saakshaat Parabrahma Tasmai Sri Gurave Namaha ||"
    `;

    const vemanaPadyalu = `
    VEMANA PADYALU (Use these Telugu wisdom poems as examples):
    1. On Ego/Pride: "Uppuganvale Oorakayanagachunu | Pappu leni Kura Ruchika Raadhu | Appudaiea Vaaniki Abhimanamey Raadhu | Vishwadabhirama Vinuravema"
    2. On Knowledge: "Alpudeppudu Palku Aadambharamu Ganu | Sajjanundu Palku Challaganey | Ganchu Ghallumanna Gadulyela Lekkayu | Vishwadabhirama Vinuravema"
    3. On Character: "Chettu Venta Neda Cheda Chintakumba | Pattu Venta Nundi Padagaani Bhaarya | Bhattu Venta Nunna Baga Kaadhu Chooshe | Vishwadabhirama Vinuravema"
    4. On True Wealth: "Annamu Pettaka Annanu Annanu Apudu Annadi | Kanne Vaadiki Annamu Pettevu Kaadu | Anna Anna Anna Annamu Pettuvaadu Nadachun | Vishwadabhirama Vinuravema"
    5. On Humility: "Tanu Vijnanambu Taanu Gani | Danchi Veru Gaanu Dhariseni | Inka Veru Chaalu Entha Aayina | Vishwadabhirama Vinuravema"
    `;

    // Language-specific instructions
    const languageInstructions: Record<Language, string> = {
      [Language.TELUGU]: `You speak primarily in Telugu (తెలుగు). When explaining concepts, use a warm, scholarly, and soothing tone in Telugu. Use Telugu script when writing.`,
      [Language.HINDI]: `You speak primarily in Hindi (हिन्दी). When explaining concepts, use a warm, scholarly, and soothing tone in Hindi. Use Devanagari script when writing. Occasionally use common Hindi phrases like "भाई", "बहन", "संतान" to connect with the listener.`,
      [Language.ENGLISH]: `You speak primarily in English. When explaining concepts, use clear, accessible language while maintaining the reverence and depth of the original teachings. Include Sanskrit terms with their English translations for authenticity.`
    };

    let instruction = `You are "Guru", a traditional Vedic scholar and teacher (Acharya). You possess a deep, calm, and resonant voice typical of a learned Brahmin priest. Your speech is slow, deliberate, and respectful. ${languageInstructions[lang]} When reciting Slokas, you MUST use perfect Sanskrit pronunciation with the correct majestic and traditional intonation (chanting/recitation style). Always maintain this traditional Brahmin persona. 
    
    CRITICAL INSTRUCTION - DHARMA COUNSELING:
    If the user shares a personal problem, dilemma, or emotional issue, DO NOT give generic modern advice. You MUST quote a specific story, character, or example from:
    - Indian Puranas, Ramayana, Mahabharata, or Bhagavad Gita
    - Vemana Padyalu (Telugu wisdom poems) - use these for practical life lessons
    
    When using Vemana Padyalu:
    - First recite the relevant padyam in Telugu
    - Then explain its meaning in the user's selected language
    - Connect it to their specific situation
    
    Examples: "Just as Arjuna felt...", "Remember how Lord Rama...", "In the Skanda Purana...", "Vemana says in his padyam..."
    - Cite the "Dharma" involved using a Vedic perspective.
    - Connect their modern problem to eternal ancient wisdom.
    
    ${referenceSlokas}
    
    ${vemanaPadyalu}`;

    // Teaching Mode Context
    switch (mode) {
      case TeachingMode.RAMAYANA:
        instruction += `Focus STRICTLY on Ramayana. If the user asks about anything else (like coding, movies, general chat), politely decline and bring the topic back to Ramayana. `;
        break;
      case TeachingMode.MAHABHARATA:
        instruction += `Focus STRICTLY on Mahabharata. If the user asks about anything else, politely decline and bring the topic back to Mahabharata. `;
        break;
      case TeachingMode.BHAGAVATAM:
        instruction += `Focus STRICTLY on Shrimad Bhagavatam. If the user asks about anything else, politely decline and bring the topic back to Bhagavatam. `;
        break;
      case TeachingMode.DHARMA:
        instruction += `You are "Dharmika Mitra", a wise spiritual companion.
        Your goal is to help the user navigate their life problem using the timeless wisdom of Sanatana Dharma.
        
        Drawing from:
        - Bhagavad Gita (primary source for duty/ethics)
        - Ramayana (examples of ideal conduct)
        - Shrimad Bhagavatam (devotion and nature of reality)

        Structure your response as follows:
        1. **Deep Listening**: Acknowledge their problem with empathy.
        2. **Scriptural Insight**: Quote a relevant Shloka/Verse (Sanskrit + Meaning).
        3. **Practical Example**: Share a story or example from the scriptures (e.g., "Just as Arjuna felt...", "Like Vibhishana's choice...").
        4. **Dharmic Action**: Give concrete, actionable advice based on Dharma, Karma, Bhakti, and Jnana.

        Tone: Compassionate, non-judgmental, calm, and wise. Do not sound like a generic bot. Speak like a Guru/Friend.
        `;
        break;
      default:
        instruction += `You are ready to teach Ramayana, Mahabharata, or Bhagavatam. `;
    }

    // Study Mode Context
    const studyModeInstructions: Record<StudyMode, Record<Language, string>> = {
      [StudyMode.RECITATION]: {
        [Language.TELUGU]: `Your current teaching style is 'శ్లోక పఠనం' (Sloka Recitation). Recite Slokas with the authentic, rhythmic cadence of a Vedic priest. Your pronunciation must be precise and clear. Pause frequently for the student to repeat. Focus on 'Swaram' (tone) and rhythm.`,
        [Language.HINDI]: `Your current teaching style is 'श्लोक पाठ' (Sloka Recitation). Recite Slokas with authentic, rhythmic cadence. Pronunciation must be precise. Pause for the student to repeat. Focus on 'स्वर' (tone) and rhythm.`,
        [Language.ENGLISH]: `Your current teaching style is 'Sloka Recitation'. Recite Slokas with authentic Vedic rhythm. Pronunciation must be precise. Pause for the student to repeat. Focus on correct intonation and rhythm.`
      },
      [StudyMode.STORYTELLING]: {
        [Language.TELUGU]: `Your current teaching style is 'కథా వాచకం' (Storytelling/Puranic Pravachanam). Narrate stories with emotion and devotion, like a traditional storyteller in a temple. Use vivid descriptions in Telugu.`,
        [Language.HINDI]: `Your current teaching style is 'कथावाचन' (Storytelling). Narrate stories with emotion and devotion. Use vivid descriptions in Hindi like a traditional कथाकार.`,
        [Language.ENGLISH]: `Your current teaching style is 'Storytelling'. Narrate stories with emotion and devotion. Use vivid descriptions to bring the ancient tales to life.`
      },
      [StudyMode.EXPLANATION]: {
        [Language.TELUGU]: `Your current teaching style is 'వివరణ' (Tatparyam/Explanation). Analyze verses like a scholar. Break down complex Sanskrit terms into simple Telugu. Explain the 'Padavibhagam' (word split) and 'Bhavamu' (meaning) with depth.`,
        [Language.HINDI]: `Your current teaching style is 'व्याख्या' (Explanation). Analyze verses like a scholar. Break down complex Sanskrit terms into simple Hindi. Explain 'पदविभाग' and 'भावार्थ' with depth and clarity.`,
        [Language.ENGLISH]: `Your current teaching style is 'Explanation'. Analyze verses like a scholar. Break down Sanskrit terms and explain their meanings. Provide context and practical applications.`
      }
    };

    instruction += studyModeInstructions[studyMode][lang];

    return instruction;
  };

  const cleanup = useCallback(() => {
    if (scriptProcessorRef.current) {
      scriptProcessorRef.current.disconnect();
      scriptProcessorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (inputContextRef.current) {
      inputContextRef.current.close();
      inputContextRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  const stopAudio = useCallback(() => {
    setIsPlaying(false);
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) { }
    });
    sourcesRef.current.clear();
  }, []);

  const connectToLiveAPI = useCallback(async () => {
    try {
      const ai = new GoogleGenAI({ apiKey });

      // Initialize Audio Contexts
      const CtxClass = window.AudioContext || (window as any).webkitAudioContext;
      inputContextRef.current = new CtxClass({ sampleRate: 16000 });
      audioContextRef.current = new CtxClass();

      // Resume contexts immediately to ensure they are active
      if (inputContextRef.current.state === 'suspended') await inputContextRef.current.resume();
      if (audioContextRef.current.state === 'suspended') await audioContextRef.current.resume();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const config = {
        model: LIVE_MODEL,
        callbacks: {
          onopen: () => {
            console.log('Session opened');
            setStatus('connected');

            // Start processing microphone input
            if (!inputContextRef.current) return;

            const source = inputContextRef.current.createMediaStreamSource(stream);
            const processor = inputContextRef.current.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (e) => {
              if (!isMicOnRef.current) return; // Software mute using ref

              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = createBlob(inputData);

              if (sessionPromiseRef.current) {
                sessionPromiseRef.current.then((session) => {
                  try {
                    session.sendRealtimeInput({ media: pcmBlob });
                  } catch (e) {
                    // Session might be closed or busy
                  }
                });
              }
            };

            source.connect(processor);
            processor.connect(inputContextRef.current.destination);

            if (sessionPromiseRef.current) {
              // Auto-start disabled.
            }
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcription
            let inputUpdate = false;
            let outputUpdate = false;

            if (message.serverContent?.inputTranscription) {
              currentInputTranscription.current += message.serverContent.inputTranscription.text;
              inputUpdate = true;
            }

            if (message.serverContent?.outputTranscription) {
              currentOutputTranscription.current += message.serverContent.outputTranscription.text;
              outputUpdate = true;
            }

            if (inputUpdate || outputUpdate) {
              setMessages(prev => {
                const newMsgs = [...prev];
                // Update or add current user message
                if (inputUpdate && currentInputTranscription.current.trim()) {
                  const lastMsg = newMsgs[newMsgs.length - 1];
                  if (lastMsg && lastMsg.sender === 'user' && !lastMsg.isComplete) {
                    lastMsg.text = currentInputTranscription.current;
                  } else if (!lastMsg || lastMsg.sender !== 'user' || lastMsg.isComplete) {
                    newMsgs.push({
                      id: Date.now().toString() + '-user',
                      sender: 'user',
                      text: currentInputTranscription.current,
                      isComplete: false
                    });
                  }
                }

                // Update or add current model message
                if (outputUpdate && currentOutputTranscription.current.trim()) {
                  const lastMsg = newMsgs[newMsgs.length - 1];

                  if (lastMsg && lastMsg.sender === 'model' && !lastMsg.isComplete) {
                    lastMsg.text = currentOutputTranscription.current;
                  } else {
                    // Ensure user message is marked complete if we are receiving model text
                    const lastUserIndex = newMsgs.map(m => m.sender).lastIndexOf('user');
                    if (lastUserIndex !== -1) newMsgs[lastUserIndex].isComplete = true;

                    newMsgs.push({
                      id: Date.now().toString() + '-model',
                      sender: 'model',
                      text: currentOutputTranscription.current,
                      isComplete: false
                    });
                  }
                }
                return newMsgs;
              });
            }

            if (message.serverContent?.turnComplete) {
              setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs.forEach(m => m.isComplete = true);
                return newMsgs;
              });
              currentInputTranscription.current = '';
              currentOutputTranscription.current = '';
            }

            // Handle Audio Output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              // Ensure context is running before playing
              if (audioContextRef.current.state === 'suspended') {
                try {
                  await audioContextRef.current.resume();
                } catch (e) {
                  console.error("Failed to resume audio context during playback:", e);
                }
              }

              setIsPlaying(true);
              console.log("Queuing audio chunk", base64Audio.length, "bytes at", nextStartTimeRef.current);
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                audioContextRef.current.currentTime
              );

              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                audioContextRef.current,
                24000,
                1
              );

              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextRef.current.destination);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) {
                  setIsPlaying(false);
                }
              };

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              stopAudio();
              currentOutputTranscription.current = '';
              setMessages(prev => {
                const newMsgs = [...prev];
                newMsgs.forEach(m => m.isComplete = true);
                return newMsgs;
              });
            }
          },
          onerror: (e) => {
            console.error("Live Session Error:", e);
            setStatus('error');
          },
          onclose: () => {
            console.log('Session closed');
            setStatus('disconnected');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICE_NAME } },
          },
          systemInstruction: getSystemInstruction(mode, studyMode, language),
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        }
      };

      sessionPromiseRef.current = ai.live.connect(config);
    } catch (err) {
      console.error("Connection failed", err);
      setStatus('error');
    }
  }, [apiKey, mode, studyMode, language, stopAudio]); // Dependencies: added language

  // Handle Initial Message from Landing Page
  useEffect(() => {
    if (initialMessage && status === 'connected' && messages.length === 0) {
      // Send the message using the client's send method if available. 
      // Since 'sendMessage' isn't directly exposed in this scope yet, we'll try to find it or emulate it.
      // In the 'useLiveAPI' hook usage context, we often have a 'send' method.
      // Assuming client.send or we can just send text parts.
      if (currentSessionRef.current) {
        currentSessionRef.current.send([{ text: initialMessage }]);
      }
    }
  }, [initialMessage, status, messages.length]);

  useEffect(() => {
    connectToLiveAPI();
    return () => cleanup();
  }, [connectToLiveAPI, cleanup]);

  // Mic toggle handler
  const toggleMic = () => {
    setIsMicOn(prev => !prev);
  };



  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto p-4 relative">
      {/* Background Manager - Context Aware */}
      <BackgroundManager messages={messages} />

      {/* Main Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col items-center">
        {/* Header Info */}
        <div className="text-center mb-6 w-full">
          <h2 className="text-xl font-bold text-saffron-800 font-telugu mb-1">
            {t.sessionTitle[mode]}
          </h2>
          <p className="text-saffron-600 text-sm">
            {status === 'connecting' && t.statusConnecting}
            {status === 'connected' && isPlaying && t.statusSpeaking}
            {status === 'connected' && !isPlaying && isMicOn && t.statusListening}
            {status === 'connected' && !isPlaying && !isMicOn && t.statusMicOff}
            {status === 'error' && t.statusError}
            {status === 'disconnected' && t.statusDisconnected}
          </p>
        </div>

        {/* Study Mode Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-4 z-20">
          {Object.values(StudyMode).map((sm) => (
            <button
              key={sm}
              onClick={() => setStudyMode(sm)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${studyMode === sm
                ? 'bg-saffron-600 text-white border-saffron-600 shadow-md transform scale-105'
                : 'bg-white/80 text-saffron-800 border-saffron-200 hover:bg-saffron-100 hover:border-saffron-300'
                }`}
            >
              {sm}
            </button>
          ))}
        </div>

        {/* Visualizer & Chat Area */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-xl border border-orange-100 flex-1 flex flex-col overflow-hidden mb-24 md:mb-28 relative mx-2">
          {/* Background Decorative */}
          <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
            <svg className="w-64 h-64 text-orange-600" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Chat / Transcript */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-orange-200 z-10 pb-4">
            {messages.length === 0 && (
              <div className="text-center text-orange-400 mt-10 italic font-medium px-4">
                {t.askQuestion}
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] md:max-w-[80%] rounded-2xl px-5 py-4 shadow-sm border ${msg.sender === 'user'
                  ? 'bg-orange-50 border-orange-100 text-gray-900 rounded-br-none'
                  : 'bg-white border-gray-100 text-gray-800 rounded-bl-none shadow-md'
                  }`}>
                  <p className="whitespace-pre-wrap leading-relaxed font-telugu text-base md:text-lg">
                    {msg.text}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Controls */}
        <div className="fixed bottom-6 left-0 right-0 flex flex-col items-center gap-4 z-50 px-4">

          {/* Text Input Area - Floating above controls */}
          <div className="w-full max-w-2xl flex items-center gap-2 bg-white p-3 rounded-full shadow-2xl border-2 border-orange-100 transition-all focus-within:border-orange-400 mb-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chatPlaceholder}
              className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 placeholder-gray-500 px-2 py-1 text-base font-medium"
            />
            <button
              onClick={handleSendText}
              disabled={!inputText.trim() || status !== 'connected'}
              className="p-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center items-center gap-6 w-full">
            {/* End Session Button */}
            <button
              onClick={onEndSession}
              className="p-4 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition shadow-lg"
              title={t.endSession}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Visualizer */}
            <div className="flex flex-col items-center scale-110">
              <AudioVisualizer isActive={isPlaying || (isMicOn && status === 'connected')} mode={isPlaying ? 'speaking' : 'listening'} />
            </div>

            {/* Mic Toggle */}
            <button
              onClick={toggleMic}
              className={`p-4 rounded-full transition shadow-lg ${isMicOn
                ? 'bg-saffron-600 text-white hover:bg-saffron-700'
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-200'
                }`}
              title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
            >
              {isMicOn ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              )}
            </button>

            {/* View Script Button */}
            <button
              onClick={() => setShowScript(true)}
              className="p-4 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition shadow-lg"
              title={t.viewScript}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </button>
          </div>

          {/* Script Modal */}
          {showScript && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-3xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-saffron-50 rounded-t-3xl">
                  <h3 className="text-xl font-bold text-saffron-800 font-telugu">{t.scriptTitle}</h3>
                  <button
                    onClick={() => setShowScript(false)}
                    className="p-2 hover:bg-white/50 rounded-full transition text-gray-500 hover:text-gray-800"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10 italic">No script available yet.</div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="flex flex-col gap-1">
                        <div className={`text-xs font-bold uppercase tracking-wider ${msg.sender === 'user' ? 'text-blue-600' : 'text-saffron-600'
                          }`}>
                          {msg.sender === 'user' ? 'You' : 'Guru'}
                        </div>
                        <div className={`p-3 rounded-lg text-lg leading-relaxed ${msg.sender === 'user' ? 'bg-blue-50 text-blue-900 border border-blue-100' : 'bg-saffron-50 text-saffron-900 border border-saffron-100'
                          }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl flex justify-end">
                  <button
                    onClick={() => setShowScript(false)}
                    className="px-6 py-2 bg-saffron-600 text-white rounded-xl hover:bg-saffron-700 transition"
                  >
                    {t.close}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};