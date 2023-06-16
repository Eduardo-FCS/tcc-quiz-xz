import { useContext } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import { Options } from "../Options/Options";
import { useNavigate } from "react-router-dom";
import "./Question.css";

export const Questions = () => {
  const [quizzState, dispatch] = useContext(QuizzContext);
  const currentQuest = quizzState.questions[quizzState.currentQuest];
  const navigate = useNavigate();

  const onSelectOption = (option) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: {
        answer: currentQuest.answer,
        option,
      },
    });
  };

  return (
    <div id="question">
      <p>Pergunta de {quizzState.currentQuest + 1} a {quizzState.questions.length}</p>
      <h2>{currentQuest.question}</h2>
      <div id="options-container">
        {currentQuest.options.map((opt) => (
          <Options
            option={opt}
            key={opt}
            answer={currentQuest.answer}
            selectOption={() => onSelectOption(opt)}
          />
        ))}
      </div>
      {quizzState.answerSelected && (
        <button
          onClick={() => {
            dispatch({ type: "CHANGE_QUESTION" });
            if (quizzState.currentQuest + 1 === quizzState.questions.length) {
              navigate("/finish");
            }
          }}
        >
          Continuar
        </button>
      )}
    </div>
  );
};
