export default function Stats() {
  const stats = [
    {
      number: "230+",
      label: "Vacation Ownership Resorts",
      description: "Across 80+ destinations worldwide",
    },
    {
      number: "19",
      label: "Vacation Rental Brands",
      description: "Including leading global platforms",
    },
    {
      number: "4M+",
      label: "Members & Customers",
      description: "Creating lifelong memories",
    },
    {
      number: "25K+",
      label: "Associates",
      description: "Dedicated to exceptional service",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 fade-in-up">Our Impact</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto fade-in-up">
            Leading the vacation industry with unmatched scale and expertise
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 
                         rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                         pulse-hover group"
            >
              <div
                className="text-4xl md:text-5xl font-bold text-green-600 mb-4 
                              group-hover:scale-110 transition-transform duration-300"
              >
                {stat.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
