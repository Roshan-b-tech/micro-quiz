import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Award, Users } from 'lucide-react';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  questionCount: number;
  estimatedTime: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  quizCount: number;
}

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories: Category[] = await response.json();

    return categories.map((category) => ({
      category: category.id,
    }));
  } catch (error) {
    console.error('Error fetching categories for static params:', error);
    // Return default categories as fallback
    return [
      { category: 'history' },
      { category: 'science' },
      { category: 'math' },
      { category: 'programming' }
    ];
  }
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const categoryNames: Record<string, string> = {
    history: 'History',
    science: 'Science',
    math: 'Mathematics',
    programming: 'Programming'
  };

  const categoryName = categoryNames[params.category] || 'Category';

  return {
    title: `${categoryName} Quizzes - Micro-Quiz Platform`,
    description: `Test your knowledge with our ${categoryName.toLowerCase()} quizzes. Multiple difficulty levels and topics available.`,
  };
}

async function getQuizzes(category: string): Promise<Quiz[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/quizzes/${category}`, {
      cache: 'no-store', // SSR behavior
    });

    if (!response.ok) {
      throw new Error('Failed to fetch quizzes');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  try {
    const response = await fetch(`${baseUrl}/api/categories`, {
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-100 text-green-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const [quizzes, categories] = await Promise.all([
    getQuizzes(params.category),
    getCategories()
  ]);

  const currentCategory = categories.find(cat => cat.id === params.category);

  if (!currentCategory) {
    notFound();
  }

  if (quizzes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No quizzes found</h1>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-main-gradient min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Categories</span>
            </Link>
            <div className="text-sm text-gray-500">
              {quizzes.length} Quiz{quizzes.length !== 1 ? 'es' : ''} Available
            </div>
          </div>
        </div>
      </div>

      {/* Category Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 section-fade-in">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Image src={`/${currentCategory.id}.png`} alt={`${currentCategory.name} icon`} width={64} height={64} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {currentCategory.name} Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quiz/${quiz.id}`}
              className="group outline-none focus-visible:ring-4 focus-visible:ring-blue-300 rounded-2xl transition-transform duration-200 card-fade-in"
              aria-label={`Start quiz: ${quiz.title}`}
            >
              <div className="glass-card hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200 group-hover:-translate-y-1 group-hover:scale-105">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {quiz.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {quiz.description}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                      {quiz.difficulty}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="h-4 w-4" />
                      <span>{quiz.questionCount} Questions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>Interactive Quiz</span>
                    </div>
                    <div className="text-blue-600 group-hover:text-blue-800 transition-colors">
                      <span className="text-sm font-medium">Start Quiz →</span>
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}