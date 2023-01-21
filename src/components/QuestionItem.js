import React from "react";

function QuestionItem({ question, handleDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleUpdateQuestion(evt) {
    onUpdateQuestion({ id, prompt, answers, correctIndex: parseInt(evt.target.value) });
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateQuestion}>{options}</select>
      </label>
      <button onClick={() => handleDeleteQuestion(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
