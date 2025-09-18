"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Timer } from "@/components/Timer";
import { TriviaQuestion, TriviaCategory, calculateTriviaPoints } from "@/lib/game-logic/trivia";
import triviaData from "@/data/trivia/general.json";

export default function TriviaPlayPage() {
  const searchParams = useSearchParams();
  const category = (searchParams?.get("category") || "general") as TriviaCategory;
  const mode = searchParams?.get("mode") || "ffa";

  const [currentQuestion, setCurrentQuestion] = useState<TriviaQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [answerTime, setAnswerTime] = useState<number>(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);

  const timeLimit = mode === "rapid" ? 10 : 30;
  const questions = triviaData as TriviaQuestion[];

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[questionIndex]);
      setQuestionStartTime(Date.now());
    }
  }, [questionIndex]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
    setAnswerTime(Date.now() - questionStartTime);
    
    setTimeout(() => {
      setShowResult(true);
      
      const isCorrect = currentQuestion?.answer_index === answerIndex;
      if (isCorrect) {
        const points = calculateTriviaPoints(
          true,
          Date.now() - questionStartTime,
          timeLimit,
          streak,
          currentQuestion?.difficulty || "easy"
        );
        setScore(prev => prev + points);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
    }, 500);
  };

  const handleTimeUp = () => {
    if (!showResult && selectedAnswer === null) {
      setSelectedAnswer(-1); // No answer selected
      setShowResult(true);
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswerTime(0);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4 flex items-center justify-center">
        <div className="text-white text-center">
          <p>Loading questions...</p>
        </div>
      </div>
    );
  }

  const isCorrect = selectedAnswer === currentQuestion.answer_index;
  const isGameComplete = questionIndex >= questions.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 p-4">
      <div className="container mx-auto max-w-md py-8">
        <div className="text-center mb-6">
          <div className="flex justify-between items-center text-white mb-4">
            <span>Q {questionIndex + 1}/{questions.length}</span>
            <span>Score: {score}</span>
            <span>Streak: {streak}</span>
          </div>
          
          {!showResult && (
            <Timer
              duration={timeLimit}
              onTimeUp={handleTimeUp}
              size="sm"
            />
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.choices.map((choice, index) => {
              let buttonClass = "w-full p-4 rounded-xl text-left transition-colors border-2 ";
              
              if (showResult) {
                if (index === currentQuestion.answer_index) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800";
                } else if (index === selectedAnswer && selectedAnswer !== currentQuestion.answer_index) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonClass += "bg-gray-100 border-gray-300 text-gray-600";
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += "bg-blue-100 border-blue-500 text-blue-800";
                } else {
                  buttonClass += "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100";
                }
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={buttonClass}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white mb-6">
            <div className="text-center">
              <div className="text-4xl mb-2">
                {isCorrect ? "✅" : "❌"}
              </div>
              <p className="text-lg font-semibold mb-2">
                {isCorrect ? "Correct!" : "Wrong Answer"}
              </p>
              {isCorrect && (
                <p className="text-sm">
                  +{calculateTriviaPoints(true, answerTime, timeLimit, streak - 1, currentQuestion.difficulty || "easy")} points
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4">
          {showResult && !isGameComplete && (
            <button
              onClick={nextQuestion}
              className="w-full bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Next Question →
            </button>
          )}

          {showResult && isGameComplete && (
            <Link href={`/trivia/score?score=${score}&questions=${questions.length}&category=${category}&mode=${mode}`}>
              <button className="w-full bg-white text-gray-800 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
                🏆 See Final Score
              </button>
            </Link>
          )}

          <Link
            href={`/trivia/spinner?category=${category}`}
            className="block text-center text-white/80 hover:text-white underline"
          >
            ← Back to game start
          </Link>
        </div>
      </div>
    </div>
  );
}