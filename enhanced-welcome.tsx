const EnhancedWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg text-gray-700 mb-8">This is an enhanced welcome message.</p>

      <div className="animate-pulse text-2xl text-blue-500">Loading...</div>

      <div className="mt-8">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded duration-[3s]">
          Get Started
        </button>
      </div>

      <div className="mt-4">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded duration-[4s]">
          Cancel
        </button>
      </div>

      <div className="mt-4">
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded duration-[5s]">
          Continue
        </button>
      </div>

      <div className="mt-4">
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded duration-[6s]">
          Submit
        </button>
      </div>
    </div>
  )
}

export default EnhancedWelcome
