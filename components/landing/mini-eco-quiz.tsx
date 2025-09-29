"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Leaf, Trophy } from "lucide-react"
import { useI18n } from "@/lib/i18n-context"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export function MiniEcoQuiz() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: t("quizQuestion1") || "Which of these actions helps reduce carbon footprint the most?",
      options: [
        t("quizOption1A") || "Using plastic bags",
        t("quizOption1B") || "Walking or cycling instead of driving",
        t("quizOption1C") || "Leaving lights on",
        t("quizOption1D") || "Using more water",
      ],
      correctAnswer: 1,
      explanation: t("quizExplanation1") || "Walking and cycling produce zero emissions compared to cars!",
    },
    {
      id: 2,
      question: t("quizQuestion2") || "What percentage of Earth's water is freshwater?",
      options: [
        t("quizOption2A") || "50%",
        t("quizOption2B") || "25%",
        t("quizOption2C") || "3%",
        t("quizOption2D") || "75%",
      ],
      correctAnswer: 2,
      explanation: t("quizExplanation2") || "Only about 3% of Earth's water is freshwater, making it precious!",
    },
    {
      id: 3,
      question: t("quizQuestion3") || "Which renewable energy source is most widely used globally?",
      options: [
        t("quizOption3A") || "Solar power",
        t("quizOption3B") || "Wind power",
        t("quizOption3C") || "Hydroelectric power",
        t("quizOption3D") || "Geothermal power",
      ],
      correctAnswer: 2,
      explanation: t("quizExplanation3") || "Hydroelectric power generates the most renewable energy worldwide!",
    },
  ]

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        setQuizCompleted(true)
      }
    }, 2000)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setShowResult(false)
    setQuizCompleted(false)
  }

  const closeQuiz = () => {
    setIsOpen(false)
    resetQuiz()
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        size="lg"
        className="group relative overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:from-green-100 hover:to-blue-100 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        <Leaf className="mr-2 h-5 w-5 text-green-600 group-hover:rotate-12 transition-transform duration-300" />
        <span className="relative z-10">{t("takeEcoQuiz") || "Take Quick Eco-Quiz"}</span>
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">{t("ecoQuizTitle") || "Quick Eco-Quiz"}</CardTitle>
          <CardDescription>
            {quizCompleted
              ? t("quizCompleted") || "Quiz completed! See your results below."
              : `${t("question") || "Question"} ${currentQuestion + 1} ${t("of") || "of"} ${questions.length}`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>
              </div>

              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={
                      showResult
                        ? index === questions[currentQuestion].correctAnswer
                          ? "default"
                          : selectedAnswer === index
                            ? "destructive"
                            : "outline"
                        : "outline"
                    }
                    className={`justify-start h-auto p-4 text-left transition-all duration-300 ${
                      showResult
                        ? index === questions[currentQuestion].correctAnswer
                          ? "bg-green-100 border-green-300 text-green-800"
                          : selectedAnswer === index
                            ? "bg-red-100 border-red-300 text-red-800"
                            : "opacity-50"
                        : "hover:bg-accent"
                    }`}
                    onClick={() => !showResult && handleAnswerSelect(index)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3">
                      {showResult && (
                        <>
                          {index === questions[currentQuestion].correctAnswer && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </>
                      )}
                      <span>{option}</span>
                    </div>
                  </Button>
                ))}
              </div>

              {showResult && (
                <div className="text-center p-4 bg-accent/50 rounded-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
                  <p className="text-sm text-muted-foreground">{questions[currentQuestion].explanation}</p>
                </div>
              )}

              <div className="flex justify-center">
                <Badge variant="secondary" className="px-4 py-2">
                  {t("score") || "Score"}: {score}/{questions.length}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-yellow-100 rounded-full animate-bounce">
                  <Trophy className="h-12 w-12 text-yellow-600" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">{t("congratulations") || "Congratulations!"}</h3>
                <p className="text-lg text-muted-foreground mb-4">
                  {t("yourScore") || "Your score"}: {score}/{questions.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  {score === questions.length
                    ? t("perfectScore") || "Perfect! You're an eco-champion!"
                    : score >= 2
                      ? t("goodScore") || "Great job! You know your environmental facts!"
                      : t("keepLearning") || "Keep learning about our environment!"}
                </p>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={resetQuiz} variant="outline">
                  {t("tryAgain") || "Try Again"}
                </Button>
                <Button onClick={closeQuiz}>{t("getStarted") || "Get Started"}</Button>
              </div>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <Button variant="ghost" onClick={closeQuiz}>
              {t("close") || "Close"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
