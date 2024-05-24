"use client";

import React from "react";
import { usePokemon } from "@/hooks/usePokemon";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}

export default function Input({ className }: Props) {
  const { targetCP, setTargetCP } = usePokemon();

  return (
    <input
      className={twMerge(
        "flex h-10 w-full items-center justify-between rounded-md border border-white bg-black px-3 py-2 text-sm ring-offset-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      type="number"
      onChange={(e) => setTargetCP(+e.target.value)}
      value={targetCP}
      placeholder="Digite o CP"
    />
  );
}
