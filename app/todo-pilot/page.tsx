// Tells Next.js that this is a Client Component
// meaning it will run in the browser and can use interactive features like buttons and state
"use client";

// Importing a React "hook" that lets us store and update UI state
import { useState } from "react";

// Importing a lightning bolt icon from an icon library(probably will change later)
import { FiZap } from "react-icons/fi";

// Define the structure of a Task using a TypeScript interface
// This helps us catch bugs and get autocompletion
interface Task {
  id: number;          // unique ID for each task
  text: string;        // the main task description
  steps: string[];     // list of subtasks (can be filled in by AI API later)
  completed: boolean;  // whether the task is done or not
}

// Our main component - this is the function that returns UI elements
export default function MagicToDoPage() {
  // useState is how we tell React to "remember" things between renders.
  // Think of this like: "let tasks = []", but *reactive*.
  // When setTasks is called, React re-renders the page with the new task list.
  const [tasks, setTasks] = useState<Task[]>([]); // Starts as an empty array of Task

  // This holds the current text typed into the input field
  const [input, setInput] = useState(""); // Plain string state

  // This function gets called when the "Add" button is clicked
  // It creates a new task and adds it to the task list
  const addTask = () => {
    if (!input.trim()) return; // ignore empty tasks

    const newTask: Task = {
      id: Date.now(),          // use timestamp as a unique ID
      text: input.trim(),      // the actual text of the task
      steps: [],               // no subtasks yet (can be generated later)
      completed: false         // default to incomplete
    };

    // This adds the new task to the existing list of tasks
    // We're using the spread operator `...` to copy the previous array and add one more item
    setTasks(prev => [...prev, newTask]);

    // Clear the input box after adding
    setInput("");
  };

  // What gets shown on the page (HTML-like syntax)
  return (
    <main className="mx-auto max-w-xl p-4">
      <h1 className="text-2xl font-bold mb-4">📝 Magic ToDo</h1>

      {/* Input + Add Button */}
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          value={input} // bind the input field to our state
          onChange={(e) => setInput(e.target.value)} // update state on typing
          placeholder="Enter a task..." 
          className="flex-1 rounded border px-3 py-2"
        />

        <button 
          onClick={addTask} // call our addTask function when clicked
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add
        </button>

        {/* A future button for the AI-powered breakdown can go here */}
      </div>

      {/* Render the list of tasks */}
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-2">
            <div className="flex items-center gap-2">

              {/* Checkbox to mark a task as completed */}
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => {
                  // Update the task's completed status
                  // This maps over the tasks and toggles the one that was clicked
                  setTasks(prev => prev.map(t => 
                    t.id === task.id ? {...t, completed: !t.completed} : t
                  ));
                }}
              />

              {/* Show the task text — strike-through if completed */}
              <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                {task.text}
              </span>

              {/* "Magic" button to break down the task into steps */}
              <button 
                onClick={() => {
                  // This is where you'd call AI later to generate subtasks
                }} 
                className="ml-auto text-purple-600 hover:text-purple-800"
                title="Break into steps"
              >
                <FiZap /> {/* lightning bolt icon */}
              </button>
            </div>

            {/* Show the steps under the task, if there are any */}
            {task.steps.length > 0 && (
              <ul className="ml-6 list-disc text-gray-700">
                {task.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
