import { Stage, Container } from "@inlet/react-pixi";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import { useEffect, useState } from "react";

import Orb from "../components/Orb";
import { generateColors, random } from "../utils";
import Groups from "../components/Groups";
import BottomNav from "../components/BottomNav";
import SearchBar from "../components/SearchBar";
import FriendsList from "../components/FriendsList";
import Transactions from "../components/Transactions";

const Home = () => {
  const colors = generateColors();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  const pickRandomColor = () => {
    const length = Object.keys(colors).length;
    return colors[Object.keys(colors)[~~random(0, length)]].replace("#", "0x");
  };

  useEffect(() => {
    if (typeof window !== "undefined") setMounted(true);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <div>
        <SearchBar className="absolute inset-8 top-0 bottom-auto h-16" />
        {activeTab === "home" && (
          <Groups className="absolute inset-4 top-16 bottom-12 overflow-x-hidden overflow-y-auto" />
        )}
        {activeTab === "friends" && (
          <FriendsList className="absolute inset-4 top-16 bottom-12 overflow-hidden" />
        )}
        {activeTab === "transactions" && (
          <Transactions className="absolute inset-4 top-16 bottom-12 overflow-x-hidden overflow-y-auto" />
        )}
        <BottomNav
          active={activeTab}
          setActive={setActiveTab}
          className="fixed inset-0 top-auto h-10 bg-gradient-to-r from-indigo-900 to-purple-900"
        />
      </div>
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

export default Home;
