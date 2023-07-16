/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */


import { useState } from 'react';
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
        return new Date().toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })
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

                setWinner(newBoard[a]);
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



            <div className='mt-10'>
                <div className='flex justify-between flex-row font-bold pb-2 text-green-500'>
                    <div className=''>
                        {winner && winner !== 'Draw' && winner === `X`
                            ?
                            <p>You Wins!</p>
                            : !winner && player === `X`
                                ? <p className='text-red-800'>Your Turn</p>

                                : winner === 'Draw' && <p className='text-orange-600'>It's a draw!</p>
                        }

                    </div>
                    <div>
                        {winner && winner !== 'Draw' && winner === `O`
                            ?
                            <p>You Wins!</p>
                            : !winner && player === `O`
                                ? <p className='text-blue-800'>Your Turn</p>

                                : winner === 'Draw' && <p className='text-orange-600'>It's a draw!</p>}
                    </div>

                </div>
                <div className='flex justify-between text-center font-bold text-xs'>
                    <div className={` ${winner && winner !== `X` ? `bg-gray-200` : winner && winner === 'X' ? 'bg-green-200' : player === 'X' ? `bg-red-100` : `bg-gray-200`} flex gap-2 items-center p-2 rounded-lg`}>
                        <div className='flex flex-col  items-center'>
                            <img className={`${winner && winner !== 'X' ? `grayscale` : winner && winner === 'X' ? '' : player !== 'X' && 'grayscale'}w-5 h-5 sm:w-9 sm:h-9`} src={x} alt="icon" />
                        </div>

                        <div className='w-14 sm:w-20'>
                            <p className='text-gray-500'>{playerNames.player1}</p>
                            <p className='text-2xl'>{playerScore.player1}</p>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center p-2 bg-gray-100 rounded-full'>
                        <p className='text-gray-500'>Round {rounds}</p>
                        <p className='text-gray-500'>VS</p>
                    </div>


                    <div className={`${winner && winner !== `O` ? `bg-gray-200` : winner && winner === 'O' ? `bg-green-200` : player === 'O' ? `bg-blue-100` : `bg-gray-200`} flex gap-2 items-center p-2 rounded-lg`}>
                        <div className='flex flex-col  items-center'>

                            <img className={`${winner && winner !== `O` ? `grayscale` : winner && winner === 'O' ? '' : player !== `O` && 'grayscale'} w-5 h-5 sm:w-9 sm:h-9 `} src={o} alt="x" />
                        </div>


                        <div className='w-14 sm:w-20'>
                            <p className='text-gray-500 '>{playerNames.player2}</p>
                            <p className='text-2xl'>{playerScore.player2}</p>
                        </div>
                    </div>
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
                                ? <img className='w-10 h-10 sm:w-16 sm:h-16 ' src={x} alt="O" />
                                : cell === 'O'
                                    ? <img className='w-10 h-10 sm:w-16 sm:h-16 ' src={o} alt="O" />
                                    : null
                            }
                        </button>
                    ))}
                </div>

            </div>
            <div className='flex flex-col items-center text-center'>
                {winner
                    && <div className="">

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

                }
            </div>

        </>
    )
}

export default PlayGame