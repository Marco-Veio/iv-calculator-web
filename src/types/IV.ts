export interface IV {
  ivAttack: number;
  ivDefense: number;
  ivStamina: number;
}

export interface IVCombinations {
  [key: number]: IV[];
}
