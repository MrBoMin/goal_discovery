import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-peaceful-lightBlue to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-peaceful-blue">Find Your Path</h1>
          <Link
            href="/faq"
            className="text-peaceful-darkGray hover:text-peaceful-blue transition-colors"
          >
            FAQ
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-peaceful-darkGray mb-6 leading-tight">
            Discover Your True
            <span className="block text-peaceful-blue mt-2">Career Direction</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Feeling stuck or unclear about your career goals?
          </p>

          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Through 12 strategic self-reflection questions inspired by &quot;Master Your Focus&quot;,
            we&apos;ll help you gain clarity on your strengths, desires, and the career path
            that truly aligns with who you are.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              href="/questions/1"
              className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Your Journey
            </Link>
            <Link
              href="/faq"
              className="btn-secondary text-lg px-8 py-4"
            >
              Learn More
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-peaceful-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Free</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-peaceful-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>12 Strategic Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-peaceful-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-peaceful-blue" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>90-Day Action Plan</span>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-5xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-center text-peaceful-darkGray mb-12">
            How It Works
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="card text-center animate-slide-up">
              <div className="w-12 h-12 bg-peaceful-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="text-xl font-semibold text-peaceful-darkGray mb-3">
                Reflect Deeply
              </h4>
              <p className="text-gray-600">
                Answer 12 strategic questions designed to uncover your true desires,
                strengths, and priorities.
              </p>
            </div>

            {/* Step 2 */}
            <div className="card text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-peaceful-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="text-xl font-semibold text-peaceful-darkGray mb-3">
                Get AI Analysis
              </h4>
              <p className="text-gray-600">
                Our AI analyzes your responses to identify your career archetype,
                key insights, and blind spots.
              </p>
            </div>

            {/* Step 3 */}
            <div className="card text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-peaceful-blue text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="text-xl font-semibold text-peaceful-darkGray mb-3">
                Take Action
              </h4>
              <p className="text-gray-600">
                Receive a personalized 90-day action plan to move toward your
                ideal career direction.
              </p>
            </div>
          </div>
        </div>

        {/* Three Phases */}
        <div className="max-w-4xl mx-auto mt-20">
          <h3 className="text-3xl font-bold text-center text-peaceful-darkGray mb-12">
            Three Phases of Discovery
          </h3>

          <div className="space-y-6">
            <div className="card hover:shadow-md transition-shadow">
              <h4 className="text-xl font-semibold text-peaceful-blue mb-2">
                Phase 1: Desire Clarity
              </h4>
              <p className="text-gray-600">
                Uncover what you truly want without filters or limitations.
                Define your ideal future and singular focus.
              </p>
            </div>

            <div className="card hover:shadow-md transition-shadow">
              <h4 className="text-xl font-semibold text-peaceful-blue mb-2">
                Phase 2: Strength Discovery
              </h4>
              <p className="text-gray-600">
                Identify your natural talents, moments of happiness, and unfulfilled
                desires revealed through envy.
              </p>
            </div>

            <div className="card hover:shadow-md transition-shadow">
              <h4 className="text-xl font-semibold text-peaceful-blue mb-2">
                Phase 3: Leverage & Priority
              </h4>
              <p className="text-gray-600">
                Discover what truly matters, eliminate distractions, and identify
                the one thing that will make the biggest impact.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <p className="text-xl text-gray-600 mb-6">
            Ready to find clarity?
          </p>
          <Link
            href="/questions/1"
            className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
          >
            Begin Your Discovery
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          <p>Inspired by principles from &quot;Master Your Focus&quot;</p>
          <p className="mt-2">© 2024 Find Your Path. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
