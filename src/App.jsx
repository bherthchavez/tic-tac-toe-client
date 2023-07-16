/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import PlayGame from "./Features/PlayGame"
import Home from "./Features/Home"
import SetupGame from "./Features/SetupGame"
import useApi from "./hooks/useAPI"

function App() {

  const [history, setHistory] = useState([])
  const [refetchTrigger, setRefetchTrigger] = useState(false);


  const { isLoading, error, clearHistory, getHistory } = useApi();


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await getHistory()
        setHistory(result)
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    fetchHistory();
  }, [refetchTrigger])


  const [newGame, setNewGame] = useState(false)
  const [playGame, setplayGame] = useState(false)
  const [sessionGame, setSessionGame] = useState({
    rounds: 1,
    player1: '',
    player1Status: '',
    player2: '',
    player2Status: '',
    date: ''
  })
  const [playerNames, setPlayerNames] = useState({ player1: '', player2: '' })

  const handleClearHistory = async () => {
    try {
      await clearHistory()
      setRefetchTrigger(prev => !prev)
    } catch (error) {
      console.log('Error clearing history:', error);
    }
  }

  const handlePlayGame = () => {
    if (playerNames.player1.toUpperCase() !== playerNames.player2.toUpperCase())
      setNewGame(false)
    setplayGame(true)
    setSessionGame({
      rounds: 1,
      player1: '',
      player1Status: '',
      player2: '',
      player2Status: '',
      date: ''
    })
  }

  const handleExitGame = () => {
    setplayGame(false)
    setNewGame(false)
    setRefetchTrigger(prev => !prev)
    setPlayerNames({ player1: '', player2: '' })
  }

  return (
    <>
      <div className="flex flex-col items-center pt-8 h-screen bg-slate-100 text-gray-900">
        <h1 className="text-3xl font-bold mb-7">Tic Tac Toe</h1>
        {error
          ? <>
            <p className="text-red-600 font-bold text-xl">{error}</p>
            <p className="text-gray-950">Check the API</p>
          </>
          : newGame
            ? <SetupGame
              playerNames={playerNames}
              setPlayerNames={setPlayerNames}
              handleExitGame={handleExitGame}
              handlePlayGame={handlePlayGame}
            />
            : playGame
              ? <PlayGame
                playerNames={playerNames}
                sessionGame={sessionGame}
                setSessionGame={setSessionGame}
                history={history}
                handleExitGame={handleExitGame}
              />
              : <Home
                history={history}
                handleClearHistory={handleClearHistory}
                setNewGame={setNewGame}
                isLoading={isLoading}
                error={error}
              />
        }
      </div>
    </>
  )
}

export default App
