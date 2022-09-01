import { Graphics, useTick } from "@inlet/react-pixi";
import { useCallback, useEffect, useState } from "react";
import { createNoise2D } from "simplex-noise";
import { debounce } from "debounce";

import { map, random } from "../utils";

const noise2D = createNoise2D();

const calcBounds = () => {
  const { innerWidth, innerHeight } = window;
  const maxDist = innerWidth < 1000 ? innerWidth / 2 : innerWidth / 5;
  // the { x, y } origin for each orb (the bottom right of the screen)
  const originX = innerWidth / 1.25;
  const originY = innerWidth < 1000 ? innerHeight / 2 : innerHeight / 1.375;

  // allow each orb to move x distance away from it's x / y origin
  return {
    x: {
      min: originX - maxDist,
      max: originX + maxDist,
    },
    y: {
      min: originY - maxDist,
      max: originY + maxDist,
    },
  };
};

const increment = 0.002;

const Orb = ({ fillColor = 0x000000 }) => {
  const [fill, setFill] = useState(fillColor);
  const [bounds, setBounds] = useState({ x: "", y: "" });
  const [pos, setPos] = useState({ x: "", y: "" });
  const [offsetPos, setOffsetPos] = useState({ x: "", y: "" });
  const [scale, setScale] = useState(1);
  const [radius, setRadius] = useState(0);

  const draw = useCallback(
    (g) => {
      g.x = pos.x;
      g.y = pos.y;
      g.scale.set(scale);

      // clear anything currently drawn to graphics
      g.clear();

      // tell graphics to fill any shapes drawn after this with the orb's fill color
      g.beginFill(fill);
      // draw a circle at { 0, 0 } with it's size set by this.radius
      g.drawCircle(0, 0, radius);
      // let graphics know we won't be filling in any more shapes
      g.endFill();
    },
    [pos, scale, fill, radius]
  );

  const handleResize = debounce(() => setBounds(calcBounds()), 250);

  const update = () => {
    // self similar "psuedo-random" or noise values at a given point in "time"
    const xNoise = noise2D(offsetPos.x, offsetPos.x);
    const yNoise = noise2D(offsetPos.y, offsetPos.y);
    const scaleNoise = noise2D(offsetPos.x, offsetPos.y);

    // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
    setPos({
      x: map(xNoise, -1, 1, bounds["x"].min, bounds["x"].max),
      y: map(yNoise, -1, 1, bounds["y"].min, bounds["y"].max),
    });

    // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
    setScale(map(scaleNoise, -1, 1, 0.5, 1));

    // step through "time"
    setOffsetPos({ x: offsetPos.x + increment, y: offsetPos.y + increment });
  };

  useEffect(() => {
    setBounds(calcBounds());
    setPos({
      x: random(bounds["x"].min, bounds["x"].max),
      y: random(bounds["x"].min, bounds["x"].max),
    });
    setRadius(random(window.innerHeight / 6, window.innerHeight / 3));
    setOffsetPos({ x: random(0, 1000), y: random(0, 1000) });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useTick((delta) => {
    update();
  });

  return <Graphics draw={draw} />;
};

export default Orb;
