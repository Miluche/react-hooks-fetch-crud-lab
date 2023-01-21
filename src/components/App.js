import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  function getQuestions() {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((result) => setQuestions(result));
  }

  function addQuestion(question) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    })
      .then((res) => res.json())
      .then((result) => setQuestions([...questions, result]));
  }

  function deleteQuestion(id) {
    const updatedQuestions = questions.filter((val) => val.id !== id);

    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => setQuestions([...updatedQuestions]));
  }

  function updateQuestion(question) {
    const updatedQuestions = questions.map((val) => {
      if (val.id === question.id) {
        const { id, prompt, answers } = val;
        const newValue = { id, prompt, answers, correctIndex: question.correctIndex };
        return newValue;
      } else {
        return val;
      }
    });

    const newValue = {
      "correctIndex": parseInt(question.correctIndex)
    };

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newValue),
    })
      .then(() => setQuestions([...updatedQuestions])).catch((err) => console.log(err));
  }

  useEffect(() => {
    getQuestions();
    return;
  }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList questions={questions} deleteQuestion={deleteQuestion} updateQuestion={updateQuestion} />}
    </main>
  );
}

export default App;
