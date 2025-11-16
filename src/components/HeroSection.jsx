import React from 'react'

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-black pt-20">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4 inter-font">
          Welcome to Sush's Galleria
        </h1>
        <p className="text-xl text-white mb-8 inter-font">
          Discover amazing art and creativity
        </p>
        <button className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors inter-font">
          Explore Now
        </button>
      </div>
    </section>
  )
}

export default HeroSection
