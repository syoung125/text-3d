import classNames from "classnames/bind";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

import Box from "@/components/Box";

import styles from "./styles.module.scss";
import { useState } from "react";
import { getRandomColor } from "@/utils/color";

const cx = classNames.bind(styles);

const gap = 1;

const Main = () => {
  const [text, setText] = useState("text");
  const [color, setColor] = useState(getRandomColor());
  const textArray = [...text];
  const boxPositions = textArray.map(
    (_, index) => (index - (textArray.length - 1) / 2) * gap
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.match(/[^(a-z|A-Z|0-9)]/)) {
      alert("Only alphabets and numbers are valid.");
      return;
    }

    setText(value);
  };

  const changeColor = () => {
    setColor(getRandomColor);
  };

  return (
    <div>
      <Canvas className={cx("canvas")}>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[0, 0, 0]} decay={0} intensity={Math.PI} />
        {textArray.map((_, index) => (
          <Box
            key={index}
            position={[boxPositions[index], 0, 0]}
            color={color}
          />
        ))}
        <OrbitControls />
        <Grid position={[0, -1, 0]} args={[20, 20]} cellColor="#ffffff" />
      </Canvas>
      <form className={cx("form")}>
        <input
          className={cx("input")}
          type="text"
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
