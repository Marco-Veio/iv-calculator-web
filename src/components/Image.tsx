"use client";

import React from "react";
import NextImage, { ImageProps } from "next/image";
import { usePokemon } from "@/hooks/usePokemon";
import { twMerge } from "tailwind-merge";

export default function Image({
  className,
  ...props
}: Omit<ImageProps, "src">) {
  const { pokemonData } = usePokemon();

  if (pokemonData) {
    return (
      <NextImage
        width={80}
        height={80}
        {...props}
        className={twMerge("w-auto h-20", className)}
        src={pokemonData.uri}
      />
    );
  }

  return <div className="w-20 h-20" />;
}
