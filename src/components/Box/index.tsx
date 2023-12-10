import { useRef } from "react";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { type Mesh } from "three";

type Props = ThreeElements["mesh"] & {
  color?: string;
};

const Box = ({ color = "#ffffff", ...props }: Props) => {
  const meshRef = useRef<Mesh>(null!);

  useFrame((state, delta) => (meshRef.current.rotation.y += delta));

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Box;
