import { useState } from "react"
import PlayGame from "./Features/PlayGame"
import Home from "./Features/Home"
import SetupGame from "./Features/SetupGame"


function App() {

  const [newGame, setNewGame] = useState(false)
  const [playGame, setplayGame] = useState(false)
  const [sessionGame, setSessionGame] = useState({
    round: 1,
    player: [
      {
        name1: '',
        status: ''
      },
      {
        name2: '',
        status: ''
      }
    ],
    date: ''
  })
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' })

  const [history, setHistory] = useState([])

  const handleClearHistory = () => {
    setHistory([])
  }

  const handlePlayGame = () => {

   
    if (playerNames.player1.toUpperCase() !== playerNames.player2.toUpperCase())
      
    setNewGame(false)
    setplayGame(true)

    setSessionGame({
      round: 1,
      player: [
        {
          name1: playerNames.player1,
          status: ''
        },
        {
          name2: playerNames.player2,
          status: ''
        }
      ],
      date: ''
    })
  }

  const resetGame = () => {
    setplayGame(prev => !prev)
    setHistory([...history, sessionGame])
    setPlayerNames({ player1: '', player2: '' })

  }


  const handleExit = () => {
    setplayGame(prev => !prev)

  }

  return (
    <>
      <div className="flex flex-col items-center pt-8 h-screen bg-slate-100 text-gray-900">
        <h1 className="text-3xl font-bold mb-7">Tic Tac Toe</h1>

        {newGame
          ? <SetupGame
            playerNames={playerNames}
            setPlayerNames={setPlayerNames}
            setNewGame={setNewGame}
            handlePlayGame={handlePlayGame}
          />
          : playGame && !newGame
            ? <PlayGame
              playerNames={playerNames}
              sessionGame={sessionGame}
              setSessionGame={setSessionGame}
              history={history}
              setHistory={setHistory}
              resetGame={resetGame}
              handleExit={handleExit}
            />
            : <Home
              history={history}
              handleClearHistory={handleClearHistory}
              setHistory={setHistory}
              setNewGame={setNewGame}
            />
        }



      </div>
    </>
  )
}

export default App
