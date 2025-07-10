import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { openai } from '../utils/openai';
import Tesseract from 'tesseract.js';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  onPlanUpdate?: (plan: string) => void;
  initialMessages?: Message[];
}

const AIChat: React.FC<AIChatProps> = ({ onPlanUpdate, initialMessages = [] }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 新しいメッセージが来たら自動スクロール
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages(msgs => [...msgs, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);
    try {
      const history = [...messages, { role: 'user', content: text }].map(m => `${m.role}: ${m.content}`).join('\n');
      const res = await openai(history);
      const aiMsg = res.choices?.[0]?.message?.content || t('aichat.default_reply');
      setMessages(msgs => [...msgs, { role: 'assistant', content: aiMsg }]);
      if (onPlanUpdate && aiMsg.includes('プラン')) {
        onPlanUpdate(aiMsg);
      }
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: t('aichat.error') }]);
    } finally {
      setLoading(false);
    }
  };

  // 画像アップロード→OCR→翻訳API呼び出し
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOcrLoading(true);
    setMessages(msgs => [...msgs, { role: 'user', content: t('aichat.uploading') }]);
    try {
      // OCR
      const { data } = await Tesseract.recognize(file, 'eng+jpn');
      const text = data.text.trim();
      setMessages(msgs => [...msgs, { role: 'user', content: t('aichat.ocr_result') + '\n' + text }]);
      
      // 翻訳API呼び出し（雛形）
      const translateApiKey = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
      
      if (!translateApiKey || translateApiKey === 'your_google_translate_api_key_here') {
        console.warn('Google Translate API key is not configured');
        setMessages(msgs => [...msgs, { role: 'assistant', content: t('aichat.translated') + '\n' + text }]);
        return;
      }
      
      try {
        const translated = await fetch('https://translation.googleapis.com/language/translate/v2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            q: text,
            target: 'ja', // 例:日本語に翻訳
            key: translateApiKey
          })
        }).then(res => res.json()).then(res => res.data?.translations?.[0]?.translatedText || '');
        setMessages(msgs => [...msgs, { role: 'assistant', content: t('aichat.translated') + '\n' + translated }]);
      } catch (translateError) {
        console.error('Google Translate API error:', translateError);
        setMessages(msgs => [...msgs, { role: 'assistant', content: t('aichat.translated') + '\n' + text }]);
      }
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: t('aichat.ocr_error') }]);
    } finally {
      setOcrLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow p-4">
      <div ref={chatRef} className="flex-1 overflow-y-auto mb-2 space-y-2 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm whitespace-pre-line ${msg.role === 'user' ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white ml-auto' : 'bg-white text-gray-800 mr-auto border'}`}>
              <span className="inline-flex items-center gap-1">
                {msg.role === 'user' ? <User className="w-4 h-4 inline" /> : <Bot className="w-4 h-4 inline text-blue-400" />} {msg.content}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[70%] px-4 py-2 rounded-2xl shadow bg-white text-gray-800 border flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> {t('aichat.thinking')}
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSend} className="flex gap-2 mt-2">
        <input
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder={t('aichat.placeholder')}
          value={input}
          onChange={e => setInput(e.target.value)}
          disabled={loading || ocrLoading}
          maxLength={500}
        />
        <button
          type="button"
          className="bg-green-500 text-white rounded-full px-3 py-2 font-bold hover:bg-green-600 flex items-center gap-1 disabled:opacity-50"
          disabled={ocrLoading}
          onClick={() => fileInputRef.current?.click()}
        >
          📷
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full px-4 py-2 font-bold hover:from-purple-500 hover:to-pink-500 flex items-center gap-1 disabled:opacity-50"
          disabled={loading || !input.trim() || ocrLoading}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default AIChat; 