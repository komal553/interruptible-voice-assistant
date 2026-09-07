"use client";

import { useState } from "react";
import { AssistantState } from "@/hooks/use-voice-assistant";

interface ControlsProps {
  state: AssistantState;
  onListen: () => void;
  onStop: () => void;
  onSendText: (text: string) => void;
}

export function Controls({ state, onListen, onStop, onSendText }: ControlsProps) {
  const [showText, setShowText] = useState(false);
  const [textValue, setTextValue] = useState("");

  const isListening = state === "listening";
  const isSpeaking = state === "speaking";
  const isThinking = state === "thinking";

  const handleSendText = () => {
    const trimmed = textValue.trim();
    if (!trimmed) return;
    onSendText(trimmed);
    setTextValue("");
    setShowText(false);
  };

  return (
    <>
      <div className="controls">
        <button
          className="control-btn listen-btn"
          onClick={onListen}
          disabled={isThinking}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
          <span>{isListening ? "Stop" : "Listen"}</span>
        </button>

        <button
          className="control-btn stop-btn"
          onClick={onStop}
          disabled={!isSpeaking && !isListening}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
          <span>Stop AI</span>
        </button>

        <button
          className="control-btn text-btn"
          onClick={() => setShowText(!showText)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Type</span>
        </button>
      </div>

      {showText && (
        <div className="text-input-overlay">
          <div className="text-input-box">
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Type your message and press Enter..."
              rows={3}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendText();
                }
              }}
            />
            <div className="text-input-actions">
              <button className="control-btn" onClick={() => setShowText(false)}>
                Cancel
              </button>
              <button className="control-btn send-btn" onClick={handleSendText}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
