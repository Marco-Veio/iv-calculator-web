"use client";

import { usePokemon } from "@/hooks/usePokemon";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function Select() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const { pokemonList, setSelectedPokemon } = usePokemon();

  return (
    <div className="max-h-10 relative w-96">
      <input
        className="flex h-10 w-full items-center justify-between rounded-md border border-white bg-black px-3 py-2 text-sm ring-offset-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
        onFocus={() => setOpen(true)}
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        placeholder="Selecione um Pokémon"
      />
      <div
        className={twMerge(
          "max-h-96 overflow-y-auto w-full absolute bg-black hidden z-10 border border-white flex-col",
          open && "flex"
        )}
      >
        {pokemonList
          .filter((pokemon) =>
            pokemon.title_1.toLowerCase().includes(filter.toLowerCase())
          )
          .map((pokemon) => (
            <button
              key={pokemon.title_1}
              onClick={() => {
                setSelectedPokemon(pokemon.title_1);
                setFilter(pokemon.title_1);
                setOpen(false);
              }}
            >
              {pokemon.title_1}
            </button>
          ))}
      </div>
    </div>
  );
}
