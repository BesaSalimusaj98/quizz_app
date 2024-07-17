import { useRef, useEffect, useState } from "react";

export default function Answer({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const [shuffled, setShuffled] = useState(false);
  const shuffledAnswer = useRef();

  useEffect(() => {
    shuffledAnswer.current = [...answers];
    shuffledAnswer.current.sort(() => Math.random() - 0.5);
    setShuffled(true);
  }, [answers]);

  return (
    <ul id="answers">
      {shuffled &&
        shuffledAnswer.current.map((index) => {
          const isSelected = selectedAnswer === index;
          let cssClass = "";

          if (answerState === "answered" && isSelected) {
            cssClass = " selected";
          }

          if (
            (answerState === "correct" || answerState === "wrong") &&
            isSelected
          ) {
            cssClass = answerState;
          }

          return (
            <li key={index} className="answer">
              <button
                onClick={() => onSelect(index)}
                className={cssClass}
                disabled={answerState !== ""}
              >
                {index}
              </button>
            </li>
          );
        })}
    </ul>
  );
}
