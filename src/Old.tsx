import ReactDOM from 'react-dom'
import './App.css';
import { Canvas } from '@react-three/fiber'
import Cookie from './Cookie';
import { useState, useEffect } from 'react';
import useInterval from 'usehooks-ts/dist/esm/useInterval/useInterval';
import Score from './Score';

export default function App() {
  let [cookiesClicked, setCookiesClicked] = useState(0);
  let [autosaveOn, setAutosave] = useState(true);

  const [gameSaveState, saveGame] = useState({
    totalCookiesClicked: 0
  });

  useEffect(() => {
    console.log("Saving to local storage", gameSaveState);
    localStorage.setItem('cookieClicked', JSON.stringify(gameSaveState));
  }, [gameSaveState]);

  useEffect(() => {
    const savedGame = localStorage.getItem('cookieClicked');
    console.log(savedGame);
  }, []);

  useInterval(() => {
      console.log("Saving", cookiesClicked)
      saveGame({
        totalCookiesClicked: cookiesClicked
      });
  }, autosaveOn ? 10 : null);



  return (
    <div style={{ width: "100vw", height: "100vh" }}>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))