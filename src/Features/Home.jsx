/* eslint-disable react/prop-types */

const Home = ({history, handleClearHistory,setNewGame  }) => {
  return (
    <>
        <div className="flex flex-col gap-5">
          <button 
          onClick={()=> setNewGame(true)}
          className="bg-slate-950 text-gray-100 w-full py-2 rounded-md hover:bg-slate-700"
          >Start New Game</button>


          <div className="w-72 h-96">
            <div className="flex justify-between items-center">
              <h1 className="font-medium text-md">Game History</h1>
              <button
                className="font-bold text-xs text-gray-500"
                onClick={handleClearHistory}
              >Clear History</button>
            </div>

            <div className={`w-72 h-96 flex flex-col bg-gray-200 mt-2 overflow-y-auto`}>
              {history.length
                ? history.map((game, index) => (
                  <div key={index} className="flex flex-col justify-between gap-1 font-semibold p-3 text-xs">
                    <div className="flex justify-between gap-2 text-gray-500">
                      <div className="  ">Round {game.round}</div>
                      <div className="">{game.date}</div>
                    </div>
                    <div className="flex justify-between">
                      <h1>{game.player[0].name1}</h1>
                      <h1 className={`${game.player[0].status !== 'DRAW' ? "text-green-600": "text-gray-600"} font-bold`}>{game.player[0].status}</h1>

                    </div>
                    <div className="flex justify-between">
                      <h1>{game.player[1].name2}</h1>
                      <h1 className={`${game.player[0].status !== 'DRAW' ? "text-red-600": "text-gray-600"} font-bold`}>{game.player[1].status}</h1>
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