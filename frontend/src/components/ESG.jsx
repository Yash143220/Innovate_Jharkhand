export default function ESG() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 parallax"
        style={{
          backgroundImage: "url(/scenic-mountain-landscape-with-warm-sunset-colors.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 fade-in-up">Our Commitment to ESG</h2>
        <p className="text-xl md:text-2xl mb-12 leading-relaxed fade-in-up opacity-90">
          Building a sustainable future through responsible business practices, environmental stewardship, and positive
          community impact.
        </p>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 
                           rounded-full text-lg font-semibold transition-all duration-300 
                           transform hover:scale-105 shadow-lg"
        >
          Learn More About Our ESG Initiatives
        </button>
      </div>
    </section>
  )
}
