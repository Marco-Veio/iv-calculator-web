"use client";

import React from "react";
import { usePokemon } from "@/hooks/usePokemon";

export default function Response() {
  const { probability, combinations } = usePokemon();

  return (
    <>
      <p className="mt-10 text-white">
        Probabilidade de ser maior que 90%: {probability}
      </p>

      <div className="mt-2 overflow-y-auto h-full max-h-full flex flex-col pr-10">
        {Object.keys(combinations).map((lvl) => {
          return (
            <div key={lvl} className="flex flex-col">
              <span key={lvl} className="text-white">
                LVL {lvl}:
              </span>
              {combinations[lvl as any].map((combination) => (
                <span
                  className="ml-2 text-white"
                  key={`${lvl}-${combination.ivAttack}-${combination.ivDefense}-${combination.ivStamina}`}
                >
                  Att: {combination.ivAttack}, Def: {combination.ivDefense},
                  Sta: {combination.ivStamina}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </>
  );
}
