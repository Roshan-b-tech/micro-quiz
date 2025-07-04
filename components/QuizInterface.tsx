'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Award, Clock } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questions: Question[];
}

interface QuizInterfaceProps {
  quiz: Quiz;
}

type QuizState = 'ready' | 'active' | 'completed';

export default function QuizInterface({ quiz }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>('ready');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  // Timer effect
  useEffect(() => {
    if (quizState === 'active' && startTime) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [quizState, startTime]);

  const startQuiz = () => {
    setQuizState('active');
    setStartTime(Date.now());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizState('completed');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizState('ready');
    setStartTime(null);
    setTimeElapsed(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (quizState === 'ready') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <Link
              href={`/quizzes/${quiz.category}`}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to {quiz.category}</span>
            </Link>
            <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
            <p className="text-blue-100 text-lg">{quiz.description}</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{quiz.questions.length}</div>
                <div className="text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{quiz.difficulty}</div>
                <div className="text-gray-600">Difficulty</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">~{Math.ceil(quiz.questions.length * 0.5)}</div>
                <div className="text-gray-600">Minutes</div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={startQuiz}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'completed') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 p-8 text-white text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">Quiz Completed!</h1>
            <p className="text-green-100 text-lg">Great job on completing the quiz</p>
          </div>

          <div className="p-8">
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(score, quiz.questions.length)}`}>
                {score}/{quiz.questions.length}
              </div>
              <div className="text-2xl font-semibold text-gray-800 mb-2">
                {Math.round((score / quiz.questions.length) * 100)}% Correct
              </div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>Completed in {formatTime(timeElapsed)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restartQuiz}
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                Retake Quiz
              </button>
              <Link
                href={`/quizzes/${quiz.category}`}
                className="inline-flex items-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-center"
              >
                <ArrowLeft className="h-5 w-5" />
                More Quizzes
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-main-gradient min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 section-fade-in">
        <div className="glass-card shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <Link
                href={`/quizzes/${quiz.category}`}
                className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Exit Quiz</span>
              </Link>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <span className="text-sm font-medium">Score: {score}/{quiz.questions.length}</span>
              </div>
              <div className="w-full bg-blue-400 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full quiz-progress-bar"
                  style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${selectedAnswer === index
                    ? showFeedback
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : 'border-red-500 bg-red-50 text-red-800'
                      : 'border-blue-500 bg-blue-50 text-blue-800'
                    : showFeedback && index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showFeedback && (
                      <div>
                        {index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        ) : selectedAnswer === index ? (
                          <XCircle className="h-6 w-6 text-red-500" />
                        ) : null}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!showFeedback ? (
              <div className="text-center">
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={`px-8 py-3 rounded-xl font-semibold text-lg transition-all ${selectedAnswer === null
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
                    }`}
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                      <CheckCircle className="h-6 w-6 pop-in" />
                      <span className="font-semibold">Correct!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-red-600 mb-2">
                      <XCircle className="h-6 w-6 pop-in" />
                      <span className="font-semibold">Incorrect</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
                >
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}