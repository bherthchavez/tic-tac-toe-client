/* eslint-disable react/prop-types */

const SetupGame = ({ playerNames, setPlayerNames, handleExitGame, handlePlayGame }) => {

    const handleSetPlayerName = () => {
        if (playerNames.player1 == playerNames.player2 ) {
            setPlayerNames({ ...playerNames, player1: 'Player 1', player2: 'Player 2' })
            
        } else {

            playerNames.player1 === '' && setPlayerNames({ ...playerNames, player1: 'Player 1' })
            playerNames.player2 === '' && setPlayerNames({ ...playerNames, player2: 'Player 2' })
        }
        handlePlayGame()
    }

    return (
        <>
            <div className='flex flex-col gap-3 text-center text-md mt-5'>
                <div>
                    <h1 className='font-semibold'> Enter Players Name</h1>
                </div>
                <input
                    className='py-2 px-3 focus:outline-none rounded-md text-center font-semibold'
                    placeholder='Player 1'
                    onChange={(e) => setPlayerNames({ ...playerNames, player1: e.target.value })}
                    value={playerNames.player1}
                />
                <input
                    className='py-2 px-3 focus:outline-none rounded-md text-center font-semibold'
                    placeholder='Player 2'
                    onChange={(e) => setPlayerNames({ ...playerNames, player2: e.target.value })}
                    value={playerNames.player2}
                />
                <button
                    className={`${Object.values(playerNames).includes('') ? 'bg-gray-500 hover:bg-gray-600' : 'bg-green-500 hover:bg-green-600 '} w-auto  text-gray-100 p-2 rounded-md mt-10`}
                    onClick={handleSetPlayerName}
                >
                    { Object.values(playerNames).includes('')   ? 'Set Default Name' : 'Start Game'}</button>
                <button
                    onClick={handleExitGame}
                    className='w-auto hover:bg-red-100 border border-red-600 text-red-700 p-2 rounded-md'
                >
                    Cancel</button>

            </div>
        </>
    )
}

export default SetupGame