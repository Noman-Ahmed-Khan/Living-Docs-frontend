import { Upload, Cpu, MessageSquare, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Documents',
    description: 'Drag and drop your files or upload them in bulk. Supports all major formats.',
    step: 1,
  },
  {
    icon: Cpu,
    title: 'AI Processing',
    description: 'Our AI analyzes and indexes your documents for intelligent search.',
    step: 2,
  },
  {
    icon: MessageSquare,
    title: 'Ask Questions',
    description: 'Chat naturally with your documents and get instant, accurate answers.',
    step: 3,
  },
  {
    icon: CheckCircle,
    title: 'Get Insights',
    description: 'Receive detailed answers with citations and source references.',
    step: 4,
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.title} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-20"></div>
              )}

              <div className="relative">
                <div className="flex flex-col items-center text-center">
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 relative z-10">
                    <span className="text-2xl font-bold text-primary-content">
                      {step.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-base-100 flex items-center justify-center mb-4 shadow-lg">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-base-content/70">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}