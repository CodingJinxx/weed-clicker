import "./App.css";
import { useState, useEffect, useRef } from "react";

const bakers = [
  {
    name: "Small 1x1 Tent Amnesia Haze",
    defaultValue: 50,
    defaultCps: 1
  },
  {
    name: "Medium 2x2 Tent Purple Queen",
    defaultValue: 200,
    defaultCps: 10
  },
  {
    name: "Large 3x3 Tent White Widow",
    defaultValue: 500,
    defaultCps: 25
  },
  {
    name: "Grow Hut 10x10 Random Strains",
    defaultValue: 4000,
    defaultCps: 100
  },
  {
    name: "Grow Center",
    defaultValue: 100000000,
    defaultCps: 100000
  }
];

export default function App() {
  const [countSave, saveCount] = useState([]);

  useEffect(() => {
    localStorage.setItem('game-save', JSON.stringify(countSave));
  }, [countSave]);


  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('game-save'));
  //   if (items) {
  //     saveCount(items);
  //   }
  // }, []);

  const defaultBakersCount = bakers.map((_) => 0);
  const defaultBakersMagnification = bakers.map((_) => 1);
  const [count, setCount] = useState(0);
  const [cps, setCps] = useState(0);
  const [bakersCount, setBakersCount] = useState(defaultBakersCount);
  const [bakersMagnification, setBakersMagnification] = useState(
    defaultBakersMagnification
  );

  const refCps = useRef(cps);

  const onClickCookie = () => {
    setCount((count) => count + 1);
  };

  const bakersBuyFee = (idx: number) => {
    return (
      bakers[idx].defaultValue +
      Math.floor(
        bakers[idx].defaultCps * 0.12 * bakersCount[idx] * bakersCount[idx]
      )
    );
  };

  const onClickBuyBaker = (idx: number) => {
    const buyFee = bakersBuyFee(idx);
    if (count < buyFee) return null;
    const newBakersCount = [...bakersCount];
    const beforeBuyCount = bakersCount[idx];
    newBakersCount.splice(idx, 1, beforeBuyCount + 1);
    setCount((count) => count - buyFee);
    setBakersCount(newBakersCount);
  };

  const onClickUpgrade = (idx: number) => {
    const newBakersMagnification = [...bakersMagnification];
    const beforeMagnification = bakersMagnification[idx];
    newBakersMagnification.splice(idx, 1, beforeMagnification + 1);
    setBakersMagnification(newBakersMagnification);
  };

  useEffect(() => {
    console.log("bakersCount changed");
    let calcCps = 0;
    bakers.forEach((baker, idx) => {
      calcCps += baker.defaultCps * bakersCount[idx] * bakersMagnification[idx];
    });
    setCps(calcCps);
  }, [bakersCount, bakersMagnification]);

  useEffect(() => {
    refCps.current = cps;
  }, [cps]);

  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + refCps.current);
    }, 1000);
  }, []);

  return (
    <div className="App wrapper">
      <div className="cookie-component" onClick={onClickCookie}>
        <img alt="cookie" src="weed.png" className="cookie-img" />
      </div>

      <div className="count-component">
        <p>{`Weed : ${count.toLocaleString()}g`}</p>
        <p>{`Weed Per Second : ${cps.toLocaleString()}g`}</p>
      </div>
      <div className="overflow-y-auto flex flex-row justify-center align-center" style={{'height' : '400px'}}>
      {bakers.map((baker, idx) => {
        return (
          <div key={baker.name} className="baker-component">
            <p>{`${baker.name} ( cost : ${bakersBuyFee(
              idx
            ).toLocaleString()} weed )`}</p>
            <p>{`count : ${bakersCount[idx].toLocaleString()} ${
              bakersMagnification[idx] !== 1
                ? `( x${bakersMagnification[idx]} grow boost )`
                : ""
            }`}</p>
            <div className="button-area">
              <button onClick={() => onClickBuyBaker(idx)}>buy</button>
              <button
                style={{
                  color: "red",
                  borderColor: "red",
                  display:
                    bakersCount[idx] < 30 * bakersMagnification[idx]
                      ? "none"
                      : "block"
                }}
                onClick={() => onClickUpgrade(idx)}
              >
                upgrade
              </button>
            </div>
          </div>
        );
      })}</div>
    </div>
  );
}
