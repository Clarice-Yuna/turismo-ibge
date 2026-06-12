export interface User {
  id: string
  email: string
  name: string
  avatar: string | null
  role: string
}

export interface QuizCategory {
  id: string
  name: string
  description: string
  icon: string
  color: string
  order: number
  questionCount?: number
}

export interface QuizQuestion {
  id: string
  categoryId: string
  question: string
  optionA: string
  optionB: string
  optionC: string
  optionD: string
  correctAnswer: string
  explanation: string
  difficulty: string
  order: number
}

export type QuizQuestionPublic = Omit<QuizQuestion, 'correctAnswer' | 'explanation'>

export interface QuizAttempt {
  id: string
  userId: string
  categoryId: string
  score: number
  totalQuestions: number
  timeTaken: number
  answers: string
  completedAt: string
  user?: User
  category?: QuizCategory
}

export interface Curiosity {
  id: string
  title: string
  content: string
  category: string
  icon: string
  imageUrl: string | null
  source: string | null
  order: number
}

export interface DashboardStat {
  id: string
  label: string
  value: string
  change: string | null
  changeType: string | null
  icon: string
  category: string
  order: number
}

export interface RankingEntry {
  id: string
  userName: string
  categoryName: string
  score: number
  totalQuestions: number
  percentage: number
  completedAt: string
}

export type ViewType = 'dashboard' | 'curiosities' | 'quiz' | 'quiz-play' | 'ranking'
