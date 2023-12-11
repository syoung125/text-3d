import { useState } from "react";
import classNames from "classnames/bind";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

import Word from "@/components/Word";
import { getRandomColor } from "@/utils/color";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const gap = 3;

const Main = () => {
  const [text, setText] = useState("text");
  const [color, setColor] = useState(getRandomColor());
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
      </form>
    </div>
  );
};

export default Main;
