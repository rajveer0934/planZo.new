import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bot,
  Send,
  Paperclip,
  X,
  FileText,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { ChatMessage, ChatAttachment } from '../types';
import { FormattedAiMessage } from './FormattedAiMessage';
import { querySarthiAi } from '../services/sarthiChatService';

export const SarthiAiView: React.FC = () => {
  const {
    profile,
    bandwidth,
    overallAttendancePercentage,
    awardXp,
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [attachment, setAttachment] = useState<ChatAttachment | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: `Hello ${profile.name || 'Engineer'}! 👋 I am **Sarthi**, your B.Tech Academic & Engineering AI Mentor.\n\nYou can ask me anything about your coursework, numerical problems, coding & debugging (C, Python, Java, DSA), PYQs, or advice for balancing your semester.\n\nYou can also upload photos of question papers, handwritten notes, textbook pages, circuit diagrams, or code to have me analyze and solve them!`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File size exceeds 15MB. Please upload a smaller file.');
      return;
    }

    setErrorMessage(null);
    const reader = new FileReader();
    reader.onload = () => {
      const resultStr = reader.result as string;
      setAttachment({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        data: resultStr,
        size: file.size,
        previewUrl: file.type.startsWith('image/') ? resultStr : undefined,
      });
    };
    reader.readAsDataURL(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
  };

  const handleClearChat = () => {
    if (confirm('Clear chat conversation with Sarthi?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          sender: 'assistant',
          content: `Chat cleared! How can I assist you with your engineering studies right now? Feel free to ask a question or upload a document/photo.`,
          timestamp: 'Just now',
        },
      ]);
      setAttachment(null);
      setErrorMessage(null);
    }
  };

  const handleSend = async () => {
    const text = inputMessage.trim();
    if (!text && !attachment) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment: attachment ? { ...attachment } : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentAttachment = attachment;
    setInputMessage('');
    setAttachment(null);
    setIsTyping(true);
    setErrorMessage(null);

    try {
      const reply = await querySarthiAi({
        messages: [...messages, userMessage],
        attachment: currentAttachment
          ? {
              name: currentAttachment.name,
              mimeType: currentAttachment.mimeType,
              data: currentAttachment.data,
            }
          : undefined,
        context: {
          college: profile.customCollege || profile.college,
          branch: profile.branch,
          semester: profile.semester,
          bandwidth: bandwidth?.status,
          attendance: overallAttendancePercentage,
        },
      });

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          sender: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      awardXp(15, 'Sarthi AI consultation');
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(err?.message || 'Could not connect to Sarthi AI. Please check your query and try again.');
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          content: `⚠️ **Connection Issue**: ${err?.message || 'Failed to generate response.'}\n\nPlease retry your question in a moment.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)] bg-white dark:bg-[#0c1018] border border-stone-200/90 dark:border-stone-800 rounded-2xl shadow-xs overflow-hidden">
      {/* Header: Clean & Solid in Dark Mode */}
      <div className="px-5 py-3.5 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/80 dark:bg-[#111723] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Sarthi AI
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Senior B.Tech Mentor & Academic Copilot
            </p>
          </div>
        </div>

        {/* Clear Conversation Action */}
        <button
          onClick={handleClearChat}
          className="p-2 rounded-lg text-stone-400 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          title="Clear Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Stream: Dark, Contrast-Tuned */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/30 dark:bg-[#0c1018]">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-teal-700 text-white dark:bg-teal-800'
                    : 'bg-stone-800 text-white dark:bg-stone-700'
                }`}
              >
                {isUser ? 'U' : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div
                className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                  isUser
                    ? 'bg-teal-700 text-white dark:bg-teal-900/90 dark:border dark:border-teal-700/60 font-medium shadow-xs'
                    : 'bg-white dark:bg-[#151c28] border border-stone-200/80 dark:border-stone-800 text-stone-800 dark:text-stone-200 shadow-xs'
                }`}
              >
                {/* Uploaded Attachment in User Message */}
                {msg.attachment && (
                  <div className="pb-2">
                    {msg.attachment.previewUrl ? (
                      <div className="relative rounded-xl overflow-hidden border border-white/20 dark:border-stone-700 max-w-xs max-h-56 bg-black/20">
                        <img
                          src={msg.attachment.previewUrl}
                          alt={msg.attachment.name}
                          className="w-full h-auto object-cover"
                        />
                        <div className="p-1.5 text-[10px] font-mono truncate bg-black/70 text-white">
                          {msg.attachment.name}
                        </div>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-black/10 dark:bg-black/30 flex items-center gap-2 max-w-xs">
                        <FileText className="w-4 h-4 shrink-0 text-teal-400" />
                        <span className="text-[11px] font-mono truncate">{msg.attachment.name}</span>
                      </div>
                    )}
                  </div>
                )}

                {isUser ? (
                  <div className="whitespace-pre-line break-words text-xs leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  <FormattedAiMessage content={msg.content} />
                )}

                <div
                  className={`text-[10px] font-mono pt-1 ${
                    isUser ? 'text-teal-200 dark:text-teal-300/80' : 'text-stone-400 dark:text-stone-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-2.5 text-xs text-stone-500 dark:text-stone-400 p-2">
            <Bot className="w-4 h-4 text-teal-600 dark:text-teal-400 animate-spin" />
            <span className="animate-pulse">Sarthi AI is analyzing and thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error Alert if any */}
      {errorMessage && (
        <div className="px-5 py-2 bg-rose-50 dark:bg-rose-950/70 border-t border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage(null)} className="p-1 hover:text-rose-900 dark:hover:text-rose-100 cursor-pointer">
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Input Area: High-Contrast Dark Theme */}
      <div className="p-3 sm:p-4 border-t border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-[#111723] space-y-2">
        {/* Attachment Preview Card */}
        {attachment && (
          <div className="flex items-center gap-2 p-2 rounded-xl bg-teal-50 dark:bg-[#162536] border border-teal-200 dark:border-teal-800 max-w-md">
            {attachment.previewUrl ? (
              <img
                src={attachment.previewUrl}
                alt="Upload preview"
                className="w-10 h-10 rounded-lg object-cover border border-teal-300 dark:border-teal-700 shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/80 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-teal-700 dark:text-teal-300" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-teal-950 dark:text-teal-100 truncate">
                {attachment.name}
              </div>
              <div className="text-[10px] font-mono text-teal-600 dark:text-teal-400">
                {attachment.size ? `${(attachment.size / 1024).toFixed(1)} KB` : 'Ready to analyze'}
              </div>
            </div>
            <button
              type="button"
              onClick={removeAttachment}
              className="p-1 rounded-lg text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors cursor-pointer"
              title="Remove attachment"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Bar */}
        <div className="flex items-end gap-2">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,.pdf,.txt,.c,.cpp,.py,.java,.js,.ts,.json,.md"
            className="hidden"
          />

          {/* Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-[#182030] hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer shrink-0"
            title="Attach image, notes, question paper, or document"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or question here (Press Enter to send)..."
            rows={1}
            className="flex-1 max-h-32 min-h-[42px] px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700/80 bg-stone-50 dark:bg-[#182030] text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 resize-none font-medium leading-relaxed"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={(!inputMessage.trim() && !attachment) || isTyping}
            className="p-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:hover:bg-teal-700 text-white transition-all cursor-pointer shrink-0 shadow-xs"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
