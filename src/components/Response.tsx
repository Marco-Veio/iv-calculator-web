"use client";

import React from "react";
import { usePokemon } from "@/hooks/usePokemon";

export default function Response() {
  const { probability, ivs } = usePokemon();

  return (
    <>
      <p className="mt-10 text-white">
        Probabilidade de ser maior que 90%: {probability}
      </p>

      <div className="mt-2 overflow-y-auto h-full max-h-full flex flex-col pr-10">
        {Object.keys(ivs).map((iv) => {
          return (
            <div key={iv} className="flex flex-col">
              <span key={iv} className="text-white">
                {iv}/45: {ivs[iv]}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
