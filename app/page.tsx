import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-6">
          <nav className="flex justify-between items-center">
            <h1 className="text-sm font-mono tracking-widest uppercase">Find Your Path</h1>
            <Link
              href="/faq"
              className="text-sm font-mono tracking-widest uppercase text-ink-light hover:text-ink-black transition-colors"
            >
              FAQ
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Main Hero */}
          <div className="max-w-4xl mx-auto text-center mb-32 animate-fade-in">
            {/* Decorative line */}
            <div className="w-px h-16 bg-ink-black mx-auto mb-12"></div>
            
            <h2 className="heading-display mb-8">
              Discover Your
              <br />
              <span className="italic">True Direction</span>
            </h2>

            <p className="text-body max-w-xl mx-auto mb-12">
              Feeling uncertain about your career path? Through twelve strategic questions, 
              uncover the clarity you&apos;ve been seeking.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/questions/1" className="btn-primary">
                Begin
              </Link>
              <Link href="/faq" className="btn-secondary">
                Learn More
              </Link>
            </div>

            {/* Decorative line */}
            <div className="w-px h-16 bg-ink-black mx-auto mt-12"></div>
          </div>

          {/* Features - Line Art Style */}
          <div className="max-w-5xl mx-auto mb-32">
            <div className="grid md:grid-cols-4 gap-px bg-ink-faint">
              {[
                { num: '01', label: 'Free' },
                { num: '02', label: '12 Questions' },
                { num: '03', label: 'AI Analysis' },
                { num: '04', label: '90-Day Plan' },
              ].map((item) => (
                <div key={item.num} className="bg-white p-8 text-center">
                  <span className="font-mono text-xs text-ink-light">{item.num}</span>
                  <p className="mt-2 text-sm tracking-wide">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="max-w-3xl mx-auto mb-32">
            <div className="text-center mb-16">
              <span className="font-mono text-xs tracking-widest text-ink-light uppercase">Process</span>
              <h3 className="heading-section mt-4">How It Works</h3>
            </div>

            <div className="space-y-0">
              {[
                {
                  step: '01',
                  title: 'Reflect',
                  desc: 'Answer twelve strategic questions designed to surface your true desires and strengths.',
                },
                {
                  step: '02',
                  title: 'Analyze',
                  desc: 'Our AI identifies your career archetype, key insights, and potential blind spots.',
                },
                {
                  step: '03',
                  title: 'Act',
                  desc: 'Receive a personalized 90-day action plan to move toward your ideal direction.',
                },
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="flex items-start gap-8 py-8 border-t border-ink-faint">
                    <span className="font-mono text-xs text-ink-light w-8 flex-shrink-0">{item.step}</span>
                    <div className="flex-1">
                      <h4 className="text-lg mb-2">{item.title}</h4>
                      <p className="text-body text-sm">{item.desc}</p>
                    </div>
                  </div>
                  {index === 2 && <div className="border-b border-ink-faint"></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Three Phases */}
          <div className="max-w-4xl mx-auto mb-32">
            <div className="text-center mb-16">
              <span className="font-mono text-xs tracking-widest text-ink-light uppercase">The Journey</span>
              <h3 className="heading-section mt-4">Three Phases</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  phase: 'I',
                  title: 'Desire',
                  desc: 'Uncover what you truly want without filters or limitations.',
                },
                {
                  phase: 'II',
                  title: 'Strength',
                  desc: 'Identify your natural talents and moments of happiness.',
                },
                {
                  phase: 'III',
                  title: 'Priority',
                  desc: 'Discover what matters most and eliminate distractions.',
                },
              ].map((item) => (
                <div key={item.phase} className="relative p-8 border border-ink-faint group hover:border-ink-black transition-colors">
                  {/* Corner decorations */}
                  <div className="corner-decoration corner-tl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="corner-decoration corner-br opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <span className="font-mono text-xs text-ink-light">Phase {item.phase}</span>
                  <h4 className="text-xl mt-4 mb-3">{item.title}</h4>
                  <p className="text-body text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-px bg-ink-black mx-auto mb-12"></div>
            <p className="text-body mb-8">Ready to find clarity?</p>
            <Link href="/questions/1" className="btn-primary">
              Begin Your Discovery
            </Link>
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
