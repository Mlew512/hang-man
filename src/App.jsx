import { useState, useEffect } from "react";
import "./App.css";
import hanger from "./assets/hang0.svg";
import hanger1 from "./assets/hang1.svg";
import hanger2 from "./assets/hang2.svg";
import hanger3 from "./assets/hang3.svg";
import hanger4 from "./assets/hang4.svg";
import hanger5 from "./assets/hang5.svg";
import hanger6 from "./assets/hang6.svg";
import Confetti from 'react-confetti';
import dancer from './assets/pirate.gif';
import shanty from './assets/shanty.mp3'

// import words from './assets/word.json'
import axios from "axios";

// let randomNum=Math.floor(Math.random()*words.length +1)
// let hangWord= words[randomNum].toLowerCase()
// console.log(hangWord)

function App() {
  useEffect(() => {
    const getNames = async () => {
      let response = await axios.get(
        `https://random-word-api.herokuapp.com/word`
      );
      setHangWord(response.data[0]);
    };
    getNames();
  }, []);

  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [hangWord, setHangWord] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [lossMessage, setlossMessage] = useState("");
  const [hangmen, setHangmen] = useState(hanger);
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const [seaShanty, setSeaShanty] = useState("#")
  useEffect(() => {
    if (hangWord) {
      setPlaceHolder("_ ".repeat(hangWord.length));
    }
  }, [hangWord]);
  console.log(hangWord);

  const isInWord = (e) => {
    e.preventDefault();
    // console.log(guess)
    if (hangWord.includes(guess.toLowerCase())) {
      let copyOfPlaceholder = placeHolder.split(" ");
      for (let i = 0; i < hangWord.length; i++) {
        if (hangWord[i] === guess) {
          copyOfPlaceholder[i] = guess;
        }
      }
      setPlaceHolder(copyOfPlaceholder.join(" "));
      // console.log('place',copyOfPlaceholder.join(''),'hang',hangWord)
      if(copyOfPlaceholder.join('')==hangWord){
        setlossMessage("You WIN")
        setIsConfettiActive(true)
        setHangmen(dancer)
        setSeaShanty(shanty)
      }
    } else {
      setCount(count + 1);
      if (count == 0) {
        setHangmen(hanger1);
      } else if (count == 1) {
        setHangmen(hanger2);
      } else if (count == 2) {
        setHangmen(hanger3);
      } else if (count == 3) {
        setHangmen(hanger4);
      } else if (count == 4) {
        setHangmen(hanger5);
      } else if (count == 5) {
        setHangmen(hanger6);
      }
      console.log("Nope");
      if (!wrongGuesses.includes(guess + " ")) {
        setWrongGuesses([...wrongGuesses, guess + " "]);
      } else if (count >= 5) {
        setlossMessage("You lose!");
      }
    }
  };
  const reloadPage = (e) => {
    location.reload();
  };

  return (
    <>
      <div id="background"></div>
      <div id="buttonContainer2">
      <button id="reset" onClick={(e) => reloadPage(e)}>
        Reset Game
      </button></div>
      <h1>Hangman</h1>
      <img id="hanger" src={hangmen}></img>
      <h2>{placeHolder}</h2>
      <form onSubmit={(e) => isInWord(e)}>
        <input
          maxLength="1"
          id="guess"
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        ></input>
        <div id="buttonContainer">
          <button>Submit</button>
        </div>
      </form>
      <h2>{count}</h2>
      <h3>{wrongGuesses}</h3>
      <h4>{lossMessage}</h4>
      <audio autoPlay src={seaShanty}></audio>
      {isConfettiActive && <Confetti active={isConfettiActive} />}
    </>
  );
}

export default App;
