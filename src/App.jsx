import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti';
import { data, getRandomNum } from "./data.js"


function App() {
  const [numbers, setNumbers] = useState(data)
  const [win, setWin]=useState(false)


  useEffect(() => {
    const selectedTiles = numbers.filter(tile => tile.selected)
    const firstValue = selectedTiles[0]?.value
    const allSameValue = selectedTiles.every(tile => tile.value === firstValue)
    if (allSameValue && selectedTiles.length === numbers.length) {
       setWin(prevWin=>!prevWin)
      launchConfetti()
      }
      else {

      }
  }, [numbers])


  function roll() {
    setNumbers(prevNumbers => {
      return prevNumbers.map(function (tile) {
        return tile.selected ? { ...tile, value: tile.value } : { ...tile, value: getRandomNum() }
      })
    })
  }


  function holdDice(tileId) {
    setNumbers(prevNumbers => {
      return prevNumbers.map(function (tile) {
        if (tile.id === tileId) {
          return { ...tile, value: tile.value, selected: !tile.selected }
        }
        else {
          return tile
        }
      })
    })
  }

  function launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

function resetGame(){
  setWin(false)
  setNumbers(prevNumbers=> {
    return prevNumbers.map(tile=> {
      return {...tile, selected:false, value:getRandomNum()}
    })
  })
}

  return <main className="main-container">
    <div className="text-container">
      <h1>Tenzies</h1>
      <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
    </div>
    <div className="numbers-container">
      {numbers.map(tile => {
        return <div onClick={() => holdDice(tile.id)} className={tile.selected ? "tile tile-active" : "tile"}>{tile.value}</div>
      })}

    </div>
    {!win && <button onClick={roll} className="btn">Roll</button>}
    {win && <button onClick={resetGame} className="btn">Reset Game</button>}


  </main>
}
export default App
