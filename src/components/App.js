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

  useEffect(() => {
    getQuestions();
    return;
  }, []);

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm addQuestion={addQuestion} /> : <QuestionList questions={questions} />}
    </main>
  );
}

export default App;
