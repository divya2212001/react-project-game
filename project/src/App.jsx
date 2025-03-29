import React, { useState } from "react";
import "./App.css";

const sizeGrid=10; 
const snakes={96:77,64:39,24:4}; 
const ladders={3:23,37:55,69:91}; 
const winPosition=99; 

const App = () => {
  const [position,setPosition]=useState(0);
  const [dice,setDice]=useState(1);

  const rollDice = () => {
    const newDice=Math.floor(Math.random()*6)+1;
    setDice(newDice);
    let newPosition=Math.min(position+newDice,winPosition);
    
    if (snakes[newPosition]) {
      newPosition=snakes[newPosition];
    } 
    else if (ladders[newPosition]) {
      newPosition=ladders[newPosition];
    }
    
    setPosition(newPosition);
    
    if (newPosition === winPosition) {
      setTimeout(() => {
        alert("Congratulations! You won! 😊🚀");
        setPosition(0); // Reset game after winning
      }, 100);
    }
  };

  return (
    <div className="container">
      <h1 style={{ color: "white" }}>Dice and Grid Game</h1>
      <div className="grid">
        {[...Array(sizeGrid * sizeGrid)].map((x, index) => (
          <div
            key={index}
            className={`cell ${index === position ? "active" : ""} 
              ${snakes[index] ? "keySnake" : ""} 
              ${Object.values(snakes).includes(index) ? "valueSnake" : ""} 
              ${ladders[index] ? "keyladder" : ""} 
              ${Object.values(ladders).includes(index) ? "valueladder" : ""}`}
          >
            {index === 0 ? "Start" : index === winPosition ? "End" : index + 1}
          </div>
        ))}
      </div>
      <p onClick={rollDice}>🎲 </p>
      <button>Dice: {dice}</button>
      <button>Position: {position + 1}</button>
    </div>
  );
};

export default App;