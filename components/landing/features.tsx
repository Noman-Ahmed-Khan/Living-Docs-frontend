import {
  Upload,
  MessageSquare,
  FileSearch,
  Lock,
  Zap,
  Target,
} from 'lucide-react'

const features = [
  {
    icon: Upload,
    title: 'Multi-Format Support',
    description:
      'Upload PDF, DOCX, PPTX, XLSX, Markdown, and more. We handle all your document types.',
    color: 'text-blue-500',
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Interface',
    description:
      'Ask questions in natural language and get instant, accurate answers from your documents.',
    color: 'text-purple-500',
  },
  {
    icon: FileSearch,
    title: 'Smart Citations',
    description:
      'Every answer includes precise citations with page numbers and character positions.',
    color: 'text-green-500',
  },
  {
    icon: Target,
    title: 'RAG Technology',
    description:
      'Advanced Retrieval-Augmented Generation ensures accurate, contextual responses.',
    color: 'text-orange-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Get answers in seconds with our optimized vector search and LLM processing.',
    color: 'text-yellow-500',
  },
  {
    icon: Lock,
    title: 'Secure & Private',
    description:
      'Your documents are encrypted and stored securely. Only you have access to your data.',
    color: 'text-red-500',
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Powerful features to help you get the most out of your documents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card bg-base-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className={`w-12 h-12 rounded-lg bg-base-300 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                <p className="text-base-content/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}