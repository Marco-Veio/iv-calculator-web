"use client";

import { IVCombinations } from "@/types/IV";
import { Pokemon } from "@/types/Pokemon";
import axios from "axios";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Props = { children: ReactNode };

type PokemonContextProps = {
  pokemonList: Pokemon[];
  selectedPokemon: string;
  setSelectedPokemon: Dispatch<SetStateAction<string>>;
  targetCP?: number;
  setTargetCP: Dispatch<SetStateAction<number | undefined>>;
  probability: string;
  combinations: IVCombinations;
  pokemonData?: Pokemon;
};

const PokemonContext = createContext({} as PokemonContextProps);

export function PokemonProvider({ children }: Props) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState("");
  const [targetCP, setTargetCP] = useState<number>();
  const [probability, setProbability] = useState("0%");
  const [combinations, setCombinations] = useState<IVCombinations>({});

  const IVThreshold = 40;

  useEffect(() => {
    axios
      .get("/api/pokemon")
      .then((response) => setPokemonList(response.data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const pokemonData = useMemo(
    () =>
      Object.values(pokemonList).find(
        (pokemon) => pokemon.title_1 === selectedPokemon
      ),
    [pokemonList, selectedPokemon]
  );
  const baseStamina = useMemo(() => pokemonData?.sta, [pokemonData]);
  const baseAttack = useMemo(() => pokemonData?.atk, [pokemonData]);
  const baseDefense = useMemo(() => pokemonData?.def, [pokemonData]);

  const levelMultipliers = useMemo(
    () => ({
      1: 0.094,
      1.5: 0.135137432,
      2: 0.16639787,
      2.5: 0.192650919,
      3: 0.21573247,
      3.5: 0.236572661,
      4: 0.25572005,
      4.5: 0.273530381,
      5: 0.29024988,
      5.5: 0.306057377,
      6: 0.3210876,
      6.5: 0.335445036,
      7: 0.34921268,
      7.5: 0.362457751,
      8: 0.37523559,
      8.5: 0.387592406,
      9: 0.39956728,
      9.5: 0.411193551,
      10: 0.4225,
      10.5: 0.432926419,
      11: 0.44310755,
      11.5: 0.4530599578,
      12: 0.46279839,
      12.5: 0.472336083,
      13: 0.48168495,
      13.5: 0.4908558,
      14: 0.49985844,
      14.5: 0.508701765,
      15: 0.51739395,
      15.5: 0.525942511,
      16: 0.5343543,
      16.5: 0.542635737,
      17: 0.5507927,
      17.5: 0.558830576,
      18: 0.5667545,
      18.5: 0.574569133,
      19: 0.5822789,
      19.5: 0.589887917,
      20: 0.5974,
      20.5: 0.604818814,
      21: 0.6121573,
      21.5: 0.619404121,
      22: 0.6265671,
      22.5: 0.633649143,
      23: 0.64065295,
      23.5: 0.647580966,
      24: 0.65443563,
      24.5: 0.661219252,
      25: 0.667934,
      25.5: 0.674581896,
      26: 0.6811649,
      26.5: 0.687684904,
      27: 0.69414365,
      27.5: 0.70054287,
      28: 0.7068842,
      28.5: 0.713169109,
      29: 0.7193991,
      29.5: 0.725575614,
      30: 0.7317,
      30.5: 0.734741009,
      31: 0.7377695,
      31.5: 0.740785574,
      32: 0.74378943,
      32.5: 0.746781211,
      33: 0.74976104,
      33.5: 0.752729087,
      34: 0.7556855,
      34.5: 0.758630368,
      35: 0.76156384,
      35.5: 0.764486065,
      36: 0.76739717,
      36.5: 0.770297266,
      37: 0.7731865,
      37.5: 0.776064962,
      38: 0.77893275,
      38.5: 0.781790055,
      39: 0.784637,
      39.5: 0.787473608,
      40: 0.7903,
      40.5: 0.79280395,
      41: 0.79530001,
      41.5: 0.79778901,
      42: 0.80026,
      42.5: 0.80275421,
      43: 0.80523612,
      43.5: 0.80770222,
      44: 0.81015361,
      44.5: 0.81259224,
      45: 0.81501649,
      45.5: 0.8174285,
      46: 0.81982627,
      46.5: 0.82221013,
      47: 0.82458073,
      47.5: 0.82693748,
      48: 0.82928052,
      48.5: 0.83161028,
      49: 0.83392691,
      49.5: 0.83623057,
      50: 0.83852165,
    }),
    []
  );

  useEffect(() => {
    let ivCombinations = {} as IVCombinations;

    if (baseAttack && baseDefense && baseStamina && targetCP) {
      for (let level = 1; level <= 50; level += 0.5) {
        // @ts-ignore
        let levelMultiplier = levelMultipliers[level];
        let combinations = [];

        for (let ivAttack = 0; ivAttack <= 15; ivAttack++) {
          for (let ivDefense = 0; ivDefense <= 15; ivDefense++) {
            for (let ivStamina = 0; ivStamina <= 15; ivStamina++) {
              const attack = +baseAttack + ivAttack;
              const defense = +baseDefense + ivDefense;
              const stamina = +baseStamina + ivStamina;
              const cp = Math.floor(
                (attack *
                  Math.sqrt(defense) *
                  Math.sqrt(stamina) *
                  Math.pow(levelMultiplier, 2)) /
                  10
              );

              if (Math.abs(cp - targetCP) < 1) {
                combinations.push({
                  ivAttack,
                  ivDefense,
                  ivStamina,
                });
              }
            }
          }
        }

        if (combinations.length > 0) {
          ivCombinations[level] = combinations;
        }
      }

      setCombinations(ivCombinations);

      const totalCombinations = Object.values(ivCombinations).flat().length;
      const totalAbove90 = Object.values(ivCombinations)
        .flat()
        .filter(
          (combination) =>
            combination.ivAttack +
              combination.ivDefense +
              combination.ivStamina >
            IVThreshold
        ).length;
      const probabilityAbove90 = totalAbove90 / totalCombinations;
      setProbability(`${(probabilityAbove90 * 100).toFixed(2)}%`);
    }
  }, [baseAttack, baseDefense, baseStamina, levelMultipliers, targetCP]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        selectedPokemon,
        setSelectedPokemon,
        targetCP,
        setTargetCP,
        combinations,
        probability,
        pokemonData,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemon = () => useContext(PokemonContext);

export default PokemonContext;
