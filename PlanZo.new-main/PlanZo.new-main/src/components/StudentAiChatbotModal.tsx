// PlanZo Student AI Chatbot Modal
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Bot,
  Paperclip,
  FileText,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { ChatMessage, ChatAttachment } from '../types';
import { FormattedAiMessage } from './FormattedAiMessage';
import { querySarthiAi } from '../services/sarthiChatService';

interface StudentAiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentAiChatbotModal: React.FC<StudentAiChatbotModalProps> = ({
  isOpen,
  onClose,
}) => {
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
      id: 'welcome-modal',
      sender: 'assistant',
      content: `Namaste ${profile.name || 'Engineer'}! 🙏 I am **Sarthi**, your B.Tech & Student-Life AI Copilot.\n\nAsk me any questions about your engineering courses, numericals, code, or schedule. You can also upload photos of questions, diagrams, notes, or code to analyze!`,
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  if (!isOpen) return null;

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
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        content: `Chat cleared! How can I assist you right now? Feel free to ask a question or upload an image/document.`,
        timestamp: 'Just now',
      },
    ]);
    setAttachment(null);
    setErrorMessage(null);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-[#0c1018] border border-stone-200 dark:border-stone-800 rounded-2xl w-full max-w-xl h-[85vh] max-h-[700px] shadow-2xl flex flex-col overflow-hidden">
        {/* Clean Header: Dark Tone in Dark Mode */}
        <div className="px-4 py-3 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/80 dark:bg-[#111723] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                  Sarthi AI Mentor
                </h3>
                <span className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-[10px] text-stone-500 dark:text-stone-400">
                Ask doubts, code, formulas, or upload images/notes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="Clear chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream: Dark Mode Contrast */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-stone-50/30 dark:bg-[#0c1018]">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[10px] font-bold ${
                    isUser
                      ? 'bg-teal-700 text-white dark:bg-teal-800'
                      : 'bg-stone-800 text-white dark:bg-stone-700'
                  }`}
                >
                  {isUser ? 'U' : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed space-y-2 ${
                    isUser
                      ? 'bg-teal-700 text-white dark:bg-teal-900/90 dark:border dark:border-teal-700/60 font-medium shadow-xs'
                      : 'bg-white dark:bg-[#151c28] border border-stone-200/80 dark:border-stone-800 text-stone-800 dark:text-stone-200 shadow-xs'
                  }`}
                >
                  {/* Uploaded Attachment in User Message */}
                  {msg.attachment && (
                    <div className="pb-1.5">
                      {msg.attachment.previewUrl ? (
                        <div className="relative rounded-lg overflow-hidden border border-white/20 dark:border-stone-700 max-w-xs max-h-48 bg-black/20">
                          <img
                            src={msg.attachment.previewUrl}
                            alt={msg.attachment.name}
                            className="w-full h-auto object-cover"
                          />
                          <div className="p-1 text-[9px] font-mono truncate bg-black/70 text-white">
                            {msg.attachment.name}
                          </div>
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg border border-stone-300 dark:border-stone-700 bg-black/10 dark:bg-black/30 flex items-center gap-2 max-w-xs">
                          <FileText className="w-3.5 h-3.5 shrink-0 text-teal-400" />
                          <span className="text-[10px] font-mono truncate">{msg.attachment.name}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {isUser ? (
                    <div className="whitespace-pre-line break-words text-xs leading-relaxed">{msg.content}</div>
                  ) : (
                    <FormattedAiMessage content={msg.content} />
                  )}

                  <div
                    className={`text-[9px] font-mono pt-0.5 ${
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
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 p-1">
              <Bot className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-spin" />
              <span className="animate-pulse">Sarthi AI is analyzing...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/70 border-t border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button onClick={() => setErrorMessage(null)} className="p-1 hover:text-rose-900 dark:hover:text-rose-100 cursor-pointer">
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Clean Input Controls: High-Contrast Dark Theme */}
        <div className="p-3 border-t border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-[#111723] space-y-2">
          {/* Attachment Preview Card */}
          {attachment && (
            <div className="flex items-center gap-2 p-1.5 rounded-lg bg-teal-50 dark:bg-[#162536] border border-teal-200 dark:border-teal-800 max-w-sm">
              {attachment.previewUrl ? (
                <img
                  src={attachment.previewUrl}
                  alt="Attachment preview"
                  className="w-8 h-8 rounded object-cover border border-teal-300 dark:border-teal-700 shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded bg-teal-100 dark:bg-teal-900/80 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-teal-700 dark:text-teal-300" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[11px] font-semibold text-teal-950 dark:text-teal-100 truncate">
                  {attachment.name}
                </div>
                <div className="text-[9px] font-mono text-teal-600 dark:text-teal-400">
                  {attachment.size ? `${(attachment.size / 1024).toFixed(1)} KB` : 'Attached'}
                </div>
              </div>
              <button
                type="button"
                onClick={removeAttachment}
                className="p-1 rounded text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors cursor-pointer"
                title="Remove attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Form */}
          <div className="flex items-end gap-1.5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*,.pdf,.txt,.c,.cpp,.py,.java,.js,.ts,.json,.md"
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-[#182030] hover:bg-teal-50 hover:text-teal-700 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer shrink-0"
              title="Upload question photo, notes, or file"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Sarthi anything (Enter to send)..."
              rows={1}
              className="flex-1 max-h-28 min-h-[40px] px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700/80 bg-stone-50 dark:bg-[#182030] text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-hidden focus:ring-2 focus:ring-teal-500 resize-none font-medium leading-relaxed"
            />

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
    </div>
  );
};
