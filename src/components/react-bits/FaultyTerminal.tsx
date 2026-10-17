"use client";

import React, { useState, useEffect } from 'react';

interface TerminalLog {
  timestamp: string;
  source: string;
  message: string;
  status: 'info' | 'warn' | 'success';
}

interface FaultyTerminalProps {
  logs: TerminalLog[];
  title?: string;
  className?: string;
}

export default function FaultyTerminal({
  logs,
  title = 'MERC Grid Code & Tariff Telemetry Inspector',
  className = '',
}: FaultyTerminalProps) {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setFlicker(true);
        setTimeout(() => setFlicker(false), 80);
      }
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`rounded-2xl border border-black/15 bg-[#0D1117] text-[#C9D1D9] font-sans tabular-nums text-xs overflow-hidden shadow-2xl transition-opacity duration-75 ${
        flicker ? 'opacity-90' : 'opacity-100'
      } ${className}`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-[#30363D]">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
          <span className="ml-2 text-[11px] text-[#8B949E] tracking-wider uppercase">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#58A6FF]">
          <span className="h-2 w-2 rounded-full bg-[#2EA043] animate-pulse" />
          ONLINE
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 flex flex-col gap-2 max-h-[320px] overflow-y-auto no-scrollbar">
        {logs.map((log, idx) => (
          <div key={idx} className="flex items-start gap-2 leading-relaxed">
            <span className="text-[#8B949E] select-none">[{log.timestamp}]</span>
            <span className="text-[#D29922] font-semibold">{log.source}:</span>
            <span
              className={
                log.status === 'success'
                  ? 'text-[#3FB950]'
                  : log.status === 'warn'
                  ? 'text-[#FFA657]'
                  : 'text-[#E6EDF3]'
              }
            >
              {log.message}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 text-[#8B949E] mt-2">
          <span className="text-[#3FB950]">❯</span>
          <span className="inline-block w-2 h-4 bg-[#58A6FF] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
