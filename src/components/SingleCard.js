import React from 'react'

export default function SingleCard({card , handleChoice, flipped,disabled}) {
  
  function hanldeBackClick(){
    !disabled && handleChoice(card)
  }
    return (
  
         <div className="card" >
            <div className={flipped? 'flipped' : ''}>
              <img className="front" src={card.src} alt="card front"/>
              <img className="back" onClick={hanldeBackClick} src="img/cover.png" alt="card back"/>
            </div>
          </div>
  )
}
