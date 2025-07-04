import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Users } from 'lucide-react';
import Image from 'next/image';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Micro-Quiz Platform - Test Your Knowledge',
  description: 'Challenge yourself with quizzes across multiple categories including History, Science, Math, and Programming. Learn and have fun!',
  keywords: 'quiz, education, learning, history, science, math, programming',
};

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  quizCount: number;
}

async function getCategories(): Promise<Category[]> {
  try {
    const host = headers().get('host');
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const url = `${protocol}://${host}/api/categories`;

    const response = await fetch(url, {
      cache: 'force-cache', // SSG behavior
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

export default async function Home() {
  const categories = await getCategories();
  console.log('Categories:', categories); // Debug log

  return (
    <div className="bg-main-gradient">
      {/* Hero Section */}
      <div className="relative overflow-hidden section-fade-in">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0 mb-8 md:mb-0 md:mr-12">
              <Image src="/quiz.png" alt="Micro-Quiz Logo" width={96} height={96} priority className="rounded-2xl shadow-lg" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Micro-Quiz
                </span>
                <br />
                Platform
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto md:mx-0 mb-8">
                Test your knowledge across multiple categories with our engaging quizzes.
                Learn, challenge yourself, and track your progress in an interactive way.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-8 text-sm text-gray-500 mb-12">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Multiple Categories</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>Quick 2-5 min Quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>Instant Results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 section-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our diverse range of quiz categories and start your learning journey today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/quizzes/${category.id}`}
              className="group outline-none focus-visible:ring-4 focus-visible:ring-blue-300 rounded-2xl transition-transform duration-200 card-fade-in"
              aria-label={`View quizzes in ${category.name}`}
            >
              <div className="glass-card hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200 group-hover:-translate-y-1 group-hover:scale-105">
                <div className="p-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Image src={`/${category.id}.png`} alt={`${category.name} icon`} width={48} height={48} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                      {category.quizCount} Quiz{category.quizCount !== 1 ? 'es' : ''}
                    </div>
                  </div>
                </div>
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Start Learning?</h3>
            <p className="text-gray-600">
              Choose a category above and begin your quiz adventure today!
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}