import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];
function shuffle(array) {
  const shuffledCards = [...array, ...array]
    //Math.random selects a random number between 1 and 0 then minus -.5 from the result
    //if the
    .sort(function compare() {
      return Math.random() - 0.5;
    })
    .map((card) => ({ ...card, id: Math.random() }));
  return shuffledCards;
}
function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [oneChoice, setOneChoice] = useState(null);
  const [twoChoice, setTwoChoice] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const shuffleCards = () => {
    const shuffledCards = shuffle(cardImages);
    console.log([...cardImages, ...cardImages]);
    setOneChoice(null);
    setTwoChoice(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  function handleChoice(card) {
    oneChoice ? setTwoChoice(card) : setOneChoice(card);
  }
  useEffect(() => {
    if (oneChoice && twoChoice) {
      const { src: one } = oneChoice;
      const { src: two } = twoChoice;
      setIsDisabled(true);
      if (one === two) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            const { src: cardSrc } = card;
            if (cardSrc === one) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        setTimeout(() => {
          resetTurns();
        }, 1000);
      } else {
        console.log("those cards dont match");

        setTimeout(() => {
          resetTurns();
        }, 1000);
      }
      oneChoice && console.log(one);
      twoChoice && console.log(two);
    } else {
    }
  }, [twoChoice]);
  console.log(cards);
  const resetTurns = () => {
    setOneChoice(null);
    setTwoChoice(null);
    setTurns((prevCounter) => prevCounter + 1);
    setIsDisabled(false);
  };
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={() => shuffleCards()}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === oneChoice || card === twoChoice || card.matched}
            disabled={isDisabled}
          />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
