import { Stage, Container } from "@inlet/react-pixi";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import { useEffect, useState } from "react";
import Orb from "../components/Orb";
import { generateColors, random } from "../utils";

const Groups = () => {
  const colors = generateColors();
  const [mounted, setMounted] = useState(false);

  const pickRandomColor = () => {
    const length = Object.keys(colors).length;
    return colors[Object.keys(colors)[~~random(0, length)]].replace("#", "0x");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setMounted(true);
    }
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <nav className="bottom-menu">
        {["home", "friends", "trans", "notification", "accounts"].map(
          (tab, i) => (
            <button key={i}>{tab}</button>
          )
        )}
      </nav>
      {mounted && (
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          options={{ resizeTo: window, backgroundAlpha: 0.9, antialias: true }}
        >
          <Container filters={[new KawaseBlurFilter(30, 10, true)]}>
            {Array(10)
              .fill("")
              .map((_, i) => (
                <Orb key={i} fillColor={pickRandomColor()} />
              ))}
          </Container>
        </Stage>
      )}
    </div>
  );
};

export default Groups;
