'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  QUESTIONS,
  TOTAL_QUESTIONS,
  getQuestionById,
  getNextQuestionId,
  getPreviousQuestionId,
} from '@/lib/questions';
import { loadProgress, saveProgress, updateResponse } from '@/lib/storage';
import { UserProgress } from '@/lib/types';

export default function QuestionPage() {
  const router = useRouter();
  const params = useParams();
  const questionId = parseInt(params.id as string);

  const [answer, setAnswer] = useState('');
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentQuestion = getQuestionById(questionId);
  const nextQuestionId = getNextQuestionId(questionId);
  const previousQuestionId = getPreviousQuestionId(questionId);

  useEffect(() => {
    const savedProgress = loadProgress();
    if (savedProgress) {
      setProgress(savedProgress);
      const existingResponse = savedProgress.responses.find(
        (r) => r.questionId === questionId
      );
      if (existingResponse) {
        setAnswer(existingResponse.answer);
      }
    } else {
      setProgress({
        responses: [],
        currentQuestionId: 1,
        lastUpdated: new Date().toISOString(),
      });
    }
    setIsLoading(false);
  }, [questionId]);

  const handleSaveAndContinue = () => {
    if (!currentQuestion || !progress) return;

    const updatedResponses = updateResponse(
      progress.responses,
      questionId,
      currentQuestion.question,
      answer
    );

    const updatedProgress: UserProgress = {
      responses: updatedResponses,
      currentQuestionId: nextQuestionId || questionId,
      lastUpdated: new Date().toISOString(),
    };

    saveProgress(updatedProgress);
    setProgress(updatedProgress);

    if (nextQuestionId) {
      router.push(`/questions/${nextQuestionId}`);
    } else {
      router.push('/results');
    }
  };

  const handleSkip = () => {
    if (nextQuestionId) {
      router.push(`/questions/${nextQuestionId}`);
    } else {
      router.push('/results');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border border-ink-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-mono text-xs text-ink-light tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl mb-8">Question not found</h1>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = (questionId / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-ink-faint">
        <div className="container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="font-mono text-xs tracking-widest uppercase hover:text-ink-light transition-colors"
            >
              Find Your Path
            </Link>
            <span className="font-mono text-xs text-ink-light">
              {questionId.toString().padStart(2, '0')} / {TOTAL_QUESTIONS.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar - Minimalist */}
      <div className="h-px bg-ink-faint">
        <div
          className="h-full bg-ink-black transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Phase Badge */}
            <div className="mb-8 animate-fade-in">
              <span className="font-mono text-xs tracking-widest text-ink-light uppercase">
                {currentQuestion.phase}
              </span>
            </div>

            {/* Question */}
            <div className="animate-fade-in">
              <h1 className="text-2xl md:text-3xl font-light leading-relaxed mb-12">
                {currentQuestion.question}
              </h1>

              {/* Textarea */}
              <div className="mb-12">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Write your thoughts here..."
                  className="w-full min-h-[200px] p-0 bg-transparent border-0 border-b border-ink-faint
                           focus:outline-none focus:border-ink-black transition-colors duration-300
                           resize-none text-lg font-light leading-relaxed placeholder:text-ink-light"
                  autoFocus
                />
                <p className="text-xs text-ink-light mt-4 font-mono">
                  The more thoughtful your response, the better your analysis.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
                <div>
                  {previousQuestionId && (
                    <Link
                      href={`/questions/${previousQuestionId}`}
                      className="text-sm text-ink-light hover:text-ink-black transition-colors font-mono"
                    >
                      ← Back
                    </Link>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <button
                    onClick={handleSkip}
                    className="text-sm text-ink-light hover:text-ink-black transition-colors font-mono"
                  >
                    Skip
                  </button>
                  <button
                    onClick={handleSaveAndContinue}
                    disabled={!answer.trim()}
                    className="btn-primary disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-ink-black disabled:hover:text-white"
                  >
                    {nextQuestionId ? 'Continue' : 'Get Results'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Progress Dots */}
      <footer className="border-t border-ink-faint py-8">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-2">
            {QUESTIONS.map((q) => (
              <div
                key={q.id}
                className={`h-1 transition-all duration-300 ${
                  q.id < questionId
                    ? 'w-4 bg-ink-black'
                    : q.id === questionId
                    ? 'w-8 bg-ink-black'
                    : 'w-4 bg-ink-faint'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
