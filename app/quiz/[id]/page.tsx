import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuizInterface from '@/components/QuizInterface';

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

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const quiz = await getQuiz(params.id);
  
  if (!quiz) {
    return {
      title: 'Quiz Not Found - Micro-Quiz Platform',
    };
  }
  
  return {
    title: `${quiz.title} - Micro-Quiz Platform`,
    description: quiz.description,
  };
}

async function getQuiz(id: string): Promise<Quiz | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${baseUrl}/api/quiz/${id}`, {
      cache: 'no-store', // SSR behavior for initial load
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
}

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id);

  if (!quiz) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <QuizInterface quiz={quiz} />
    </div>
  );
}