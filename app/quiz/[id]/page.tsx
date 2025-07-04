import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuizInterface from '@/components/QuizInterface';
import { headers } from 'next/headers';

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
  try {
    const host = headers().get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const url = `${protocol}://${host}/api/quiz/${id}`;
    const response = await fetch(url, {
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