// src/pages/Tasks.jsx
import React, { useState } from "react";

import Card from "../components/Card";
import { useTasks } from "../contexts/TasksContext";

export default function Tasks() {
  const { tasks, addTask, removeTask } = useTasks();
  const [input, setInput] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "") {
      addTask({
        text: input,
        hours: parseInt(hours) || 0,
        minutes: parseInt(minutes) || 0
      });
      setInput("");
      setHours("");
      setMinutes("");
    }
  };

  const formatTime = (h, m) => {
    if (h === 0 && m === 0) return "";
    let timeStr = "";
    if (h > 0) timeStr += `${h} hr${h > 1 ? 's' : ''}`;
    if (m > 0) {
      if (timeStr) timeStr += " and ";
      timeStr += `${m} min${m > 1 ? 's' : ''}`;
    }
    return timeStr;
  };

  return (
    <div className="mx-auto max-w-xl px-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <p className="mt-2 text-sm text-gray-400">Keep your focus list small and actionable.</p>
      </header>

      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="rounded-xl bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
              placeholder="New task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleAddTask();
              }}
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                className="flex-1 rounded-xl bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                min="0"
              />
              <input
                type="number"
                className="flex-1 rounded-xl bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
                placeholder="Minutes"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                min="0"
                max="59"
              />
            </div>
            <button
              className="rounded-xl bg-[#BB86FC] px-5 py-3 font-semibold text-black transition hover:bg-[#a172f8]"
              onClick={handleAddTask}
            >
              Add
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-400">No tasks yet. Add something to get started.</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-xl bg-black/20 px-4 py-3"
                >
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="truncate text-white">{task.text}</span>
                    {formatTime(task.hours, task.minutes) && (
                      <span className="text-sm text-gray-400 truncate">{formatTime(task.hours, task.minutes)}</span>
                    )}
                  </div>
                  <button
                    className="text-sm font-semibold text-red-400 hover:text-red-200 ml-2 flex-shrink-0"
                    onClick={() => removeTask(task.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}