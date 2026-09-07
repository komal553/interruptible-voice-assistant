"use client";

import { ChatMessage } from "@/hooks/use-voice-assistant";

interface ChatHistoryProps {
  messages: ChatMessage[];
  onClear: () => void;
}

export function ChatHistory({ messages, onClear }: ChatHistoryProps) {
  return (
    <div className="chat-history-container">
      <div className="chat-header">
        <h2>Conversation</h2>
        {messages.length > 0 && (
          <button className="clear-btn" onClick={onClear} title="Clear conversation">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        )}
      </div>
      <div className="chat-history">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Start a conversation by clicking the orb or pressing the spacebar.</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className={`message ${msg.role}`}>
              <div className="role-label">{msg.role === "user" ? "You" : "AI"}</div>
              <div className="message-content">{msg.content}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
