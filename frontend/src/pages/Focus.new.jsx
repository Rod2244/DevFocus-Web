// src/pages/Focus.jsx
import React, { useState, useEffect } from "react";

import Card from "../components/Card";

export default function Focus() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-10 px-4">
      <header className="text-center">
        <h1 className="text-3xl font-semibold">Focus Session</h1>
        <p className="mt-2 text-sm text-gray-400">Start a timer and stay on track.</p>
      </header>

      <Card className="w-full">
        <div className="flex flex-col items-center gap-8">
          <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-black/30 ring-2 ring-white/10">
            <span className="text-5xl font-bold">{formatTime(seconds)}</span>
          </div>

          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              className="rounded-xl bg-[#BB86FC] px-4 py-3 font-semibold text-black transition hover:bg-[#a172f8]"
              onClick={() => setRunning(true)}
            >
              Start
            </button>
            <button
              className="rounded-xl bg-[#03DAC6] px-4 py-3 font-semibold text-black transition hover:bg-[#2df5d0]"
              onClick={() => setRunning(false)}
            >
              Pause
            </button>
            <button
              className="rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
              onClick={() => setSeconds(0)}
            >
              Reset
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
