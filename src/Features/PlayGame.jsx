/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */


import { useEffect, useState } from 'react';
import x from '../assets/x.png';
import o from '../assets/o.png';


const PlayGame = ({ playerNames, sessionGame, setSessionGame, setHistory, history, resetGame }) => {

    const [board, setBoard] = useState(Array(9).fill(''));
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState(null);
    const [rounds, setRounds] = useState(1)
    const [playerScore, setPlayerScore] = useState({
        player1: 0,
        player2: 0
    })

    const getDate = () => {
        return (new Date().toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }))
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];




    const checkWinner = (newBoard) => {

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {

                setWinner(newBoard[a] === 'X' ? playerNames.player1 : playerNames.player2);
                setPlayerScore(newBoard[a] === 'X' ? { ...playerScore, player1: playerScore.player1 + 1 } : { ...playerScore, player2: playerScore.player2 + 1 })
                setSessionGame(
                    {
                        round: rounds,
                        player: [
                            {
                                name1: playerNames.player1,
                                status: newBoard[a] === 'X' ? 'WON' : 'LOST'
                            },
                            {
                                name2: playerNames.player2,
                                status: newBoard[a] === 'O' ? 'WON' : 'LOST'
                            }
                        ],
                        date: getDate()
                    }
                )
                return;
            }
        }

        if (!newBoard.includes('')) {
            setWinner('Draw');
            setSessionGame(
                {
                    round: rounds,
                    player: [
                        {
                            name1: playerNames.player1,
                            status: 'DRAW'
                        },
                        {
                            name2: playerNames.player2,
                            status: 'DRAW'
                        }
                    ],
                    date: getDate()
                }
            )
        }

    }

    const handleCellClick = (index) => {
        if (!winner && board[index] === '') {
            const newBoard = [...board];
            newBoard[index] = player;
            setBoard(newBoard);
            setPlayer(player === 'X' ? 'O' : 'X');
            checkWinner(newBoard);
        }
    };

    const handlePlayAgain = () => {
        setBoard(Array(9).fill(''));
        setWinner(null);
        setPlayer('X');
        setRounds(rounds + 1)
        setHistory([...history, sessionGame])
    };



    return (
        <>
            <div className='flex flex-col items-center text-center'>
                {winner
                    ? <div className="">
                        {winner === 'Draw' ? (
                            <p>It's a draw!</p>
                        ) : (
                            <p>{`Player ${winner} wins!`}</p>
                        )}
                        <div className='flex gap-2'>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                                onClick={handlePlayAgain}
                            >
                                Continue
                            </button>
                            <button
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                                onClick={resetGame}
                            >
                                Stop
                            </button>
                        </div>
                    </div>
                    : <>

                        <p className='text-xl font-bold'>{player === 'X' ? playerNames.player1 + ' turn' : playerNames.player2 + ' turn'}</p>
                        <p className='text-gray-400 font-semibold text-sm'>Select box</p>
                    </>
                }
            </div>
            <div className="grid grid-cols-3  gap-2 mt-5 ">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        className={`${cell === `X` ? `bg-red-200 border-0` : cell === `O` ? `bg-blue-200 border-0` : ` bg-gray-200`}  border-slate-300 gap-2   w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center text-4xl sm:text-5xl cursor-pointer text-gray-950`}
                        onClick={() => handleCellClick(index)}
                        value={cell}
                    >
                        {/* {cell } */}
                        {cell === 'X'
                            ? <img className='w-16 h-16 mx-0' src={x} alt="firebase icon" />
                            : cell === 'O'
                                ? <img className='w-16 h-16 mx-0' src={o} alt="firebase icon" />
                                : null
                        }
                    </button>
                ))}
            </div>

            <div className='flex justify-between mt-10 gap-28 text-center font-bold'>
                <div className=''>
                    <p className='text-gray-500'>{playerNames.player1}</p>
                    <p className='text-3xl'>{playerScore.player1}</p>
                </div>
                <div>
                    <p className='text-gray-500'>{playerNames.player2}</p>
                    <p className='text-3xl'>{playerScore.player2}</p>
                </div>
            </div>
        </>
    )
}

export default PlayGame