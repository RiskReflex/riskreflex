'use client';

import { Terminal, Send, ArrowLeft, Shield } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function RixChat() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState([
    { 
      id: 'system-1', 
      role: 'assistant', 
      content: 'RIX Secure Terminal accessed. AI Governance and Cyber Risk protocols active. How may I assist you today?' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onDirectSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!inputValue.trim() || isLoading) return;
    
    const userQuery = inputValue;
    const newUserMessage = { id: Date.now().toString(), role: 'user', content: userQuery };
    const currentConversation = [...messages, newUserMessage];
    
    setMessages(currentConversation);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: currentConversation }),
      });

      if (!response.body) throw new Error("No response body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponseText = "";

      // Add empty AI bubble
      setMessages([...currentConversation, { id: (Date.now() + 1).toString(), role: 'assistant', content: "" }]);

      // Pure raw text stream reader (No JSON parsing required!)
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiResponseText += chunk;
        
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].content = aiResponseText;
          return updated;
        });
      }
    } catch (error) {
      console.error("Stream failed:", error);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "SYSTEM ERROR: Connection to RIX Core severed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <main className="relative w-full h-[100dvh] bg-black text-white flex flex-col overflow-hidden font-mono">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#003344] via-black to-black pointer-events-none z-0 opacity-40" />
      <div className="scanlines z-50 pointer-events-none absolute inset-0 opacity-20" />

      {/* Header */}
      <header className="relative z-10 border-b border-[#00F0FF]/20 bg-black/50 backdrop-blur-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => router.push('/')}
            className="p-2 hover:bg-[#00F0FF]/10 rounded-full transition-colors text-[#00F0FF]"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-[#00F0FF]" />
            <h1 className="font-bold tracking-widest text-[#00F0FF] uppercase text-sm md:text-base">RIX AI Terminal</h1>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-2 text-[10px] uppercase tracking-widest text-[#00F0FF]/70">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Secure Connection Active</span>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] md:max-w-[70%] p-4 border rounded-lg backdrop-blur-sm shadow-lg ${
              msg.role === 'user' 
                ? 'bg-[#00F0FF]/10 border-[#00F0FF]/30 text-white rounded-tr-none' 
                : 'bg-black/60 border-gray-800 text-gray-300 rounded-tl-none'
            }`}>
              <div className="flex items-center space-x-2 mb-2 opacity-60">
                {msg.role !== 'user' ? <Terminal className="w-4 h-4 text-[#00F0FF]" /> : null}
                <span className="text-[10px] uppercase tracking-widest">
                  {msg.role === 'user' ? 'USER' : 'RIX CORE'}
                </span>
              </div>
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-black/60 border border-gray-800 rounded-lg rounded-tl-none p-4 max-w-[70%] text-[#00F0FF] text-xs tracking-widest uppercase animate-pulse">
              [SYSTEM]: Processing data stream...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="relative z-10 p-4 border-t border-[#00F0FF]/20 bg-black/80 backdrop-blur-md">
        <form onSubmit={onDirectSubmit} className="max-w-4xl mx-auto relative flex items-center">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Initialize query... (e.g., 'Analyze ISO 27001 risks')"
            className="w-full bg-transparent border border-gray-700 focus:border-[#00F0FF] rounded-lg px-4 py-3 md:py-4 pl-4 pr-12 text-sm md:text-base outline-none transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] focus:shadow-[0_0_20px_rgba(0,240,255,0.1)] text-cyan-50"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="absolute right-2 p-2 bg-[#00F0FF]/10 hover:bg-[#00F0FF]/20 text-[#00F0FF] rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </form>
      </div>
    </main>
  );
}