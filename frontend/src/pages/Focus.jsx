// src/pages/Focus.jsx
import React, { useState, useEffect, useRef } from "react";

import Card from "../components/Card";
import { useTasks } from "../contexts/TasksContext";

export default function Focus() {
  const { tasks } = useTasks();
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const audioContextRef = useRef(null);

  // Function to play beep sound with custom audio fallback
  const playBeep = () => {
    // Try to play custom audio file first
    const audio = new Audio('/Bell Ding Sound EFFECT.mp3'); // Place your audio file in the public folder
    audio.volume = 0.5; // Adjust volume as needed
    
    audio.play().catch(() => {
      // Fallback to generated beep if audio file fails
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      
      const context = audioContextRef.current;
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(context.destination);
      
      oscillator.frequency.setValueAtTime(800, context.currentTime); // 800Hz beep
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, context.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.5);
      
      oscillator.start(context.currentTime);
      oscillator.stop(context.currentTime + 0.5);
    });
  };

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (selectedTask) {
            // Countdown mode
            if (prev <= 1) {
              setRunning(false);
              playBeep(); // Play sound when timer reaches 0
              return 0;
            }
            return prev - 1;
          } else {
            // Count up mode
            return prev + 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, selectedTask]);

  const formatTime = (sec) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    const hh = h.toString().padStart(2, "0");
    const mm = m.toString().padStart(2, "0");
    const ss = s.toString().padStart(2, "0");

    return h > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
  };

  const formatTaskTime = (h, m) => {
    if (h === 0 && m === 0) return "";
    let timeStr = "";
    if (h > 0) timeStr += `${h} hr${h > 1 ? 's' : ''}`;
    if (m > 0) {
      if (timeStr) timeStr += " ";
      timeStr += `${m} min${m > 1 ? 's' : ''}`;
    }
    return timeStr;
  };

  const selectTask = (task) => {
    const totalSeconds = (task.hours * 3600) + (task.minutes * 60);
    setSelectedTask(task);
    setSeconds(totalSeconds);
    setRunning(false);
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-semibold">Focus Session</h1>
        <p className="mt-2 text-sm text-gray-400">Start a timer and stay on track.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="w-full">
          <div className="flex flex-col items-center gap-8">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-black/30 ring-2 ring-white/10">
              <span className="text-5xl font-bold">{formatTime(seconds)}</span>
              {selectedTask && (
                <div className="absolute bottom-4 text-center">
                  <p className="text-sm text-gray-400">Focusing on:</p>
                  <p className="text-sm font-semibold text-white">{selectedTask.text}</p>
                </div>
              )}
            </div>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
              <button
                className="rounded-xl bg-[#BB86FC] px-4 py-3 font-semibold text-black transition hover:bg-[#a172f8] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setRunning(true)}
                disabled={!selectedTask && seconds === 0}
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
                onClick={() => {
                  setSeconds(selectedTask ? (selectedTask.hours * 3600) + (selectedTask.minutes * 60) : 0);
                  setRunning(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">Tasks</h2>
          {tasks.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 gap-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`rounded-xl p-4 cursor-pointer transition ${
                      selectedTask?.id === task.id
                        ? 'bg-[#BB86FC] text-black'
                        : 'bg-black/20 hover:bg-black/30 text-white'
                    }`}
                    onClick={() => selectTask(task)}
                  >
                    <h3 className="font-semibold truncate">{task.text}</h3>
                    {formatTaskTime(task.hours, task.minutes) && (
                      <p className="text-sm opacity-75 truncate">{formatTaskTime(task.hours, task.minutes)}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">No tasks yet</p>
          )}
        </Card>
      </div>
    </div>
  );
}