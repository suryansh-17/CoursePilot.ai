import {
  GoogleGenerativeAI,
  GenerationConfig,
  GenerativeModel,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
const genAI = new GoogleGenerativeAI(apiKey);

const model: GenerativeModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateCourseLayoutAI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following\nDetail With field Course Name, Description,\nAlong with Chapter Name, about, Duration:\nCategory: 'Programming', Topic: Python,\nLevel: Basic, Duration: 1 hours, No. Of\nChapters:5, in JSON format",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Python Programming Fundamentals",\n  "description": "This course provides a comprehensive introduction to Python programming, designed for beginners with no prior programming experience. You\'ll learn the core concepts of Python syntax, data types, variables, operators, control flow, functions, and more. By the end of this course, you\'ll be able to write basic Python programs and understand the fundamentals of programming.",\n  "chapters": [\n    {\n      "chapter_name": "Introduction to Python",\n      "about": "This chapter introduces the Python programming language, its history, and its applications. We\'ll cover how to set up your Python environment and write your first Python program.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Data Types and Variables",\n      "about": "This chapter explores the fundamental data types in Python, such as integers, floats, strings, and booleans. You\'ll learn how to create variables and assign values to them.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapter_name": "Operators and Expressions",\n      "about": "This chapter covers various operators used in Python, including arithmetic, comparison, logical, and assignment operators. You\'ll learn how to build expressions and evaluate their results.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Control Flow Statements",\n      "about": "This chapter introduces control flow statements in Python, such as if-else statements, for loops, and while loops. You\'ll learn how to control the flow of execution in your programs.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapter_name": "Functions",\n      "about": "This chapter explains the concept of functions in Python, how to define and call functions, and how to pass arguments to functions. You\'ll learn how to write reusable code blocks.",\n      "duration": "20 minutes"\n    }\n  ],\n  "category": "Programming",\n  "topic": "Python",\n  "level": "Basic",\n  "duration": "1 hour",\n  "no_of_chapters": 5\n}\n```\n',
        },
      ],
    },
  ],
});

//   try {
//     const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//     console.log(result.response.text());
//   } catch (error) {
//     console.error("Error during message sending:", error);
//   }
