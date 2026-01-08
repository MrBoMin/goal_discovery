'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadProgress, clearProgress } from '@/lib/storage';
import { AnalysisResult } from '@/lib/types';

export default function ResultsPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentSituation, setCurrentSituation] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    analyzeResponses();
  }, []);

  const analyzeResponses = async () => {
    try {
      const progress = loadProgress();

      if (!progress || progress.responses.length === 0) {
        setError('No responses found. Please complete the questions first.');
        setIsAnalyzing(false);
        return;
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses: progress.responses }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to analyze responses');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setIsAnalyzing(false);
    } catch (err) {
      console.error('Analysis error:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setIsAnalyzing(false);
    }
  };

  const handleStartOver = () => {
    if (confirm('Start over? This will clear your responses.')) {
      clearProgress();
      router.push('/');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !analysis) return;

    setIsSendingEmail(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          currentSituation,
          analysis,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSent(true);
      setShowEmailForm(false);
    } catch {
      alert('Failed to send email. Please try again.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-12">
            {/* Line art loading animation */}
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 border border-ink-black animate-spin" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-2 border border-ink-faint animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
            </div>
          </div>
          <h2 className="text-xl font-light mb-4">Analyzing</h2>
          <p className="text-body text-sm">
            Processing your responses to uncover insights...
          </p>
          <p className="font-mono text-xs text-ink-light mt-4">10-30 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="border border-ink-black p-8 mb-8">
            <h2 className="text-xl mb-4">Error</h2>
            <p className="text-body text-sm">{error}</p>
          </div>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-ink-faint">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-mono text-xs tracking-widest uppercase">
              Find Your Path
            </Link>
            <button
              onClick={handleStartOver}
              className="font-mono text-xs text-ink-light hover:text-ink-black transition-colors tracking-widest uppercase"
            >
              Start Over
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <span className="font-mono text-xs tracking-widest text-ink-light uppercase">Your Result</span>
            <div className="w-px h-12 bg-ink-black mx-auto my-8"></div>
            <h1 className="heading-display mb-6">
              {analysis.careerArchetype}
            </h1>
            <p className="text-body max-w-xl mx-auto">
              {analysis.archetypeDescription}
            </p>
          </div>

          {/* Key Insights Section */}
          <section className="mb-20 animate-slide-up">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-ink-black"></div>
              <span className="font-mono text-xs tracking-widest text-ink-light uppercase">Insights</span>
            </div>
            
            <div className="space-y-0">
              {analysis.keyInsights.map((insight, index) => (
                <div
                  key={index}
                  className="py-6 border-t border-ink-faint flex gap-6"
                >
                  <span className="font-mono text-xs text-ink-light w-6 flex-shrink-0">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <p className="text-body flex-1">{insight}</p>
                </div>
              ))}
              <div className="border-b border-ink-faint"></div>
            </div>
          </section>

          {/* Blind Spots Section */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-ink-black"></div>
              <span className="font-mono text-xs tracking-widest text-ink-light uppercase">Blind Spots</span>
            </div>
            
            <div className="space-y-4">
              {analysis.blindSpots.map((blindSpot, index) => (
                <div
                  key={index}
                  className="p-6 border border-ink-faint relative"
                >
                  <div className="corner-decoration corner-tl"></div>
                  <div className="corner-decoration corner-br"></div>
                  <p className="text-body">{blindSpot}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Action Plan Section */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-px bg-ink-black"></div>
              <span className="font-mono text-xs tracking-widest text-ink-light uppercase">90-Day Plan</span>
            </div>
            
            <div className="space-y-8">
              {analysis.actionPlan.map((action, index) => (
                <div key={index} className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 border border-ink-black flex items-center justify-center font-mono text-sm">
                      {action.step.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h4 className="text-lg mb-2">{action.title}</h4>
                    <p className="text-body text-sm">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Email Capture CTA */}
          {!emailSent && !showEmailForm && (
            <section className="border border-ink-black p-12 text-center">
              <h3 className="text-xl mb-4">Save Your Results</h3>
              <p className="text-body text-sm mb-8 max-w-md mx-auto">
                Receive a beautifully formatted copy of your analysis via email.
              </p>
              <button
                onClick={() => setShowEmailForm(true)}
                className="btn-primary"
              >
                Get My Report
              </button>
            </section>
          )}

          {/* Email Form */}
          {showEmailForm && !emailSent && (
            <section className="border border-ink-black p-8 md:p-12">
              <h3 className="text-xl mb-8">Get Your Report</h3>
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block font-mono text-xs tracking-widest uppercase text-ink-light mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field text-lg"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block font-mono text-xs tracking-widest uppercase text-ink-light mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field text-lg"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="currentSituation"
                    className="block font-mono text-xs tracking-widest uppercase text-ink-light mb-2"
                  >
                    Current Situation
                  </label>
                  <textarea
                    id="currentSituation"
                    value={currentSituation}
                    onChange={(e) => setCurrentSituation(e.target.value)}
                    className="textarea-field text-lg min-h-[100px]"
                    placeholder="Where are you now..."
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEmailForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingEmail}
                    className="btn-primary flex-1 disabled:opacity-30"
                  >
                    {isSendingEmail ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Email Sent Confirmation */}
          {emailSent && (
            <section className="border border-ink-black p-12 text-center">
              <div className="w-12 h-12 border border-ink-black flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl mb-2">Sent</h3>
              <p className="text-body text-sm">
                Your report has been sent to <span className="text-ink-black">{email}</span>
              </p>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-faint">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Link href="/faq" className="font-mono text-xs text-ink-light hover:text-ink-black transition-colors tracking-widest uppercase">
              Learn More
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
