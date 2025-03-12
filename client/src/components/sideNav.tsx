"use client";
import React from "react";
import Link from "next/link";

const SideNav = () => {
  const pages = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "🏠",
    },
    {
      title: "Templates",
      url: "/templates",
      icon: "📄",
    },
    {
      title: "Resume Builder",
      url: "/resume",
      icon: "🛠️",
    },
    {
      title: "Examples",
      url: "examples",
      icon: "📋",
    },
    {
      title: "Pricing",
      url: "#",
      icon: "💲",
    },
  ];

  return (
    <div className="flex flex-col gap-5 h-screen max-w-[250] bg-gray-100">
      <section className="flex flex-col items-center gap-1 py-4 h-[100] bg-zinc-900 w-full">
        <div className="flex text-white">
          <p className="font-sans font-bold text-2xl">
            Resumify<span className="text-violet-700">X</span>
          </p>
        </div>
        <p className="text-sm font-light text-yellow-400">Build your future</p>
      </section>

      <section>
        {pages.map((item, index) => (
          <div key={index} className="p-4 hover:bg-gray-200 active:bg-gray-200">
            <Link href={item.url} className="flex gap-3">
              <div className="text-xl">{item.icon}</div>
              <p className="font-semibold text-xl">{item.title}</p>
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SideNav;
