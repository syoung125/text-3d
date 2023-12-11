import Character from "@/components/Character";
import { useCallback } from "react";
import { Vector3 } from "three";

type Props = {
  value: string;
  row: number;
  gap?: number;
  color?: string;
};

const Word = ({ value, row, gap = 2, color }: Props) => {
  const calculateCharPosition = useCallback(
    (index: number) => {
      const x = (index - (value.length - 1) / 2) * gap;
      const y = -row * gap;
      return new Vector3(x, y, 0);
    },
    [gap, row, value.length]
  );

  return [...value].map((char, index) => (
    <Character
      key={index}
      value={char}
      position={calculateCharPosition(index)}
      color={color}
    />
  ));
};

export default Word;
