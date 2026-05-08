import React from "react";
import { Link } from "react-router-dom";
import {
  Cat,
  Quote,
  Laugh,
  Users,
  ShoppingBag,
  Play,
  Utensils,
  ShieldCheck,
} from "lucide-react";

const assignments = [
  {
    id: crypto.randomUUID(),
    name: "Authentication App",
    path: "/auth",
    icon: <ShieldCheck size={32} />,
    desc: "Login, Signup & Security",
    // disabled: true,
  },
  {
    id: crypto.randomUUID(),
    name: "YouTube UI",
    path: "/youtube",
    icon: <Play size={32} />,
    desc: "Video listing with grid layout",
  },
  {
    id: crypto.randomUUID(),
    name: "Product Listing",
    path: "/products",
    icon: <ShoppingBag size={32} />,
    desc: "E-commerce interface",
  },
  {
    id: crypto.randomUUID(),
    name: "Meals Interface",
    path: "/meals",
    icon: <Utensils size={32} />,
    desc: "Browse delicious recipes",
  },
  {
    id: crypto.randomUUID(),
    name: "Random Users",
    path: "/users",
    icon: <Users size={32} />,
    desc: "User profiles from API",
  },
  {
    id: crypto.randomUUID(),
    name: "Random Quotes",
    path: "/quotes",
    icon: <Quote size={32} />,
    desc: "Inspiring quotes generator",
  },
  {
    id: crypto.randomUUID(),
    name: "Random Jokes",
    path: "/jokes",
    icon: <Laugh size={32} />,
    desc: "Stay happy with random jokes",
  },
  {
    id: crypto.randomUUID(),
    name: "Random Cat Viewer",
    path: "/cats",
    icon: <Cat size={32} />,
    desc: "Purr-fect random cat images",
  },
];

const Home = () => {
  return (
    <>
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4 py-2">
          FreeAPI Assignments
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assignments.map((task) => {
          // Dynamic classes based on status
          const cardBaseClass =
            "group relative border p-6 rounded-2xl flex flex-col items-center text-center overflow-hidden transition-all duration-300";
          const activeClass =
            "bg-zinc-900 border-zinc-800 hover:scale-105 hover:border-blue-500/50 hover:bg-zinc-800/50 cursor-pointer";
          const disabledClass =
            "bg-zinc-900/50 border-zinc-800/50 grayscale cursor-not-allowed";

          const content = (
            <>
              {/* Coming Soon Badge */}
              {task.disabled && (
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800 px-2 py-1 rounded-md">
                  In Progress
                </span>
              )}

              {/* Hover Glow Effect (Only for active tasks) */}
              {!task.disabled && (
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}

              <div
                className={`mb-4 ${task.disabled ? "text-zinc-600" : "text-blue-400 group-hover:text-blue-300 group-hover:scale-110"} transition-transform duration-300`}
              >
                {task.icon}
              </div>

              <h2
                className={`text-xl font-semibold mb-2 ${task.disabled ? "text-zinc-500" : "text-white group-hover:text-blue-400"} transition-colors`}
              >
                {task.name}
              </h2>

              <p
                className={`text-sm ${task.disabled ? "text-zinc-600" : "text-gray-500 group-hover:text-gray-400"}`}
              >
                {task.disabled ? "Coming Soon: Modular Auth Flow" : task.desc}
              </p>

              {/* Bottom Accent Line (Only for active tasks) */}
              {!task.disabled && (
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              )}
            </>
          );

          // Render Link if active, div if disabled
          return task.disabled ? (
            <div key={task.id} className={`${cardBaseClass} ${disabledClass}`}>
              {content}
            </div>
          ) : (
            <Link
              key={task.id}
              to={task.path}
              className={`${cardBaseClass} ${activeClass}`}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Home;
