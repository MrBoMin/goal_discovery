'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadProgress, clearProgress } from '@/lib/storage';
import { AnalysisResult } from '@/lib/types';

export default function ResultsPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

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

  const handleDownloadPdf = async () => {
    if (!resultsRef.current || !analysis) return;
    
    setIsGeneratingPdf(true);
    
    try {
      // Dynamically import html2pdf to avoid SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = resultsRef.current;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const opt: any = {
        margin: [20, 20, 20, 20],
        filename: `career-path-${analysis.careerArchetype.toLowerCase().replace(/\s+/g, '-')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true,
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait'
        },
        pagebreak: { mode: 'avoid-all' }
      };
      
      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error('PDF generation error:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
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
      <header className="border-b border-ink-faint print:hidden">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-mono text-xs tracking-widest uppercase">
              Find Your Path
            </Link>
            <div className="flex items-center gap-6">
              <button
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
                className="font-mono text-xs tracking-widest uppercase hover:text-ink-light transition-colors disabled:opacity-50"
              >
                {isGeneratingPdf ? 'Generating...' : 'Download PDF'}
              </button>
              <button
                onClick={handleStartOver}
                className="font-mono text-xs text-ink-light hover:text-ink-black transition-colors tracking-widest uppercase"
              >
                Start Over
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - This is what gets exported to PDF */}
      <main className="container mx-auto px-6 py-16" ref={resultsRef}>
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20 animate-fade-in">
            <span className="font-mono text-xs tracking-widest text-ink-light uppercase">Your Result</span>
            <div className="w-px h-12 bg-ink-black mx-auto my-8"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-none mb-6">
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

          {/* Download CTA */}
          <section className="border border-ink-black p-12 text-center print:hidden">
            <h3 className="text-xl mb-4">Save Your Results</h3>
            <p className="text-body text-sm mb-8 max-w-md mx-auto">
              Download a PDF copy of your career path analysis to reference anytime.
            </p>
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="btn-primary disabled:opacity-50"
            >
              {isGeneratingPdf ? 'Generating PDF...' : 'Download as PDF'}
            </button>
          </section>

          {/* Footer for PDF */}
          <div className="mt-16 pt-8 border-t border-ink-faint text-center hidden print:block">
            <p className="font-mono text-xs text-ink-light">
              Generated by Find Your Path • findyourpath.com
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink-faint print:hidden">
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
