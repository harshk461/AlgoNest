export const courses = [
  {
    course: "Data Structure and Algorithms",
    course_description:
      "Follow a structured path to learn all of the core data structures & algorithms. Perfect for coding interview preparation.",
    courses: [
      {
        course: "Algorithms & Data Structures for Beginners",
        course_description:
          "Learn the fundamentals of algorithms and data structures.",
      },
      {
        course: "Advanced JavaScript Concepts",
        course_description:
          "Dive deep into the core concepts of JavaScript, including closures, prototypal inheritance, and more.",
      },
    ],
  },
  {
    course: "Web Development",
    course_description:
      "Learn the latest technologies and frameworks to build modern, responsive web applications.",
    courses: [
      {
        course: "HTML & CSS Fundamentals",
        course_description:
          "Get started with web development by learning the essentials of HTML and CSS.",
      },
      {
        course: "Frontend Frameworks (React & Vue)",
        course_description:
          "Dive into modern frontend frameworks like React and Vue to build responsive web apps.",
      },
    ],
  },
  {
    course: "Mobile App Development",
    course_description:
      "Build cross-platform mobile applications using Flutter and React Native.",
    courses: [
      {
        course: "Flutter for Beginners",
        course_description:
          "Get started with Flutter and build mobile apps for Android and iOS.",
      },
      {
        course: "React Native Essentials",
        course_description:
          "Build powerful and responsive mobile applications using React Native.",
      },
    ],
  },
];

export const questions = [
  {
    question: "Longest Substring Without Repeating Characters",
    description: [
      "Given a string s, find the length of the longest substring without repeating characters.",
    ],
    difficulty: "easy",
    acceptance: "54%",
    testcases: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explaination: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explaination: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explaination:
          'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    topics: ["hash table", "string", "sliding window"],
    hints: [
      "Generate all possible substrings & check for each substring if it's valid and keep updating maxLen accordingly.",
    ],
  },
];
