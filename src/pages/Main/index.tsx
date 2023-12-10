import classNames from "classnames/bind";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

import Box from "@/components/Box";

import styles from "./styles.module.scss";

const cx = classNames.bind(styles);

const Main = () => {
  const boxes = Array.from({ length: 4 });
  const gap = 4;
  const boxPositions = boxes.map(
    (_, index) => (index - (boxes.length - 1) / 2) * gap
  );

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
        {boxes.map((_, index) => (
          <Box key={index} position={[boxPositions[index], 0, 0]} />
        ))}
        <OrbitControls />
        <Grid position={[0, -1, 0]} args={[20, 20]} cellColor="#ffffff" />
      </Canvas>
    </div>
  );
};

export default Main;
