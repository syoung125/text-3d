import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

type Props = ThreeElements["mesh"] & {
  value: string;
  color?: string;
};

const Character = ({ value, color = "#ffffff", ...props }: Props) => {
  const { nodes } = useGLTF("/models/typography.glb");

  if (value.match(/[^(a-z|A-Z|0-9|.)]/)) {
    return null;
  }

  const matchName = (char: string) => {
    if (char === "0") return "o";
    if (char === ".") return "heart";
    return char.toLowerCase();
  };

  return (
    <mesh
      {...props}
      castShadow
      receiveShadow
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geometry={(nodes[matchName(value)] as any).geometry}
      scale={[0.4, 0.4, 0.4]}
    >
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

useGLTF.preload("./typography.gltf");

export default Character;
