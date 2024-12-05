import React, { useEffect, useState } from "react";
import QuestionRenderer from './QuestionRenderer'
import QuestionPreview from './QuestionPrevies'

const QuestionPaper = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    try{
        fetch("http://localhost:3000/getAllQuestions") // Adjust endpoint as needed
        .then((response) => response.json())
        .then((data) => setQuestions(data.data))
        .catch((error) => console.error("Error fetching questions:", error));
    }catch(error){
        console.log(error);
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4 text-center">Question Paper</h1>
      {questions.map((question, index) => (
        <>
        <h2 className="mt-2">Question no. {index + 1}</h2>
        <div className="border-b border-black">
        <QuestionPreview key={question.id} question={question} />
        </div>
        
        </> 
      ))}
      <button className="bg-blue-300 p-2 rounded-lg m-4">Submit</button>
    </div>
  );
};

export default QuestionPaper;
