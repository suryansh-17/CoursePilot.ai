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

export const generateCourseContentAI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: Python Advance, Chapter:Loops, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Loops in Python",\n    "explanation": "Loops are a fundamental concept in programming that allow you to repeat a block of code multiple times. Python provides several types of loops to cater to different scenarios. The most common types are `for` loops and `while` loops.",\n    "code": ""\n  },\n  {\n    "title": "For Loops",\n    "explanation": "A `for` loop iterates over a sequence, such as a list, tuple, string, or range. For each item in the sequence, the loop executes the code within its block.",\n    "code": "<precode>\\n# Iterate over a list\\nmy_list = [1, 2, 3, 4, 5]\\nfor item in my_list:\\n  print(item)\\n\\n# Iterate over a string\\nmy_string = \\"Hello\\"\\nfor letter in my_string:\\n  print(letter)\\n\\n# Iterate over a range\\nfor i in range(5):\\n  print(i)\\n</precode>"\n  },\n  {\n    "title": "Range Function",\n    "explanation": "The `range()` function is often used with `for` loops to generate a sequence of numbers. `range(start, stop, step)` generates a sequence from `start` (inclusive) to `stop` (exclusive) with an optional step value. If `start` is omitted, it defaults to 0. If `step` is omitted, it defaults to 1.",\n    "code": "<precode>\\n# Generate numbers from 0 to 4 (exclusive)\\nfor i in range(5):\\n  print(i)  # Output: 0 1 2 3 4\\n\\n# Generate numbers from 2 to 10 (exclusive) with a step of 2\\nfor i in range(2, 10, 2):\\n  print(i)  # Output: 2 4 6 8\\n</precode>"\n  },\n  {\n    "title": "While Loops",\n    "explanation": "A `while` loop executes a block of code repeatedly as long as a given condition is `True`. The loop continues to iterate until the condition becomes `False`.",\n    "code": "<precode>\\ncount = 0\\nwhile count < 5:\\n  print(count)\\n  count += 1\\n</precode>"\n  },\n  {\n    "title": "Loop Control Statements",\n    "explanation": "Control statements allow you to modify the flow of execution within loops. Python provides the following control statements:\\n\\n* `break` - Immediately terminates the loop and exits to the next statement after the loop.\\n* `continue` - Skips the current iteration and jumps to the next iteration of the loop.\\n* `else` - Executes a block of code if the loop completes normally (without encountering a `break` statement).",\n    "code": "<precode>\\n# Break\\nfor i in range(10):\\n  if i == 5:\\n    break  # Exit the loop when i is 5\\n  print(i)\\n\\n# Continue\\nfor i in range(10):\\n  if i % 2 == 0:\\n    continue  # Skip even numbers\\n  print(i)\\n\\n# Else\\nfor i in range(10):\\n  if i == 5:\\n    break\\n  print(i)\\nelse:\\n  print(\\"Loop completed normally\\")\\n</precode>"\n  },\n  {\n    "title": "Nested Loops",\n    "explanation": "You can create nested loops by placing one loop inside another. This allows you to iterate over multiple sequences or to perform multiple operations for each item in the outer loop.",\n    "code": "<precode>\\nfor i in range(3):\\n  for j in range(2):\\n    print(f\\"({i}, {j})\\")\\n</precode>"\n  }\n]\n```',
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
