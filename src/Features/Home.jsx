/* eslint-disable react/prop-types */

const Home = ({ history, isLoading, handleClearHistory, setNewGame }) => {
  return (
    <>
      <div className="flex flex-col gap-5 mt-5">
        <button
          onClick={() => setNewGame(true)}
          className="px-4  bg-blue-700 text-white  w-full py-2 rounded-md hover:bg-blue-600"
        >Start New Game</button>

        <div className="w-72 h-96">
          <div className="flex justify-between items-center">
            <h1 className="font-medium text-md">Game History</h1>
            <button
              className="font-bold text-xs text-gray-500"
              onClick={handleClearHistory}
            >Clear All</button>
          </div>

          <div className={`w-72 h-96 flex flex-col bg-gray-200 mt-2 rounded-lg overflow-y-auto`}>
            {isLoading
              ? <div className="flex flex-row m-auto text-center">
                <span className='mr-3 border-t-transparent border-solid animate-spin  rounded-full border-slate-400 border-2 h-6 w-6'></span>
                <p className="font-semibold text-sm">
                  Getting history...</p>
              </div>

              : history.length !== 0
                ? history.map((game, index) => (
                  <div key={index} className="flex flex-col justify-between gap-1 font-semibold p-3 text-xs">
                    <div className="flex justify-between gap-2 text-gray-500">
                      <div className="  ">Round {game.rounds}</div>
                      <div className="">{game.date}</div>
                    </div>
                    <div className="flex justify-between">
                      <h1>{game.player1}</h1>
                      <h1 className={`${game.player1Status === 'WON' ? "text-green-600" : game.player1Status === 'DRAW' ? "text-gray-600" : "text-red-600"} font-bold`}>{game.player1Status}</h1>

                    </div>
                    <div className="flex justify-between">
                      <h1>{game.player2}</h1>
                      <h1 className={`${game.player2Status == 'WON' ? "text-green-600" : game.player1Status === 'DRAW' ? "text-gray-600" : "text-red-600"} font-bold`}>{game.player2Status}</h1>
                    </div>
                  </div>
                ))
                : <div className="flex flex-col m-auto text-center">
                  <p className="font-semibold">Empty</p>
                  <span className="text-xs text-gray-400">Start Playing Game</span>
                </div>
            }
          </div>


        </div>

      </div>

    </>
  )
}

export default Home