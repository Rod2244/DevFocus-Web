import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Focus" },
  { to: "/tasks", label: "Tasks" },
  { to: "/history", label: "History" },
];

function NavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-xl text-sm font-semibold transition-colors duration-150 ${
          isActive
            ? "bg-[#BB86FC] text-black"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <span className="text-lg font-semibold tracking-wide">DevFocus</span>
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavItem key={item.to} {...item} />
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">{children}</div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#1E1E1E] md:hidden">
        <div className="mx-auto flex max-w-3xl justify-around px-4 py-3">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </footer>
    </div>
  );
}
