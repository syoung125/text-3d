import Character from "@/components/Character";
import { Gap } from "@/types";
import { useCallback } from "react";
import { Vector3 } from "three";

export const DEFAULT_GAP: Gap = {
  row: 3,
  col: 2,
};

type Props = {
  value: string;
  row: number;
  gap?: Gap;
  color?: string;
};

const Word = ({ value, row, gap = DEFAULT_GAP, color }: Props) => {
  const calcCharPosition = useCallback(
    (index: number) => {
      const x = (index - (value.length - 1) / 2) * gap.col;
      const y = -row * gap.row;
      return new Vector3(x, y, 0);
    },
    [gap, row, value.length]
  );

  return [...value].map((char, index) => (
    <Character
      key={index}
      value={char}
      position={calcCharPosition(index)}
      color={color}
    />
  ));
};

export default Word;
