import "./App.css";
import React, { useState, useEffect } from "react";

export default function App() {
  const jsQuiz = [
    {
      question: "What is the capital of Pakistan?",
      options: ["Karachi", "Lahore", "Islamabad", "Peshawar"],
      answer: "Islamabad",
    },
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Bangalore", "Kolkata"],
      answer: "New Delhi",
    },
    {
      question: "What is the capital of China?",
      options: ["Beijing", "Shanghai", "Shenzhen", "Guangzhou"],
      answer: "Beijing",
    },
    {
      question: "What is the capital of the United States?",
      options: ["New York", "Los Angeles", "Washington, D.C.", "Chicago"],
      answer: "Washington, D.C.",
    },
    {
      question: "What is the capital of the United Kingdom?",
      options: ["Manchester", "Birmingham", "Edinburgh", "London"],
      answer: "London",
    },
    {
      question: "What is the capital of Saudi Arabia?",
      options: ["Jeddah", "Dammam", "Makkah", "Riyadh"],
      answer: "Riyadh",
    },
    {
      question: "What is the capital of Türkiye?",
      options: ["Istanbul", "Ankara", "Izmir", "Antalya"],
      answer: "Ankara",
    },
    {
      question: "What is the capital of Japan?",
      options: ["Osaka", "Tokyo", "Kyoto", "Hiroshima"],
      answer: "Tokyo",
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      answer: "Canberra",
    },
    {
      question: "What is the capital of Canada?",
      options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
      answer: "Ottawa",
    },
  ];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [mark, setMark] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(10);

  useEffect(() => {
    if (showResult) return;
    if (time === 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const marks = () => {
    if (selected === jsQuiz[index].answer) {
      setMark((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    marks();
    if (index < jsQuiz.length - 1) {
      setIndex(index + 1);
      setSelected(null);
      setTime(10);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setMark(0);
    setSelected(null);
    setShowResult(false);
    setTime(10);
  };

  if (showResult) {
    return (
      <div className="quiz">
        <h1>
          {mark} out of {jsQuiz.length}
        </h1>
        <button className="button-71" onClick={handleRestart}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
      <h2>{jsQuiz[index].question}</h2>
      <h2 className="timer" >
        Time Left: {time}s
      </h2>

      <ul className="options">
        {jsQuiz[index].options.map((opt, i) => (
          <li
            key={i}
            className={
              selected === opt
                ? selected === jsQuiz[index].answer
                  ? "selected"
                  : "wrong"
                : ""
            }
            onClick={() => setSelected(opt)}
          >
            {opt}
          </li>
        ))}
      </ul>

      <button id="buttonnext" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
