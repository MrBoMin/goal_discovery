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
    // Load saved progress
    const savedProgress = loadProgress();
    if (savedProgress) {
      setProgress(savedProgress);
      // Find existing answer for this question
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
      // All questions completed, go to analysis
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
      <div className="min-h-screen bg-peaceful-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-peaceful-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-peaceful-gray flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-peaceful-darkGray mb-4">
            Question not found
          </h1>
          <Link href="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = (questionId / TOTAL_QUESTIONS) * 100;

  return (
    <div className="min-h-screen bg-peaceful-gray">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-peaceful-blue hover:text-opacity-80 transition-colors"
            >
              <span className="text-xl font-bold">Find Your Path</span>
            </Link>
            <div className="text-sm text-gray-600">
              Question {questionId} of {TOTAL_QUESTIONS}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-peaceful-blue transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Phase Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-peaceful-lightBlue text-peaceful-blue text-sm font-medium rounded-full">
              {currentQuestion.phase}
            </span>
          </div>

          {/* Question */}
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-peaceful-darkGray mb-8 leading-tight">
              {currentQuestion.question}
            </h1>

            {/* Textarea */}
            <div className="mb-8">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Take your time... There are no wrong answers. Write what comes from your heart."
                className="textarea-field min-h-[300px] text-lg"
                autoFocus
              />
              <p className="text-sm text-gray-500 mt-2">
                Tip: The more thoughtful your response, the better your personalized
                analysis will be.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div className="flex gap-4">
                {previousQuestionId && (
                  <Link
                    href={`/questions/${previousQuestionId}`}
                    className="btn-secondary"
                  >
                    ← Back
                  </Link>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSkip}
                  className="text-gray-500 hover:text-peaceful-blue transition-colors px-4 py-3 text-center"
                >
                  Skip for now
                </button>
                <button
                  onClick={handleSaveAndContinue}
                  disabled={!answer.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {nextQuestionId ? 'Continue →' : 'Get My Results →'}
                </button>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-center gap-2">
              {QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    q.id < questionId
                      ? 'bg-peaceful-blue'
                      : q.id === questionId
                      ? 'bg-peaceful-blue w-4'
                      : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
