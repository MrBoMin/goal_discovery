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
    if (confirm('Are you sure you want to start over? This will clear your current responses.')) {
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
      <div className="min-h-screen bg-peaceful-gray flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-peaceful-blue mx-auto"></div>
          </div>
          <h2 className="text-2xl font-bold text-peaceful-darkGray mb-4">
            Analyzing Your Responses...
          </h2>
          <p className="text-gray-600 mb-4">
            Our AI is carefully reviewing your answers to provide personalized insights.
          </p>
          <p className="text-sm text-gray-500">This usually takes 10-30 seconds</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-peaceful-gray flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">Analysis Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="min-h-screen bg-peaceful-gray">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold text-peaceful-blue">
              Find Your Path
            </Link>
            <button
              onClick={handleStartOver}
              className="text-sm text-gray-600 hover:text-peaceful-blue transition-colors"
            >
              Start Over
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-peaceful-darkGray mb-4">
              Your Career Path:
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-peaceful-blue mb-6">
              {analysis.careerArchetype}
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              {analysis.archetypeDescription}
            </p>
          </div>

          {/* Key Insights Section */}
          <section className="mb-12 animate-slide-up">
            <h3 className="text-2xl font-bold text-peaceful-darkGray mb-6">
              Key Insights About You
            </h3>
            <div className="space-y-4">
              {analysis.keyInsights.map((insight, index) => (
                <div
                  key={index}
                  className="card hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-peaceful-blue bg-opacity-10 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-peaceful-blue"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 flex-1">{insight}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Blind Spots Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-peaceful-darkGray mb-6">
              Your Blind Spots
            </h3>
            <div className="space-y-4">
              {analysis.blindSpots.map((blindSpot, index) => (
                <div
                  key={index}
                  className="card bg-orange-50 border-orange-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-5 h-5 text-orange-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 flex-1">{blindSpot}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Action Plan Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-peaceful-darkGray mb-6">
              Your 90-Day Action Plan
            </h3>
            <div className="space-y-6">
              {analysis.actionPlan.map((action, index) => (
                <div key={index} className="card hover:shadow-md transition-shadow">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-peaceful-blue text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {action.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-peaceful-darkGray mb-2">
                        {action.title}
                      </h4>
                      <p className="text-gray-700">{action.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Email Capture CTA */}
          {!emailSent && !showEmailForm && (
            <section className="card bg-gradient-to-br from-peaceful-blue to-primary-600 text-white text-center py-12">
              <h3 className="text-2xl font-bold mb-4">Want Your Full PDF Report?</h3>
              <p className="text-lg mb-6 opacity-90">
                Get a beautifully formatted PDF of your results plus weekly clarity emails
                to support your journey.
              </p>
              <button
                onClick={() => setShowEmailForm(true)}
                className="bg-white text-peaceful-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all"
              >
                Get My Free PDF Report
              </button>
            </section>
          )}

          {/* Email Form */}
          {showEmailForm && !emailSent && (
            <section className="card">
              <h3 className="text-2xl font-bold text-peaceful-darkGray mb-6">
                Get Your Full Report
              </h3>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input-field"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="currentSituation"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current Situation (Optional)
                  </label>
                  <textarea
                    id="currentSituation"
                    value={currentSituation}
                    onChange={(e) => setCurrentSituation(e.target.value)}
                    className="textarea-field"
                    rows={3}
                    placeholder="Tell us a bit about where you are now..."
                  />
                </div>
                <div className="flex gap-4">
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
                    className="btn-primary flex-1 disabled:opacity-50"
                  >
                    {isSendingEmail ? 'Sending...' : 'Send My Report'}
                  </button>
                </div>
              </form>
            </section>
          )}

          {/* Email Sent Confirmation */}
          {emailSent && (
            <section className="card bg-green-50 border-green-200 text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-2">Check Your Email!</h3>
              <p className="text-green-700">
                We&apos;ve sent your full PDF report to <strong>{email}</strong>
              </p>
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-12 border-t border-gray-200">
        <div className="text-center text-gray-500 text-sm">
          <Link href="/faq" className="hover:text-peaceful-blue transition-colors">
            Learn more about our methodology
          </Link>
        </div>
      </footer>
    </div>
  );
}
