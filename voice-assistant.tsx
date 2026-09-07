"use client";

import { useEffect, useState } from "react";
import { useVoiceAssistant, AssistantState } from "@/hooks/use-voice-assistant";
import { Orb } from "@/components/orb";
import { ChatHistory } from "@/components/chat-history";
import { Controls } from "@/components/controls";

const STATE_LABELS: Record<AssistantState, string> = {
  idle: "Ready",
  listening: "Listening...",
  thinking: "Thinking...",
  speaking: "Speaking... click to interrupt",
  interrupted: "Interrupted",
};

const ORB_LABELS: Record<AssistantState, string> = {
  idle: "Click to start talking",
  listening: "Listening... speak now",
  thinking: "Thinking...",
  speaking: "Speaking... click to interrupt",
  interrupted: "Interrupted — listening...",
};

export function VoiceAssistant() {
  const {
    state,
    messages,
    volume,
    error,
    isSupported,
    toggle,
    stop,
    sendText,
    clearMessages,
  } = useVoiceAssistant();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Spacebar toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") return;
      if (e.code === "Space") {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [toggle]);

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <ChatHistory messages={messages} onClear={clearMessages} />
      </aside>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="main">
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle sidebar"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <h1 className="brand">
            Interrupt<span className="brand-accent">AI</span>
          </h1>
          <div className={`status-pill ${state}`}>
            <span className="status-dot" />
            <span className="status-text">{STATE_LABELS[state]}</span>
          </div>
        </header>

        <div className="orb-container">
          <Orb state={state} volume={volume} onClick={toggle} />
          <p className="orb-label">
            {error ? error : !isSupported ? "Speech recognition not supported. Try Chrome or Edge." : ORB_LABELS[state]}
          </p>
        </div>

        <Controls
          state={state}
          onListen={toggle}
          onStop={stop}
          onSendText={sendText}
        />
      </main>
    </div>
  );
}
