/* eslint-disable react/prop-types */

const SetupGame = ({ playerNames, setPlayerNames, setNewGame,handlePlayGame }) => {
    return (
        <>
            <div className='flex flex-col gap-3 text-center text-md'>
                <h1 className='font-semibold'> Enter Players Name</h1>
                <input
                    className='py-2 px-3 focus:outline-none rounded-md text-center font-semibold'
                    placeholder='Player 1'
                    onChange={(e)=> setPlayerNames({...playerNames, player1: e.target.value})}
                    value={playerNames.player1}
                />
                <input
                    className='py-2 px-3 focus:outline-none rounded-md text-center font-semibold'
                    placeholder='Player 2'
                    onChange={(e)=> setPlayerNames({...playerNames, player2: e.target.value})}
                    value={playerNames.player2}
                />
                <button
                    className='w-auto hover:bg-slate-800 bg-slate-950 text-gray-100 p-2 rounded-md'
                    onClick={handlePlayGame}
                >
                    Play</button>
                <button
                    onClick={() => setNewGame(false)}
                    className='w-auto hover:bg-blue-800 bg-blue-950 text-gray-100 p-2 rounded-md'
                >
                    Home</button>

            </div>
        </>
    )
}

export default SetupGame