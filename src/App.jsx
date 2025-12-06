// App.jsx

import React, { useState, useEffect, useCallback } from "react";
import { quizData } from "./quizData";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [mark, setMark] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(10);

  const handleNext = useCallback(() => {
    if (selected === quizData[index].answer) {
      setMark((prev) => prev + 1);
    }

    if (index < quizData.length - 1) {
      setIndex((prev) => prev + 1);
      setSelected(null);
      setTime(10);
    } else {
      setShowResult(true);
    }
  }, [selected, index]);

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
  }, [time, showResult, handleNext]);

  const handleRestart = () => {
    setIndex(0);
    setMark(0);
    setSelected(null);
    setShowResult(false);
    setTime(10);
  };

  if (showResult) {
    return (
      <div className="container">
        <div className="quiz">
          <h1 className="result-title">
            {mark} out of {quizData.length}
          </h1>
          <button className="button-71" onClick={handleRestart}>
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="quiz">
        <h1 className="title">Quiz App</h1>
        <div className="timer">Time Left: {time}s</div>
        <h2 className="question">{quizData[index].question}</h2>

        <ul className="options">
          {quizData[index].options.map((opt, i) => {
            const isSelected = selected === opt;
            const isCorrect = quizData[index].answer === opt;
            const isWrong = isSelected && !isCorrect;

            let className = "option";
            if (isSelected && isCorrect) className += " selected";
            if (isWrong) className += " wrong";

            return (
              <li
                key={i}
                className={className}
                onClick={() => setSelected(opt)}
              >
                {opt}
              </li>
            );
          })}
        </ul>

        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
