export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const { category } = params;

  const quizzes = {
    history: [
      {
        id: 'world-war-2',
        title: 'World War II',
        description: 'Test your knowledge about the Second World War',
        category: 'history',
        difficulty: 'Medium',
        questionCount: 5,
        estimatedTime: '3 min'
      },
      {
        id: 'ancient-civilizations',
        title: 'Ancient Civilizations',
        description: 'Explore the great civilizations of the past',
        category: 'history',
        difficulty: 'Hard',
        questionCount: 6,
        estimatedTime: '4 min'
      },
      {
        id: 'american-revolution',
        title: 'American Revolution',
        description: 'The birth of a nation and its founding principles',
        category: 'history',
        difficulty: 'Easy',
        questionCount: 4,
        estimatedTime: '2 min'
      }
    ],
    science: [
      {
        id: 'physics-basics',
        title: 'Physics Fundamentals',
        description: 'Basic principles of physics and motion',
        category: 'science',
        difficulty: 'Medium',
        questionCount: 5,
        estimatedTime: '3 min'
      },
      {
        id: 'chemistry-elements',
        title: 'Chemical Elements',
        description: 'Periodic table and element properties',
        category: 'science',
        difficulty: 'Hard',
        questionCount: 6,
        estimatedTime: '4 min'
      },
      {
        id: 'biology-cells',
        title: 'Cell Biology',
        description: 'Structure and function of living cells',
        category: 'science',
        difficulty: 'Medium',
        questionCount: 5,
        estimatedTime: '3 min'
      },
      {
        id: 'astronomy-basics',
        title: 'Astronomy Basics',
        description: 'Solar system and space exploration',
        category: 'science',
        difficulty: 'Easy',
        questionCount: 4,
        estimatedTime: '2 min'
      }
    ],
    math: [
      {
        id: 'algebra-basics',
        title: 'Algebra Fundamentals',
        description: 'Basic algebraic equations and solving',
        category: 'math',
        difficulty: 'Medium',
        questionCount: 5,
        estimatedTime: '3 min'
      },
      {
        id: 'geometry-shapes',
        title: 'Geometry & Shapes',
        description: 'Areas, volumes, and geometric properties',
        category: 'math',
        difficulty: 'Medium',
        questionCount: 6,
        estimatedTime: '4 min'
      },
      {
        id: 'calculus-intro',
        title: 'Introduction to Calculus',
        description: 'Derivatives and basic integration',
        category: 'math',
        difficulty: 'Hard',
        questionCount: 5,
        estimatedTime: '5 min'
      }
    ],
    programming: [
      {
        id: 'javascript-fundamentals',
        title: 'JavaScript Fundamentals',
        description: 'Core JavaScript concepts and syntax',
        category: 'programming',
        difficulty: 'Medium',
        questionCount: 6,
        estimatedTime: '4 min'
      },
      {
        id: 'react-basics',
        title: 'React Basics',
        description: 'Components, props, and state management',
        category: 'programming',
        difficulty: 'Medium',
        questionCount: 5,
        estimatedTime: '3 min'
      },
      {
        id: 'python-fundamentals',
        title: 'Python Fundamentals',
        description: 'Python syntax and basic programming concepts',
        category: 'programming',
        difficulty: 'Easy',
        questionCount: 5,
        estimatedTime: '3 min'
      },
      {
        id: 'algorithms-data-structures',
        title: 'Algorithms & Data Structures',
        description: 'Common algorithms and data structure concepts',
        category: 'programming',
        difficulty: 'Hard',
        questionCount: 7,
        estimatedTime: '5 min'
      },
      {
        id: 'web-development',
        title: 'Web Development',
        description: 'HTML, CSS, and web technologies',
        category: 'programming',
        difficulty: 'Easy',
        questionCount: 4,
        estimatedTime: '2 min'
      }
    ]
  };

  const categoryQuizzes = quizzes[category as keyof typeof quizzes] || [];
  
  return Response.json(categoryQuizzes);
}