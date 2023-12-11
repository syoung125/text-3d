import { useState } from "react";
import classNames from "classnames/bind";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

import Word, { DEFAULT_GAP } from "@/components/Word";
import { getRandomColor } from "@/utils/color";

import styles from "./styles.module.scss";
import { Gap } from "@/types";

const cx = classNames.bind(styles);

const Main = () => {
  const [text, setText] = useState("text");
  const [color, setColor] = useState(getRandomColor());
  const [gap, setGap] = useState<Gap>(DEFAULT_GAP);
  const words = text.split("\n");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.match(/[^(a-z|A-Z|0-9|.\s\n)]/)) {
      alert("Only alphabets, numbers and dot are valid.");
      return;
    }

    setText(value);
  };

  const changeColor = () => {
    setColor(getRandomColor);
  };

  const changeGap =
    (name: "row" | "col") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setGap((prevGap) => ({ ...prevGap, [name]: e.target.value }));
    };

  return (
    <div>
      <Canvas className={cx("canvas")} camera={{ position: [0, 0, 16] }}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[0, 0, 0]} decay={0} intensity={Math.PI} />
        {words.map((word, index) => (
          <Word key={index} value={word} gap={gap} color={color} row={index} />
        ))}
        <OrbitControls />
        <Grid position={[0, -1, 0]} args={[40, 40]} cellColor="#ffffff" />
      </Canvas>
      <form className={cx("form")}>
        <textarea
          className={cx("input")}
          value={text}
          onChange={handleInputChange}
        />
        <button type="button" onClick={changeColor}>
          Random Color
        </button>
        <div className={cx("gap")}>
          <label>row gap</label>
          <input type="number" value={gap.row} onChange={changeGap("row")} />
          <label>colum gap</label>
          <input type="number" value={gap.col} onChange={changeGap("col")} />
        </div>
      </form>
    </div>
  );
};

export default Main;
