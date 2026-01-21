'use client'

export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Upload Documents',
      description: 'Upload your PDFs, Word docs, PowerPoint slides, or text files directly to your secure project space.',
    },
    {
      number: '02',
      title: 'AI Processing',
      description: 'Our system automatically analyzes, chunks, and indexes your content to create a semantic knowledge base.',
    },
    {
      number: '03',
      title: 'Ask Questions',
      description: 'Chat naturally with your docs. Ask specific questions, request summaries, or find key data points.',
    },
    {
      number: '04',
      title: 'Get Answers',
      description: 'Receive instant, accurate answers complete with citations pointing exactly to the source text.',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-base-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-display font-bold mb-4">
            How it <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-base-content/70 font-light">
            Turn your static documents into an interactive knowledge engine in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector Line (Desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[2px] bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}

              <div
                className="glass-card p-6 rounded-2xl relative z-10 h-full hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl gradient-secondary flex items-center justify-center text-2xl font-bold text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3 font-display">{step.title}</h3>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}