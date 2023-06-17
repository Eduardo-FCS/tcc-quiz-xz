import { useContext, useEffect } from "react";
import { QuizzContext } from "../../context/QuizzContext";
import { Options } from "../Options/Options";
import { useLocation, useNavigate } from "react-router-dom";
import "./Question.css";

export const Questions = () => {
  const [quizzState, dispatch] = useContext(QuizzContext);
  const currentQuest = quizzState.questions[quizzState.currentQuest]
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/questions') {
      dispatch({ type: 'CHANGE_STATE' });
    }
  }, [location.pathname, dispatch]);

  const onSelectOption = (opcoes) => {
    dispatch({
      type: "CHECK_ANSWER",
      payload: {
        resposta: currentQuest.resposta,
        opcoes,
      },
    });
  };

  return (
    <div id="question">
      <p>Pergunta de {quizzState.currentQuest + 1} a {quizzState.questions.length}</p>
      <h2>{currentQuest.pergunta}</h2>
      <div id="options-container">
        {currentQuest.opcoes.map((opt) => (
          <Options
            opcoes={opt}
            key={opt}
            resposta={currentQuest.resposta}
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
