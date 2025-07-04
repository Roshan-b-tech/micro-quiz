export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const quizData = {
    'world-war-2': {
      id: 'world-war-2',
      title: 'World War II',
      description: 'Test your knowledge about the Second World War',
      category: 'history',
      difficulty: 'Medium',
      questions: [
        {
          id: 1,
          question: 'When did World War II begin?',
          options: ['September 1, 1939', 'December 7, 1941', 'June 6, 1944', 'May 8, 1945'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'Which country was NOT part of the Axis Powers?',
          options: ['Germany', 'Italy', 'Japan', 'Soviet Union'],
          correctAnswer: 3
        },
        {
          id: 3,
          question: 'What was the code name for the D-Day invasion?',
          options: ['Operation Barbarossa', 'Operation Overlord', 'Operation Torch', 'Operation Market Garden'],
          correctAnswer: 1
        },
        {
          id: 4,
          question: 'Which battle is considered the turning point of WWII in the Pacific?',
          options: ['Battle of Pearl Harbor', 'Battle of Midway', 'Battle of Iwo Jima', 'Battle of Okinawa'],
          correctAnswer: 1
        },
        {
          id: 5,
          question: 'When did World War II end in Europe?',
          options: ['April 30, 1945', 'May 8, 1945', 'August 15, 1945', 'September 2, 1945'],
          correctAnswer: 1
        }
      ]
    },
    'javascript-fundamentals': {
      id: 'javascript-fundamentals',
      title: 'JavaScript Fundamentals',
      description: 'Core JavaScript concepts and syntax',
      category: 'programming',
      difficulty: 'Medium',
      questions: [
        {
          id: 1,
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'Which of these is NOT a JavaScript data type?',
          options: ['string', 'boolean', 'integer', 'undefined'],
          correctAnswer: 2
        },
        {
          id: 3,
          question: 'What does "=== " operator do in JavaScript?',
          options: ['Assignment', 'Equality (loose)', 'Strict equality', 'Not equal'],
          correctAnswer: 2
        },
        {
          id: 4,
          question: 'Which method adds an element to the end of an array?',
          options: ['push()', 'pop()', 'shift()', 'unshift()'],
          correctAnswer: 0
        },
        {
          id: 5,
          question: 'What is the result of: typeof null?',
          options: ['"null"', '"undefined"', '"object"', '"boolean"'],
          correctAnswer: 2
        },
        {
          id: 6,
          question: 'Which keyword is used to define a function in JavaScript?',
          options: ['function', 'def', 'func', 'define'],
          correctAnswer: 0
        }
      ]
    },
    'physics-basics': {
      id: 'physics-basics',
      title: 'Physics Fundamentals',
      description: 'Basic principles of physics and motion',
      category: 'science',
      difficulty: 'Medium',
      questions: [
        {
          id: 1,
          question: 'What is the unit of force in the SI system?',
          options: ['Joule', 'Newton', 'Watt', 'Pascal'],
          correctAnswer: 1
        },
        {
          id: 2,
          question: 'What is the acceleration due to gravity on Earth?',
          options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'],
          correctAnswer: 0
        },
        {
          id: 3,
          question: 'Which law states that for every action, there is an equal and opposite reaction?',
          options: ['First Law of Motion', 'Second Law of Motion', 'Third Law of Motion', 'Law of Gravitation'],
          correctAnswer: 2
        },
        {
          id: 4,
          question: 'What is the formula for kinetic energy?',
          options: ['KE = mv', 'KE = ½mv²', 'KE = mv²', 'KE = m/v²'],
          correctAnswer: 1
        },
        {
          id: 5,
          question: 'What is the speed of light in vacuum?',
          options: ['3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10⁷ m/s', '3 × 10⁹ m/s'],
          correctAnswer: 0
        }
      ]
    },
    'algebra-basics': {
      id: 'algebra-basics',
      title: 'Algebra Fundamentals',
      description: 'Basic algebraic equations and solving',
      category: 'math',
      difficulty: 'Medium',
      questions: [
        {
          id: 1,
          question: 'Solve for x: 2x + 5 = 15',
          options: ['x = 5', 'x = 10', 'x = 7.5', 'x = 20'],
          correctAnswer: 0
        },
        {
          id: 2,
          question: 'What is the slope of the line y = 3x + 2?',
          options: ['3', '2', '1', '5'],
          correctAnswer: 0
        },
        {
          id: 3,
          question: 'Simplify: (x²)(x³)',
          options: ['x⁵', 'x⁶', 'x²³', '2x⁵'],
          correctAnswer: 0
        },
        {
          id: 4,
          question: 'What is the quadratic formula?',
          options: ['x = (-b ± √(b² - 4ac))/2a', 'x = (-b ± √(b² + 4ac))/2a', 'x = (b ± √(b² - 4ac))/2a', 'x = (-b ± √(b² - 4ac))/a'],
          correctAnswer: 0
        },
        {
          id: 5,
          question: 'Factor: x² - 9',
          options: ['(x - 3)(x + 3)', '(x - 9)(x + 1)', '(x - 3)²', 'Cannot be factored'],
          correctAnswer: 0
        }
      ]
    },
    'ancient-civilizations': {
      id: 'ancient-civilizations',
      title: 'Ancient Civilizations',
      description: 'Explore the great civilizations of the past',
      category: 'history',
      difficulty: 'Hard',
      questions: [
        { id: 1, question: 'Which civilization built the pyramids of Giza?', options: ['Romans', 'Greeks', 'Egyptians', 'Persians'], correctAnswer: 2 },
        { id: 2, question: 'The Code of Hammurabi is associated with which ancient region?', options: ['Mesopotamia', 'China', 'India', 'Greece'], correctAnswer: 0 },
        { id: 3, question: 'What writing system did the Sumerians develop?', options: ['Cuneiform', 'Hieroglyphics', 'Latin', 'Sanskrit'], correctAnswer: 0 }
      ]
    },
    'american-revolution': {
      id: 'american-revolution',
      title: 'American Revolution',
      description: 'The birth of a nation and its founding principles',
      category: 'history',
      difficulty: 'Easy',
      questions: [
        { id: 1, question: 'In what year did the American Revolution begin?', options: ['1776', '1789', '1775', '1801'], correctAnswer: 2 },
        { id: 2, question: 'Who was the main author of the Declaration of Independence?', options: ['George Washington', 'Thomas Jefferson', 'Benjamin Franklin', 'John Adams'], correctAnswer: 1 },
        { id: 3, question: 'Which country aided the American colonies against Britain?', options: ['France', 'Spain', 'Germany', 'Russia'], correctAnswer: 0 }
      ]
    },
    'chemistry-elements': {
      id: 'chemistry-elements',
      title: 'Chemical Elements',
      description: 'Periodic table and element properties',
      category: 'science',
      difficulty: 'Hard',
      questions: [
        { id: 1, question: 'What is the chemical symbol for gold?', options: ['Au', 'Ag', 'Gd', 'Go'], correctAnswer: 0 },
        { id: 2, question: 'Which element has the atomic number 1?', options: ['Oxygen', 'Hydrogen', 'Helium', 'Carbon'], correctAnswer: 1 },
        { id: 3, question: 'What is the most abundant element in the Earth\'s crust?', options: ['Oxygen', 'Silicon', 'Aluminum', 'Iron'], correctAnswer: 0 }
      ]
    },
    'biology-cells': {
      id: 'biology-cells',
      title: 'Cell Biology',
      description: 'Structure and function of living cells',
      category: 'science',
      difficulty: 'Medium',
      questions: [
        { id: 1, question: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'], correctAnswer: 1 },
        { id: 2, question: 'Which structure controls what enters and leaves the cell?', options: ['Cell wall', 'Cell membrane', 'Nucleus', 'Cytoplasm'], correctAnswer: 1 },
        { id: 3, question: 'What is the basic unit of life?', options: ['Tissue', 'Organ', 'Cell', 'Organism'], correctAnswer: 2 }
      ]
    },
    'astronomy-basics': {
      id: 'astronomy-basics',
      title: 'Astronomy Basics',
      description: 'Solar system and space exploration',
      category: 'science',
      difficulty: 'Easy',
      questions: [
        { id: 1, question: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 1 },
        { id: 2, question: 'What is the name of our galaxy?', options: ['Andromeda', 'Milky Way', 'Sombrero', 'Whirlpool'], correctAnswer: 1 },
        { id: 3, question: 'Who was the first person to walk on the Moon?', options: ['Yuri Gagarin', 'Buzz Aldrin', 'Neil Armstrong', 'Michael Collins'], correctAnswer: 2 }
      ]
    },
    'geometry-shapes': {
      id: 'geometry-shapes',
      title: 'Geometry & Shapes',
      description: 'Areas, volumes, and geometric properties',
      category: 'math',
      difficulty: 'Medium',
      questions: [
        { id: 1, question: 'How many sides does a hexagon have?', options: ['5', '6', '7', '8'], correctAnswer: 1 },
        { id: 2, question: 'What is the sum of the angles in a triangle?', options: ['90°', '180°', '270°', '360°'], correctAnswer: 1 },
        { id: 3, question: 'What is the area of a circle with radius r?', options: ['πr', '2πr', 'πr²', 'r²'], correctAnswer: 2 }
      ]
    },
    'calculus-intro': {
      id: 'calculus-intro',
      title: 'Introduction to Calculus',
      description: 'Derivatives and basic integration',
      category: 'math',
      difficulty: 'Hard',
      questions: [
        { id: 1, question: 'What is the derivative of x²?', options: ['x', '2x', 'x²', '2'], correctAnswer: 1 },
        { id: 2, question: 'What is the integral of 1/x dx?', options: ['x', 'ln|x| + C', '1/x', 'eˣ'], correctAnswer: 1 },
        { id: 3, question: 'What is the limit of (1 + 1/n)^n as n approaches infinity?', options: ['0', '1', 'e', '∞'], correctAnswer: 2 }
      ]
    },
    'react-basics': {
      id: 'react-basics',
      title: 'React Basics',
      description: 'Components, props, and state management',
      category: 'programming',
      difficulty: 'Medium',
      questions: [
        { id: 1, question: 'What is a React component?', options: ['A function or class that returns JSX', 'A CSS file', 'A database', 'A server'], correctAnswer: 0 },
        { id: 2, question: 'What hook is used for state in functional components?', options: ['useEffect', 'useState', 'useContext', 'useReducer'], correctAnswer: 1 },
        { id: 3, question: 'What prop is used to uniquely identify elements in a list?', options: ['id', 'key', 'name', 'value'], correctAnswer: 1 }
      ]
    },
    'python-fundamentals': {
      id: 'python-fundamentals',
      title: 'Python Fundamentals',
      description: 'Python syntax and basic programming concepts',
      category: 'programming',
      difficulty: 'Easy',
      questions: [
        { id: 1, question: 'Which keyword is used to define a function in Python?', options: ['function', 'def', 'lambda', 'fun'], correctAnswer: 1 },
        { id: 2, question: 'What is the output of print(2 ** 3)?', options: ['6', '8', '9', '5'], correctAnswer: 1 },
        { id: 3, question: 'Which of these is a valid variable name in Python?', options: ['2var', 'var_2', 'var-2', 'var 2'], correctAnswer: 1 }
      ]
    },
    'algorithms-data-structures': {
      id: 'algorithms-data-structures',
      title: 'Algorithms & Data Structures',
      description: 'Common algorithms and data structure concepts',
      category: 'programming',
      difficulty: 'Hard',
      questions: [
        { id: 1, question: 'Which data structure uses FIFO order?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 1 },
        { id: 2, question: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'], correctAnswer: 1 },
        { id: 3, question: 'Which algorithm is used to sort an array efficiently?', options: ['Bubble Sort', 'Quick Sort', 'Linear Search', 'DFS'], correctAnswer: 1 }
      ]
    },
    'web-development': {
      id: 'web-development',
      title: 'Web Development',
      description: 'HTML, CSS, and web technologies',
      category: 'programming',
      difficulty: 'Easy',
      questions: [
        { id: 1, question: 'What does HTML stand for?', options: ['Hyper Trainer Marking Language', 'Hyper Text Markup Language', 'Hyper Text Marketing Language', 'Hyper Text Markup Leveler'], correctAnswer: 1 },
        { id: 2, question: 'Which CSS property changes text color?', options: ['font-style', 'color', 'background', 'text-align'], correctAnswer: 1 },
        { id: 3, question: 'What does CSS stand for?', options: ['Cascading Style Sheets', 'Computer Style Sheets', 'Creative Style System', 'Colorful Style Sheets'], correctAnswer: 0 }
      ]
    }
  };

  const quiz = quizData[id as keyof typeof quizData];

  if (!quiz) {
    return Response.json({ error: 'Quiz not found' }, { status: 404 });
  }

  return Response.json(quiz);
}