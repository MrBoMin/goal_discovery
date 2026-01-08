import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is Find Your Path?',
      answer:
        'A free career clarity tool that helps people who feel stuck or unclear about their career direction. Through 12 strategic self-reflection questions, discover your strengths, values, and the career path that truly aligns with who you are.',
    },
    {
      question: 'How does it work?',
      answer:
        'Answer 12 carefully designed questions across three phases: Desire Clarity, Strength Discovery, and Leverage & Priority. Our AI then analyzes your responses to identify your career archetype, key insights, blind spots, and provides a personalized 90-day action plan.',
    },
    {
      question: 'How long does it take?',
      answer:
        'Most people spend 20-40 minutes thoughtfully answering the questions. The more honest and detailed your responses, the better your personalized analysis will be. The AI analysis takes 10-30 seconds after you complete all questions.',
    },
    {
      question: 'Is it really free?',
      answer:
        'Yes. We believe everyone deserves clarity in their career direction. You can optionally provide your email to receive a copy of your results, but even that is free with no strings attached.',
    },
    {
      question: 'What are the career archetypes?',
      answer:
        'We identify six primary archetypes: Knowledge Entrepreneur, Creative Builder, Strategic Operator, Technical Specialist, Impact Leader, and Lifestyle Freelancer. Each represents a distinct career direction aligned with different values and strengths.',
    },
    {
      question: 'Can I save my progress?',
      answer:
        'Yes. Your responses are automatically saved in your browser as you go. You can close the page and return later to continue where you left off.',
    },
    {
      question: 'Is my data private?',
      answer:
        'Yes. Your responses are stored locally in your browser and are only sent to our servers when you request an AI analysis. We never share or sell your data.',
    },
    {
      question: 'What powers the analysis?',
      answer:
        'We use GPT-4 Turbo to analyze your responses. It understands nuanced human needs and provides thoughtful, personalized insights based on patterns in your answers.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-ink-faint">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="font-mono text-xs tracking-widest uppercase">
              Find Your Path
            </Link>
            <Link
              href="/"
              className="font-mono text-xs tracking-widest uppercase text-ink-light hover:text-ink-black transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <span className="font-mono text-xs tracking-widest text-ink-light uppercase">Information</span>
            <div className="w-px h-12 bg-ink-black mx-auto my-8"></div>
            <h1 className="heading-display text-4xl md:text-5xl">
              Questions
            </h1>
          </div>

          {/* FAQ Items */}
          <div className="mb-20">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="py-8 border-t border-ink-faint animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex gap-6">
                  <span className="font-mono text-xs text-ink-light w-6 flex-shrink-0">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg mb-3">{faq.question}</h3>
                    <p className="text-body text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-b border-ink-faint"></div>
          </div>

          {/* CTA Section */}
          <div className="border border-ink-black p-12 text-center">
            <h3 className="text-xl mb-4">Ready to Begin?</h3>
            <p className="text-body text-sm mb-8">
              Start your journey to clarity in just 20 minutes
            </p>
            <Link href="/questions/1" className="btn-primary">
              Begin Discovery
            </Link>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-16">
            <p className="text-body text-sm">
              Still have questions?{' '}
              <a
                href="mailto:support@findyourpath.com"
                className="text-ink-black hover:underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-faint">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ink-light font-mono">
            <p>Inspired by &quot;Master Your Focus&quot;</p>
            <p>© 2024</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
