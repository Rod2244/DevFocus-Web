// src/pages/History.jsx
import React, { useState } from "react";

import Card from "../components/Card";

export default function History() {
  const [sessions] = useState([
    { id: 1, duration: 45 },
    { id: 2, duration: 30 },
    { id: 3, duration: 60 },
  ]);

  return (
    <div className="mx-auto max-w-xl px-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-semibold">Session History</h1>
        <p className="mt-2 text-sm text-gray-400">Your recent focus sessions at a glance.</p>
      </header>

      <Card>
        <div className="space-y-4">
          {sessions.length === 0 ? (
            <p className="text-center text-gray-400">No sessions yet.</p>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-white">Session #{session.id}</p>
                  <p className="text-sm text-gray-400">Duration: {session.duration} min</p>
                </div>
                <span className="text-sm font-semibold text-[#BB86FC]">
                  {session.duration}m
                </span>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}