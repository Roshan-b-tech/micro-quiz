export async function GET() {
  const categories = [
    {
      id: 'history',
      name: 'History',
      description: 'Test your knowledge of historical events and figures',
      icon: '🏛️',
      quizCount: 3
    },
    {
      id: 'science',
      name: 'Science',
      description: 'Explore physics, chemistry, and biology concepts',
      icon: '🔬',
      quizCount: 4
    },
    {
      id: 'math',
      name: 'Mathematics',
      description: 'Challenge yourself with mathematical problems',
      icon: '🧮',
      quizCount: 3
    },
    {
      id: 'programming',
      name: 'Programming',
      description: 'Test your coding knowledge and skills',
      icon: '💻',
      quizCount: 5
    }
  ];

  return Response.json(categories);
}