// src/pages/Tasks.jsx
import React, { useState } from "react";

import Card from "../components/Card";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: input.trim() }]);
      setInput("");
    }
  };

  const removeTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  return (
    <div className="mx-auto max-w-xl px-4">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <p className="mt-2 text-sm text-gray-400">Keep your focus list small and actionable.</p>
      </header>

      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              className="flex-1 rounded-xl bg-black/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#BB86FC]"
              placeholder="New task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addTask();
              }}
            />
            <button
              className="rounded-xl bg-[#BB86FC] px-5 py-3 font-semibold text-black transition hover:bg-[#a172f8]"
              onClick={addTask}
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
                  <span className="truncate text-white">{task.text}</span>
                  <button
                    className="text-sm font-semibold text-red-400 hover:text-red-200"
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
