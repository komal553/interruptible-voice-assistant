"use client";

import { AssistantState } from "@/hooks/use-voice-assistant";

interface OrbProps {
  state: AssistantState;
  volume: number;
  onClick: () => void;
}

export function Orb({ state, volume, onClick }: OrbProps) {
  const scale = 1 + Math.min(volume * 8, 0.3);

  return (
    <div
      className={`orb-wrapper ${state}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Toggle voice assistant"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="orb">
        <div
          className="orb-core"
          style={{ transform: `scale(${scale})` }}
        />
        <div className="orb-ring ring-1" />
        <div className="orb-ring ring-2" />
        <div className="orb-ring ring-3" />
      </div>
    </div>
  );
}
