import Link from 'next/link';

export default function FAQPage() {
  const faqs = [
    {
      question: 'What is Find Your Path?',
      answer:
        'Find Your Path is a free career clarity tool that helps people who feel stuck or unclear about their career direction. Through 12 strategic self-reflection questions inspired by the book "Master Your Focus," we help you discover your strengths, values, and the career path that truly aligns with who you are.',
    },
    {
      question: 'How does it work?',
      answer:
        "You'll answer 12 carefully designed questions across three phases: Desire Clarity, Strength Discovery, and Leverage & Priority. Our AI then analyzes your responses to identify your career archetype, key insights, blind spots, and provides a personalized 90-day action plan.",
    },
    {
      question: 'How long does it take?',
      answer:
        'Most people spend 20-40 minutes thoughtfully answering the questions. The more honest and detailed your responses, the better your personalized analysis will be. The AI analysis takes 10-30 seconds after you complete all questions.',
    },
    {
      question: 'Is it really free?',
      answer:
        'Yes! Find Your Path is 100% free to use. We believe everyone deserves clarity in their career direction. You can optionally provide your email to receive a PDF version of your results, but even that is free with no strings attached.',
    },
    {
      question: 'What are the career archetypes?',
      answer:
        'We identify six primary career archetypes: Knowledge Entrepreneur (consultant, coach, advisor), Creative Builder (designer, maker, artist), Strategic Operator (business owner, manager, CEO), Technical Specialist (engineer, analyst, scientist), Impact Leader (educator, nonprofit, social impact), and Lifestyle Freelancer (digital nomad, solopreneur).',
    },
    {
      question: 'Can I save my progress and come back later?',
      answer:
        'Yes! Your responses are automatically saved in your browser as you go. You can close the page and return later to continue where you left off. However, if you clear your browser data or use a different device, your progress will be lost.',
    },
    {
      question: 'What if I want to start over?',
      answer:
        'You can start over at any time by clicking the "Start Over" button on your results page. This will clear all your previous responses, allowing you to retake the assessment with fresh perspective.',
    },
    {
      question: 'Is my data private?',
      answer:
        "Yes. Your responses are stored locally in your browser and are only sent to our servers when you request an AI analysis. If you choose to receive a PDF report via email, we'll store your email address and analysis results, but we never share or sell your data.",
    },
    {
      question: 'What is "Master Your Focus"?',
      answer:
        '"Master Your Focus" is a book by Thibaut Meurisse that provides frameworks for gaining clarity, eliminating distractions, and focusing on what truly matters in life and career. Our questions are inspired by the self-reflection exercises in this book.',
    },
    {
      question: 'Can I skip questions?',
      answer:
        'Yes, you can skip any question, but we strongly encourage answering all of them. The more complete and thoughtful your responses, the more accurate and valuable your personalized analysis will be.',
    },
    {
      question: 'What technology powers the analysis?',
      answer:
        'We use OpenAI GPT (specifically GPT-4 Turbo) to analyze your responses. GPT-4 is a state-of-the-art AI model trained to understand nuanced human needs and provide thoughtful, personalized insights.',
    },
    {
      question: 'Will I receive follow-up emails?',
      answer:
        "If you provide your email to receive the PDF report, you'll get your results immediately. We may occasionally send helpful career clarity resources and tips, but you can unsubscribe at any time. We respect your inbox!",
    },
    {
      question: "What if my results don't feel accurate?",
      answer:
        "Career clarity is a journey, not a destination. If your results don't resonate, consider: 1) Retaking the assessment with more honest, detailed answers, 2) Trying again after some time for personal reflection, or 3) Using the results as a starting point for deeper self-exploration. The AI provides insights based on patterns in your responses, but you know yourself best.",
    },
    {
      question: 'Can I share my results?',
      answer:
        "Absolutely! While we don't currently have built-in sharing features, you can take screenshots of your results or forward the PDF report to friends, mentors, or career coaches for additional perspectives.",
    },
  ];

  return (
    <div className="min-h-screen bg-peaceful-gray">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-peaceful-blue">
              Find Your Path
            </Link>
            <Link
              href="/"
              className="text-peaceful-darkGray hover:text-peaceful-blue transition-colors"
            >
              Home
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-peaceful-darkGray mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Everything you need to know about Find Your Path
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-6 mb-12">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card hover:shadow-md transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="text-xl font-semibold text-peaceful-darkGray mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="card bg-gradient-to-br from-peaceful-blue to-primary-600 text-white text-center py-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Find Your Path?</h3>
            <p className="text-lg mb-6 opacity-90">
              Start your journey to career clarity in just 20 minutes
            </p>
            <Link
              href="/questions/1"
              className="bg-white text-peaceful-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all inline-block"
            >
              Begin Your Discovery
            </Link>
          </div>

          {/* Contact Section */}
          <div className="text-center mt-12">
            <p className="text-gray-600">
              Still have questions?{' '}
              <a
                href="mailto:support@findyourpath.com"
                className="text-peaceful-blue hover:underline"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          <p>Inspired by principles from &quot;Master Your Focus&quot; by Thibaut Meurisse</p>
          <p className="mt-2">© 2024 Find Your Path. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
